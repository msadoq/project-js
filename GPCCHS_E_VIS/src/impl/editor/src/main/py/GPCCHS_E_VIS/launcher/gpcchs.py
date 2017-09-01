
# Produced by Acceleo Python Generator 1.1.0-R7S1-20151214

#!/usr/bin/env python
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
#
# VERSION  : 1.0  : Creation
#
# END-HISTORY
# ====================================================================

# Start of user code ImportsZone
import os
import re
import sys
import subprocess
from time import sleep
from time import strftime

from jinja2 import FileSystemLoader
from jinja2 import Template
from jinja2 import Environment

class IsisContainerError(Exception):
    """
    Custom exception When no container has been found by isisStartContainer
    """
    pass
    
# End of user code


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
    _gpccdc_url = 'tcp://127.0.0.1:{}'
    _conf_template_fmd_path = "DATA_PRODUCT/CCC/CONF_COMPONENT/ISIS/GPVI/gpcchs_e_vis-default.xml"
    _default_node_path = '/usr/share/isis/bin/node'
    _default_feature = "vima"

    _iedit_cmd_base = "iedit -e feat/{} -c conf/default.ini -f {} {}"
    _cmd_args = '--command={} --argc=6 --arg1={} --arg2={}= --arg3={} --arg4={} --arg5={} --arg6="{}"'

    @property
    def _gpcchsClient_wrapper_py(self):
        """
        Get the GPCCHS client wrapper python script file path.
        """
        return os.path.abspath(os.path.join(self._ROOT, 'gpcchsClientWrapper.py'))

    @property
    def _iedit_cmd(self):
        """
        Property holding iedit command-line as list
        """
        if self._debug:
            debug = "ConsoleOutputOn"
        else:
            debug = "ConsoleOutputOff"
        if len(self._hsc_args):
            forwarded_args = ' '.join(self._hsc_args)
        else:
            forwarded_args = "None"
        cmd_args = self._cmd_args.format(
            sys.executable,
            self._gpcchsClient_wrapper_py,
            debug,
            self._fmd_root,
            self._dcPushUrl,
            self._dcPullUrl,
            forwarded_args
        )
        return self._iedit_cmd_base.format(
            self._feature,
            self._feature_conf,
            cmd_args
        ).split()

    # End of user code

    def __init__(self, options, unknown_args):
        """!
        @brief : Constructor
        """
        # generated
        # Start of user code __init__
        self._dcPushUrl = None
        self._dcPullUrl = None
        if options.feature != "":
            self._feature = options.feature
        else:
            self._feature = self._default_feature
        if os.environ.get('ISIS_DOCUMENT_DIR') != None:
            self._fmd_root = os.environ.get('ISIS_DOCUMENT_DIR') + '/'
        else:
            raise IsisContainerError("GPCCHS Launcher cannot read ISIS_DOCUMENT_DIR environment variable")
        if options.config != "":
            self._feature_conf_template = options.config
        else:
            self._feature_conf_template = self._fmd_root + self._conf_template_fmd_path
        if os.environ.get('ISIS_NODE_BINARY') == None:
            self._node_path = self._default_node_path
        else:
            self._node_path = os.environ.get('ISIS_NODE_BINARY')
        self._feature_conf = self._ISIS_WORK_DIR + "config_GPCCHS_" + strftime("%Y%m%d%H%M%S") + "_" + repr(os.getpid()) + ".xml"
        self._hsc_args = unknown_args
        self._debug = options.debug
        # End of user code

    def __del__(self):
        """!
        @brief : Destructor
        """
        # generated
        # Start of user code __del__
        self._dcPushUrl = None
        self._dcPullUrl = None
        self._feature = None
        self._feature_conf = None
        self._fmd_root =  None
        self._node_path = None
        self._hsc_args = None
        self._debug = None
        # End of user code

    def _run_iedit(self):
        """
        Run iedit command to launch GPCCHS
        
        :return: Zero if success, -1 if error
        :rtype: integer
        """
        rc = 0

        try:
            # Create command as single string to get a correct execution of iedit using bash
            commandToExec = ' '.join(self._iedit_cmd)
            if self._debug == True:
                print("GPCCHS launcher execute: ",commandToExec)
            proc = subprocess.Popen(
                commandToExec,
                env=os.environ,
                shell=True,#Required to let iedit correctly process arguments
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            proc.wait()
            stdoutstream = proc.stdout.read().decode('utf-8')
            stderrstream = proc.stderr.read().decode('utf-8')
            if self._debug == True:
                print(stdoutstream)
            if re.search('error', stdoutstream, re.IGNORECASE) or re.search('error', stderrstream, re.IGNORECASE):
                print(stdoutstream)
                print(stderrstream) 
                rc = -1
        except subprocess.CalledProcessError as error:
            print("GPCCHS Launcher iedit execution error:", error)
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

    def _write_conf_file(self):
        """
        Create in self._feature_conf the xml configuration file from specified self._feature_conf_template
        Use self._dcPushUrl and self._dcPullUrl to fill in push and pull url
        
        :return: Zero if success, -1 if error
        :rtype: integer
        """
        rc = 0
        xmlErr = None

        fileContent = dict()
        xmlErr = self.readXmlFile(fileContent,self._feature_conf_template)
        
        if xmlErr == None:
            searchedBalise = ['CONFIG','DataControllerConfig','fromDcToClient']
            searchedBaliseContent = self._dcPullUrl
            xmlErr = self.setXmlConfValueInFileContent(fileContent,searchedBalise,searchedBaliseContent)
            if xmlErr == None:
                searchedBalise = ['CONFIG','DataControllerConfig','fromClientToDc']
                searchedBaliseContent = self._dcPushUrl
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
                self._dcPushUrl = self._gpccdc_url.format(portsNums[1])
                self._dcPullUrl = self._gpccdc_url.format(portsNums[2])
            except IndexError:
                print("GPCCHS not enought UDP allocated to let the application work")
                rc=-1
        if rc == 0:
            rc = self._write_conf_file()
            if rc == 0:
                rc = self._run_iedit()
        if rc == 0:
            print("GPCCHS Successfully started")
        return rc

if __name__ == '__main__':
    # Imported only if called through CLI
    import argparse

    parser = argparse.ArgumentParser(description='Run visualization application')
    parser.add_argument("--debug",
        action='store_true',
        help="Activate the traces"
    )
    parser.add_argument("--config", "-c",
        default="",
        help="Optional configuration file")
    parser.add_argument("--feature","-f",
        default="",
        help="Feature to launch")
    #Parse known and unknown arguments
    known_args = None
    unknown_args = None
    known_args, unknown_args = parser.parse_known_args()

    exit(GPCCHS(known_args, unknown_args).run())
    # End of user code
