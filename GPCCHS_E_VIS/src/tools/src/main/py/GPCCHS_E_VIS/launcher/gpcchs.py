#!/usr/bin/env isisPython
# -*- coding: utf-8 -*-
"""! 
Project   : ISIS
Component : GPCCHS_E_VIS
@file     : gpcchs.py
@author   : isis
@date     : 25/10/2016
@brief    : Launcher of GPCCHS visualization application
@type     : Class
"""
# ====================================================================
# HISTORY
# VERSION : 1.1.0 : : : 28/02/2017 : Initial version
# END-HISTORY
# ====================================================================

# Start of user code ImportsZone
import os
import re
import sys
import subprocess
import argparse
from time import sleep

class IsisContainerError(Exception):
    """
    Custom exception When no container has been found by isisStartContainer
    """
    pass
    
   
# Create an argument parser
GPCCHS_argsparser = argparse.ArgumentParser(formatter_class=argparse.RawDescriptionHelpFormatter,description='''\
Run the Javascript VIsualization Main Application

Usage example in command line:

gpcchs -d 1 -s 180 --gpccdc_config_file /data/isis/documents/SESSION/INTEGRATION/ESSAIS/GPVIMA-0112/CCC/CONF_COMPONENT/GPCCDC/config_gpccdc_d_dbr-default.xml
''')
GPCCHS_argsparser.add_argument("--debug",action='store_true',
    help='Activate the traces if used, additional traces can be added by adding "--LOG=console?level=debug" option too'
)
GPCCHS_argsparser.add_argument("--gpccdc_config_file",required=True,
    help="GPCCDC xml configuration file")
GPCCHS_argsparser.add_argument("--sessionid","-s",type=int,default=0,
    help="Id of the operational session")
GPCCHS_argsparser.add_argument("--domainid","-d",type=int,default=3,
    help="Id of the domain")

class GPCCHS(object):
    """!
    @brief: GPCCHS_E_VIS.gpcchs : Launcher of GPCCHS visualization application
    """
    _ROOT = os.path.dirname(__file__)
    _ISIS_WORK_DIR = os.environ.get('ISIS_WORK_DIR')
    _ISIS_WORK_DIR = (
        _ISIS_WORK_DIR + '/'
        if _ISIS_WORK_DIR and not _ISIS_WORK_DIR.endswith('/')
        else _ISIS_WORK_DIR
    )
    if not _ISIS_WORK_DIR:
        raise IsisContainerError('GPCCHS Environment variable `ISIS_WORK_DIR` is not set')
    
    # Start of user code ProtectedAttrZone
    _container_dir = _ISIS_WORK_DIR
    _gpccdc_feature_name = 'gpccdc_d_dbr-default.xml'
    _gpccdc_conf_filename = 'config_gpccdc_d_dbr-default.xml'
    _gpccdc_url = 'tcp://127.0.0.1:{}'
    _container_pid_file_basename = '{}gpinde-{}-{}-{}-container.pid'
    _creditsFile_basename='{}gpinde-{}-{}-{}-default.ses'

    _startContainerCmd = 'gpcctc_l_cnt_isisStartContainer_cmd --ai {2} --si {3} --di {4} -p {0} --cd {1}{0}'
    _hscPath = '/usr/share/isis/lib/js/gpcchs_e_vis_launcher/client'
    _hscRunCmd = './lpisis_gpcchs_e_clt --ISIS_DOCUMENTS_ROOT={} --NODE_PATH={} --ZMQ_GPCCDC_PUSH=tcp://127.0.0.1:{} --ZMQ_GPCCDC_PULL=tcp://127.0.0.1:{}'

    @property
    def _hsc_run_cmd(self):
        """
        Property holding HSC run command-line as list
        """
        return self._hscRunCmd.format(
            self._fmd_root,
            self._node_path,
            self._dcPushPort,
            self._dcPullPort
        ).split()

    @property
    def _container_pid(self):
        """
        Get GPINDE `desktopx` container process ID
        """
        if not self.__container_pid:
            filename = self._container_pid_file.format(self._container_dir)
            try:
                hdl = open(filename,'r')
            except IOError:
                print("GPCCHS Getting display container process ID failed, cannot read file:",filename)
            else:            
                self.__container_pid, _ = hdl.read().split()
                hdl.close()
        return self.__container_pid

    @property
    def _auth_id(self):
        """
        Get authentification ID
        """
        if not self.__auth_id:
            filename = self._creditsFile.format(self._ISIS_WORK_DIR)
            try:
                hdl = open(filename,'r')
            except IOError:
                print("GPCCHS Getting display session authentification Id ID failed, cannot read file:",filename)
            else:
                fileLines = hdl.read().split()
                self.__auth_id = fileLines[-1]
                hdl.close()
        return self.__auth_id

    @property
    def _container_cmd_base(self):
        """
        Property holding container base command-line as list
        """
        return self._startContainerCmd.format(
            self._container_pid,
            self._container_dir,
            self._auth_id,
            str(self._session_id),
            str(self._domain_id)
        )

    @property
    def _ccreate_cmd(self):
        """
        Property holding container create command-line as list
        """
        return '{} -- ccreate {}'.format(
            self._container_cmd_base,
            self._gpccdc_feature_name
        ).split()

    @property
    def _cactivate_cmd(self):
        """
        Property holding container activate command-line as list
        """
        return '{} -- cactivate {} {}'.format(
            self._container_cmd_base,
            self._feature_id,
            self._feature_conf
        ).split()

    @property
    def _cstart_cmd(self):
        """
        Property holding container start command-line as list
        """
        return '{} -- cstart {}'.format(
            self._container_cmd_base,
            self._feature_id
        ).split()
        
    @property
    def _cstop_cmd(self):
        """
        Property holding container stop command-line as list
        """
        return '{} -- cstop {}'.format(
            self._container_cmd_base,
            self._feature_id
        ).split()
        
    @property
    def _cdestroy_cmd(self):
        """
        Property holding container destroy command-line as list
        """
        return '{} -- cdestroy {}'.format(
            self._container_cmd_base,
            self._feature_id
        ).split()

    # End of user code

    def __init__(self, options, unknown_args):
        """!
        @brief : Constructor
        """
        # generated
        # Start of user code __init__
        self._context = {}
        self._hscProc = None
        self._dcPushPort = None
        self._dcPullPort = None
        self._feature_id = None
        self.__container_pid = None
        self.__auth_id = None
        self._gpccdc_created = False
        self._gpccdc_started = False
        self._gpccdc_config_file = options.gpccdc_config_file
        self._session_id = options.sessionid
        self._domain_id = options.domainid
        if self._session_id == 0:
            print("Warning, -s argument not provided, default session ID 0 is used")
        if os.environ.get('ISIS_DOCUMENT_DIR') != None:
            self._fmd_root = os.environ.get('ISIS_DOCUMENT_DIR') + '/'
        else:
            raise IsisContainerError("GPCCHS Launcher cannot read ISIS_DOCUMENT_DIR environment variable")
        if os.environ.get('ISIS_NODE_BINARY') == None:
            self._node_path = '/usr/share/isis/bin/node'
        else:
            self._node_path = os.environ.get('ISIS_NODE_BINARY')
        if os.environ.get("USER") != None:
            user = os.environ.get("USER")
        else:
            raise IsisContainerError("GPCCHS Launcher cannot read USER environment variable")
        if os.environ.get("HOSTNAME") != None:
            hostname = os.environ.get("HOSTNAME")
        else:
            raise IsisContainerError("GPCCHS Launcher cannot read HOSTNAME environment variable")
        if os.environ.get("DISPLAY") != None:
            display = os.environ.get("DISPLAY")
        else:
            raise IsisContainerError("GPCCHS Launcher cannot read DISPLAY environment variable")
        self._container_pid_file = self._container_pid_file_basename.format("{}",user, hostname, display)
        self._creditsFile = self._creditsFile_basename.format("{}",user, hostname,display)
        self._feature_conf = self._ISIS_WORK_DIR + self._gpccdc_conf_filename
        self._hsc_args = unknown_args
        self._debug = options.debug
        self._hscLogOutput = None
        # Set necessary environment variables
        os.environ["RTD_UNIX_SOCKET"]='0'
        # End of user code

    def __del__(self):
        """!
        @brief : Destructor
        """
        # generated
        # Start of user code __del__
        self._context = None
        self._hscProc = None
        self._dcPushPort = None
        self._dcPullPort = None
        self._fmdRoot = None
        self._debug = None
        self._feature_id = None
        self._feature_conf = None
        self._hsc_args = None
        self._gpccdc_config_file = None
        self.__container_pid = None
        self._gpccdc_created = False
        self._gpccdc_started = False
        self._hscLogOutput = None
        # End of user code

    # Start of user code ProtectedOperZone
    def _create_feature(self):
        """
        Create the feature defined in self._gpccdc_feature_name
        
        :return: Zero if success, -1 if error
        :rtype: integer
        """
        rc = 0
        def extract_eid(stdout):
            """
            Extract through regex the EID from ccreate command
            """
            p = re.compile(r'eid ([\d]+)', re.IGNORECASE)
            matches = re.findall(p, stdout)
            return matches[0] if matches else None

        try:
            if self._debug == True:
                print("GPCCHS launcher execute: ",' '.join(self._ccreate_cmd))
            proc = subprocess.Popen(
                self._ccreate_cmd,
                env=os.environ,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            proc.wait()
            stdoutsteam = proc.stdout.read().decode('utf-8')
            if self._debug == True:
                print(stdoutsteam)
            self._feature_id = extract_eid(stdoutsteam)
            print('GPCCHS Feature instance created under ID {}.'.format(self._feature_id))
        except subprocess.CalledProcessError as error:
            print("GPCCHS Launcher Feature creation process error:", error)
            rc = -1
        return rc

    def _activate_feature(self):
        """
        Activate the feature (must be created first)
        
        :return: Zero if success, -1 if error
        :rtype: integer
        """
        rc = 0
        try:
            print('GPCCHS Activating feature ID {}...'.format(self._feature_id))
            if self._debug == True:
                print("GPCCHS launcher execute: ",' '.join(self._cactivate_cmd))            
            proc = subprocess.Popen(
                self._cactivate_cmd,
                env=os.environ,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            proc.wait()
            for std in [proc.stdout, proc.stderr]:
                if std:
                    std = std.read().decode('utf-8')
                    if self._debug == True:
                        print(std)
                    if 'Error=1' in std:
                        raise IsisContainerError(std)
        except subprocess.CalledProcessError as error:
            print("GPCCHS Launcher Feature activation process error:", error)
            rc = -1
        return rc

    def _start_feature(self):
        """
        Start the feature (must be activated first)
        
        :return: Zero if success, -1 if error
        :rtype: integer
        """
        rc = 0
        try:
            print('GPCCHS Starting feature ID {}...'.format(self._feature_id))
            if self._debug == True:
                print("GPCCHS launcher execute: ",' '.join(self._cstart_cmd))
            proc = subprocess.Popen(
                self._cstart_cmd,
                env=os.environ,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            proc.wait()
            for std in [proc.stdout, proc.stderr]:
                if std:
                    std = std.read().decode('utf-8')
                    if self._debug == True:
                        print(std)
                    if 'Error=1' in std:
                        raise IsisContainerError(std)
        except subprocess.CalledProcessError as error:
            print("GPCCHS Launcher Feature start process error:", error)
            rc = -1
        return rc
        
    def _stop_feature(self):
        """
        Stop the feature (must be started first)
        
        :return: Zero if success, -1 if error
        :rtype: integer
        """
        rc = 0
        try:
            print('GPCCHS Stopping feature ID {}...'.format(self._feature_id))
            if self._debug == True:
                print("GPCCHS launcher execute: ",' '.join(self._cstop_cmd))
            proc = subprocess.Popen(
                self._cstop_cmd,
                env=os.environ,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            proc.wait()
            for std in [proc.stdout, proc.stderr]:
                if std:
                    std = std.read().decode('utf-8')
                    if self._debug == True:
                        print(std)
                    if 'Error=1' in std:
                        raise IsisContainerError(std)
        except subprocess.CalledProcessError as error:
            print("GPCCHS Launcher Feature stop process error:", error)
            rc = -1
        return rc
        
    def _destroy_feature(self):
        """
        Destroy the feature (must be created first)
        
        :return: Zero if success, -1 if error
        :rtype: integer
        """
        rc = 0
        try:
            print('GPCCHS Destroying feature ID {}...'.format(self._feature_id))
            if self._debug == True:
                print("GPCCHS launcher execute: ",' '.join(self._cdestroy_cmd))
            proc = subprocess.Popen(
                self._cdestroy_cmd,
                env=os.environ,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            proc.wait()
            for std in [proc.stdout, proc.stderr]:
                if std:
                    std = std.read().decode('utf-8')
                    if self._debug == True:
                        print(std)
                    if 'Error=1' in std:
                        raise IsisContainerError(std)
        except subprocess.CalledProcessError as error:
            print("GPCCHS Launcher Feature destroy process error:", error)
            rc = -1
        return rc

    def _exec_cmd(self, cmd, stdstreams):
        """
        Execute a command and wait its end to return its output streams
        
        :param cmd: Command to run
        :type cmd: string
        :param stdstreams: Command outputs 'out' and 'error' streams
        :type stdstreams: dict with 'out' and 'error' strings
        :return: Command return code or None if command subprocess creation failed
        :rtype: integer
        """
        try:
            if self._debug == True:
                print('GPCCHS Executing command : {}'.format(cmd))
            proc = subprocess.Popen(
                cmd.split(),
                env=os.environ,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            proc.wait()
            stdstreams['out'] = proc.stdout.read().decode('utf-8')
            stdstreams['error'] = proc.stderr.read().decode('utf-8')
            if self._debug == True:
                print(stdstreams['out'])
                print(stdstreams['error'])
        except subprocess.CalledProcessError as error:
            print("GPCCHS Launcher Command execution error:", error)
            return None
        return proc.returncode

    def _run_process(self, cmd, logFile=None):
        """
        Run a process
        
        :param cmd: Command to run the process
        :type cmd: string
        :return: Created process or None is process creation failed
        :rtype: subprocess.Popen
        """
        proc = None
        try:
            if self._debug == True:
                print('GPCCHS Running command : {}'.format(cmd))
            if logFile:
                proc = subprocess.Popen(
                        cmd.split(),
                        env=os.environ,
                        stdout=logFile,
                        stderr=logFile
                    )
            else:
                proc = subprocess.Popen(
                    cmd.split(),
                    env=os.environ,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE
                )
        except subprocess.CalledProcessError as error:
            print("GPCCHS Launcher Process creation error:", error)
        return proc
    
    def _read_ports_numbers(self,filepath,portslist):
        """
        Read and return a list of port from a given file
        
        :param filepath: Path of the file in which ports numbers shall be read
        :type cmd: string
        :param portslist: List to which append the read ports numbers
        :type cmd: string list
        """
        try:
            readFile = open(filepath,'r')
        except IOError:
            print("GPCCHS Ports list reading fail from file:",filepath)
        else:
            for line in readFile.readlines():
                portslist.append(line.strip('\n \t'))
            readFile.close()

    def readXmlFile(self, outParams, filepath):
        '''
        Read an xml file and return its content
        
        :param outParams: Read content of the file as a single string in the 'content' element
        :type outParams: dictionary
        :param filepath: Absolute parth of the file to read
        :type filepath: string
        :return: String describing the error, None if no error occured
        :rtype: string
        '''
        retErr = None
        filecontent = ""
        try:
            readfile = open(filepath,'r')
        except IOError:
            retErr = "Error while opening for reading the file : " + filepath
        else:
            filecontent = readfile.read()
            readfile.close()

        outParams['content'] = filecontent
        return retErr

    def writeXmlFile(self, content, filepath):
        '''
        Write an xml file with content
        
        :param content: Content to write in the file in unicode
        :type content: string
        :param filepath: Absolute parth of the file to write
        :type filepath: string
        :return: String describing the error, None if no error occured
        :rtype: string
        '''
        retErr = None

        try:
            writtenfile = open(filepath,'w')
        except IOError:
            retErr = "Error while opening for writing the file : " + filepath
        else:
            filecontent = writtenfile.write(content)
            writtenfile.close()

        return retErr        

    def setXmlConfValueInFileContent(self,inOutParams,baliseTree,baliseValue):
        '''
        Replace the value of a given balise value
        Balise is defined as the list. For exemple, baliseTree set with ['CONFIG', 'DataControllerConfig', 'fromDcToClient']
        will makes this function to look for
        (...)<CONFIG (...)
            <DataControllerConfig (...)
                <fromDcToClient(...)>VALUE</fromDcToClient (...)
        and replace VALUE with the content of baliseValue
        
        :param inOutParams: Content of the xml file for replacement in the 'content' element
        :type inOutParams: dictionary
        :param baliseTree: List of the xml elements defining the balise to set the value
        :type baliseTree: list
        :param baliseValue: Value to set in the balise defined by the baliseTree parameter
        :type baliseValue: string
        :return: String describing the error, None if no error occured
        :rtype: string
        '''
        retErr = None
        xmlBalise_pattern = re.compile(r"<[/]*[A-Za-z_][A-Za-z0-9_-]*",re.MULTILINE|re.UNICODE)
        contentToWrite = ""
        currentPosAmongBalises = []
        isBaliseFound = False

        contentToRead = inOutParams['content']

        while retErr == None and isBaliseFound == False:
            matchObject = xmlBalise_pattern.search(contentToRead)
            # Check if a balise has been found
            if matchObject :
                # Update the content to write with the read part of the content
                contentToWrite = contentToWrite + contentToRead[:matchObject.end(0)]
                # Update the content to read to remove the balise name
                contentToRead = contentToRead[matchObject.end(0):]
                # Check if the found balise is a start one
                if matchObject.group(0)[1] != '/':
                    # Robustness test in case the balise we look for is not correctly formed
                    if len(currentPosAmongBalises) == len(baliseTree):
                        retErr = "End of configuration balise " + repr(baliseTree) + " not found"
                    baliseName = matchObject.group(0)[1:]
                    # Check if the balise is the one we are currently looking for
                    if retErr == None and baliseName == baliseTree[len(currentPosAmongBalises)]:
                        currentPosAmongBalises.append(baliseName)
                        # Check if the balise is the lower we are looking for (inner most)
                        if len(currentPosAmongBalises) == len(baliseTree):
                            if contentToRead.find(">") == -1:
                                retErr = "End of configuration balise " + baliseTree + " not found"
                            if retErr == None:
                                # Read the rest of the balise
                                restOfBalise = contentToRead[:contentToRead.find(">")+1]
                                # Robustness check in case of missing ">" at the end of the balise
                                if restOfBalise.find("<") != -1:
                                    retErr = "Incorrect format of configuration start balise " + repr(baliseTree)
                                # Put in output content the rest of the balise and the requested content for it
                                contentToWrite = contentToWrite + restOfBalise + baliseValue
                                # Update the content to read to not parse the content of this balise
                                if contentToRead.find("<") == -1:
                                    retErr = "End of configuration balise " + repr(baliseTree) + " not found"
                                if retErr == None:
                                    contentToRead = contentToRead[contentToRead.find("<"):]
                else:
                    # Found balise is an end one
                    baliseEndName = matchObject.group(0)[2:]
                    # Check if the balise we are current reading if the one of the specified ones
                    if baliseEndName == baliseTree[len(currentPosAmongBalises)-1]:
                        if len(currentPosAmongBalises) == len(baliseTree):
                            isBaliseFound = True
                            # Nothing more to do, the balise content has already been written
                        # Remove the balise from the current position list (with robustness check)
                        if baliseEndName in currentPosAmongBalises:
                            currentPosAmongBalises.remove(baliseEndName)
            else:
                if isBaliseFound == False:
                    retErr = "Configuration balise " + repr(baliseTree) + " not found"
        # Write the rest of the file
        contentToWrite = contentToWrite + contentToRead
        # Return result
        inOutParams['content'] = contentToWrite
        return retErr

    def _write_gpccdc_conf_file(self):
        """
        Create in self._feature_conf the xml configuration file from specified self._gpccdc_config_file
        Use self._dcPushPort and self._dcPullPort to fill in ports numbers in this file base on self._gpccdc_url
        
        :return: Zero if success, -1 if error
        :rtype: integer
        """
        rc = 0
        xmlErr = None

        fileContent = dict()
        xmlErr = self.readXmlFile(fileContent,self._gpccdc_config_file)
        
        if xmlErr == None:
            searchedBalise = ['CONFIG','DataControllerConfig','fromDcToClient']
            searchedBaliseContent = self._gpccdc_url.format(self._dcPullPort)
            xmlErr = self.setXmlConfValueInFileContent(fileContent,searchedBalise,searchedBaliseContent)
            if xmlErr == None:
                searchedBalise = ['CONFIG','DataControllerConfig','fromClientToDc']
                searchedBaliseContent = self._gpccdc_url.format(self._dcPushPort)
                xmlErr = self.setXmlConfValueInFileContent(fileContent,searchedBalise,searchedBaliseContent)
                if xmlErr == None:    
                    xmlErr = self.writeXmlFile(fileContent['content'],self._feature_conf)
                    if xmlErr != None:
                        print("GPCCHS error when writing GPCCDC configuration file {} : {}".format(self._feature_conf,xmlErr))
                        rc = -1
                else:
                    print("GPCCHS error when generating the content of GPCCDC configuration file from {} template : {}".format(self._gpccdc_config_file,xmlErr))
                    rc = -1
            else:
                print("GPCCHS error when generating the content of GPCCDC configuration file from {} template : {}".format(self._gpccdc_config_file,xmlErr))
                rc = -1
        else:
            print("GPCCHS error when reading GPCCDC configuration template file {} : {}".format(self._gpccdc_config_file,xmlErr))
            rc = -1

        return rc
            
    def run(self):
        """
        Main function

        Perform necessary operation to run GPCCHS

        :return: Zero if success and -1 if error
        :rtype: integer
        """
        rc = 0
        stdstreams = dict(out=None,error=None)
        portsNums = []
        if rc == 0:
            rc = self._exec_cmd("localslot --type gpvima",stdstreams)
        if rc == 0:
            self._read_ports_numbers(stdstreams['out'].strip('\n \t'),portsNums)
            if self._debug == True:
                print("GPCCHS gets the following list of available ports:\n",portsNums)
            try:
                self._dcPushPort = portsNums[1]
                self._dcPullPort = portsNums[2]
            except IndexError:
                print("GPCCHS not enought UDP allocated to let the application work")
                rc=-1
        if rc == 0:
            if self._feature_id == None:
                rc = self._write_gpccdc_conf_file()
                if rc == 0:
                    rc = self._create_feature()
                    if self._feature_id == None:
                        print("GPCCHS Feature cannot be created, check if session and desktop are running")
                        rc = -1
            if self._feature_id != None:
                self._gpccdc_created = True
        if rc == 0:
            rc = self._activate_feature()
        if rc == 0:
            rc = self._start_feature()
        if rc == 0:
            self._gpccdc_started = True
        if self._debug == True:
            self._hscLogOutput = sys.stdout
        if rc == 0:
            os.chdir(self._hscPath)
            self._hscProc = self._run_process(' '.join(self._hsc_run_cmd) + ' ' + ' '.join(self._hsc_args),self._hscLogOutput)
            if self._hscProc == None:
                print("GPCCHS launcher failed to run GPCCHS process, launch aborted")
                rc = -1
        if rc == 0:
            print("GPCCHS Successfully started")
            try:
                while self._hscProc.poll() == None:
                    sleep(1)
            except KeyboardInterrupt:
                print("\nGPCCHS and GPCCDC processes aborted by user")
        if self._hscProc:
            if self._hscProc.poll() == None:
                self._hscProc.terminate()
        if self._gpccdc_started:
            rc = self._stop_feature()
            self._gpccdc_started = False
        if self._gpccdc_created:
            rc = self._destroy_feature()
            self._gpccdc_created = False
        if self._hscLogOutput:
            self._hscLogOutput = None
        return rc

if __name__ == '__main__':

    #Parse known and unknown arguments
    known_args = None
    unknown_args = None
    known_args, unknown_args = parser.parse_known_args()

    exit(GPCCHS(known_args, unknown_args).run())
    # End of user code
