#!/usr/bin/env isisPython
# -*- coding: utf-8 -*-
"""! 
Project   : ISIS
Component : GPCCHS_E_VIS
@file     : gpcchs.py
@author   : isis
@date     : 28/08/2017
@brief    : Launcher of javacript VIsualization Main Application
@type     : Class
"""
# ====================================================================
# HISTORY
#
# VERSION  : 1.0  : Creation
#
# VERSION : 1.1.2 : FA : #7472 : 01/09/2017 : Update javascript VIMA launcher to used iedit and
#  manage the features it launch, remove the old launcher
# VERSION : 1.1.2 : FA : #7472 : 01/09/2017 : Update launcher options list to have -d for debug
#  traces
# VERSION : 1.1.2 : FA : #8019 : 23/09/2017 : Correct debugMode tag for GPCCDC configuration
# VERSION : 2.0.0 : FA : #8019 : 12/10/2017 : Correct debugMode tag for GPCCDC configuration
# VERSION : 2.0.0 : FA : #8557 : 20/10/2017 : Addition of Js VIMA configuration path read in
#  session document and give it a GPCCHS launch
# END-HISTORY
# ====================================================================

import os
import re
import sys
import subprocess
from time import sleep
from time import strftime
import argparse

class IsisContainerError(Exception):
    """
    Custom exception When no container has been found by isisStartContainer
    """
    pass

# Creation of an argument parser to provide it to the caller python code
GPCCHS_argsParser = argparse.ArgumentParser(description='Run the visualization main application')
GPCCHS_argsParser.add_argument("-d","--debug",action='store_true',
                              help="Activate the debug traces in console")
GPCCHS_argsParser.add_argument("--configFile","-c",default="DATA_PRODUCT/ALL_TARGETS/CONF_COMPONENT/GPVI/gpcchs_e_vis-config.xml",type=str,
                              help="FMD path of the configuration file to use, which shall contain GPCCDC and GPMCPU configuration")
                             
class GPCCHS_launcher(object):
    """!
    @brief: GPCCHS_launcher : Launcher of the visualization main application
    """
    _ISIS_WORK_DIR = os.environ.get('ISIS_WORK_DIR')
    _url_base = 'tcp://127.0.0.1:{}' # Basis URL used to give UDP ports to GPCCDC and GPMCPU
    _default_node_path = '/usr/share/isis/bin/node' # Full path of the executable of GPCCHS to use in case env var ISIS_NODE_BINARY is not set
    _feature_conf_template_fmd_path = "DATA_PRODUCT/ALL_TARGETS/CONF_COMPONENT/GPVI/gpcchs_e_vis-config.xml" # Path of the feature configuration file, which shall contain GPCCDC and GPMCPU configuration and will be update by the launcher to write UDP ports in it
    _gpccdcPullPortXmlBalise = ['CONFIG','DataControllerConfig','fromDcToClient'] # XML balise used for GPCCDC PULL port in configuration file
    _gpccdcPushPortXmlBalise = ['CONFIG','DataControllerConfig','fromClientToDc'] # XML balise used for GPCCDC PUSH port in configuration file
    _gpccdcDebugModeXmlBalise = ['CONFIG','DataControllerConfig','debugMode'] # XML balise used for GPCCDC debug mode activation in configuration file
    _gpmcpuPullPortXmlBalise = ['CONFIG','PUS_EDITOR_CONFIGURATION','URI_FOR_RCV'] # XML balise used for GPMCPU PULL port in configuration file
    _gpmcpuPushPortXmlBalise = ['CONFIG','PUS_EDITOR_CONFIGURATION','URI_TO_SEND'] # XML balise used for GPMCPU PUSH port in configuration file
    _default_feature_fmd_path = "DATA_PRODUCT/ALL_TARGETS/FEATURES/GPVI/gpcchs_e_vis_launcher-default.feat" # Path of the launcher feature used in iedit command
    _iedit_cmd_base = "iedit -e {} -c conf/default.ini -f {}" # Basis to generate iedit command used to start the launcher
    _insertionConfBalise = "<CONFIG>" # Balise used to insert right after the launcher configuration in configuration file

    @property
    def _iedit_cmd(self):
        """
        Property holding iedit command-line as list
        """
        return self._iedit_cmd_base.format(
            self._feature,
            self._feature_conf,
        ).split()


    def __init__(self, options, unknown_args):
        """!
        Constructor
        """
        if self._ISIS_WORK_DIR and not self._ISIS_WORK_DIR.endswith('/') : 
            self._ISIS_WORK_DIR = self._ISIS_WORK_DIR + '/'
        if not self._ISIS_WORK_DIR:
            raise IsisContainerError('GPCCHS Launcher error : Environment variable `ISIS_WORK_DIR` is not set')        
        self._dcPushUrl = None
        self._dcPullUrl = None
        self._mcPushUrl = None
        self._mcPullUrl = None
        if os.environ.get('ISIS_DOCUMENT_DIR') != None:
            self._fmd_root = os.environ.get('ISIS_DOCUMENT_DIR') + '/'
        else:
            raise IsisContainerError("GPCCHS Launcher error : Cannot read ISIS_DOCUMENT_DIR environment variable")
        if os.environ.get('ISIS_NODE_BINARY') == None:
            self._node_path = self._default_node_path
        else:
            self._node_path = os.environ.get('ISIS_NODE_BINARY')
        self._feature = self._fmd_root + self._default_feature_fmd_path
        self._feature_conf_template = self._fmd_root + options.configFile
        if os.path.isfile(self._feature_conf_template) is False:
            raise IsisContainerError("GPCCHS Launcher error : Given configuration file cannot be read : {}".format(self._feature_conf_template))
        self._feature_conf = self._ISIS_WORK_DIR + "config_GPCCHS_" + strftime("%Y%m%d%H%M%S") + "_" + repr(os.getpid()) + ".xml"
        self._js_args = unknown_args
        self._debug = options.debug
        if self._debug == True:
            print("GPCCHS launcher configuration file is ",self._feature_conf_template)

    def __del__(self):
        """!
        Destructor
        """
        self._dcPushUrl = None
        self._dcPullUrl = None
        self._mcPushUrl = None
        self._mcPullUrl = None
        self._node_path = None
        self._feature = None
        self._feature_conf = None
        self._fmd_root =  None
        self._js_args = None
        self._debug = None

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
        except IOError as e:
            print("GPCCHS  launcher error : Ports list reading fail from file {} : {}".format(filepath,e.strerror))
        else:
            for line in readFile.readlines():
                portslist.append(line.strip('\n \t'))
            readFile.close()

    def readXmlFile(self, filepath):
        '''
        Read an xml file and return its content
        
        :param filepath: Absolute parth of the file to read
        :type filepath: string
        :return: String describing the error, None if no error occured, and content of the read file
        :rtype: string, string
        '''
        retErr = None
        filecontent = ""
        try:
            readfile = open(filepath,'r')
        except IOError as e:
            retErr = "GPCCHS launcher error when reading configuration template file {} : {}".format(self._feature_conf_template,e.strerror)
        else:
            filecontent = readfile.read()
            readfile.close()

        return retErr, filecontent

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
        except IOError as e:
            retErr = "Error while opening the file {} for writing : {}".format(filepath,e.strerror)
        else:
            filecontent = writtenfile.write(content)
            writtenfile.close()

        return retErr        

    def setXmlConfValueInFileContent(self,xmlFileContent,baliseTree,baliseValue):
        '''
        Replace the value of a given balise value
        Balise is defined as the list. For exemple, baliseTree set with ['CONFIG', 'DataControllerConfig', 'fromDcToClient']
        will makes this function to look for
        (...)<CONFIG (...)
            <DataControllerConfig (...)
                <fromDcToClient(...)>VALUE</fromDcToClient (...)
        and replace VALUE with the content of baliseValue
        
        :param xmlFileContent: Content of the xml file for replacement
        :type xmlFileContent: string
        :param baliseTree: List of the xml elements defining the balise to set the value
        :type baliseTree: list
        :param baliseValue: Value to set in the balise defined by the baliseTree parameter
        :type baliseValue: string
        :return: String describing the error, None if no error occured, and content of the xml file after replacement
        :rtype: string, string
        '''
        retErr = None
        xmlBalise_pattern = re.compile(r"<[/]*[A-Za-z_][A-Za-z0-9_-]*",re.MULTILINE|re.UNICODE)
        contentToWrite = ""
        currentPosAmongBalises = []
        isBaliseFound = False

        while retErr == None and isBaliseFound == False:
            matchObject = xmlBalise_pattern.search(xmlFileContent)
            # Check if a balise has been found
            if matchObject :
                # Update the content to write with the read part of the content
                contentToWrite = contentToWrite + xmlFileContent[:matchObject.end(0)]
                # Update the content to read to remove the balise name
                xmlFileContent = xmlFileContent[matchObject.end(0):]
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
                            if xmlFileContent.find(">") == -1:
                                retErr = "End of configuration balise " + baliseTree + " not found"
                            if retErr == None:
                                # Read the rest of the balise
                                restOfBalise = xmlFileContent[:xmlFileContent.find(">")+1]
                                # Robustness check in case of missing ">" at the end of the balise
                                if restOfBalise.find("<") != -1:
                                    retErr = "Incorrect format of configuration start balise " + repr(baliseTree)
                                # Put in output content the rest of the balise and the requested content for it
                                contentToWrite = contentToWrite + restOfBalise + baliseValue
                                # Update the content to read to not parse the content of this balise
                                if xmlFileContent.find("<") == -1:
                                    retErr = "End of configuration balise " + repr(baliseTree) + " not found"
                                if retErr == None:
                                    xmlFileContent = xmlFileContent[xmlFileContent.find("<"):]
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
        contentToWrite = contentToWrite + xmlFileContent
        # Return result
        return retErr, contentToWrite

    def _write_conf_file(self):
        """
        Create in self._feature_conf from the self._feature_conf_template template file, the xml configuration file for IhmLauncher, GPCCDC and GPMCPU bundles
        
        :return: Zero if success, -1 if error
        :rtype: integer
        """
        rc = 0
        xmlErr = None
        xmlErr, templateConfFileContent = self.readXmlFile(self._feature_conf_template)
          
        if xmlErr == None:
            searchedBalise = self._gpccdcPullPortXmlBalise
            searchedBaliseContent = self._dcPullUrl
            xmlErr, confFileContent = self.setXmlConfValueInFileContent(templateConfFileContent,searchedBalise,searchedBaliseContent)
        else:
            print("GPCCHS error when reading configuration template file {} : {}".format(self._feature_conf_template,xmlErr))
            rc = -1
        if xmlErr == None:
            searchedBalise = self._gpccdcPushPortXmlBalise
            searchedBaliseContent = self._dcPushUrl
            xmlErr, confFileContent = self.setXmlConfValueInFileContent(confFileContent,searchedBalise,searchedBaliseContent)
        else:
            if rc != -1:
                print("GPCCHS error when looking for the balise {} in configuration file {} : {}".format(
                      searchedBalise,self._feature_conf_template,xmlErr))
                rc = -1
        if xmlErr == None:
            searchedBalise = self._gpmcpuPushPortXmlBalise
            searchedBaliseContent = self._mcPushUrl
            xmlErr, confFileContent = self.setXmlConfValueInFileContent(confFileContent,searchedBalise,searchedBaliseContent)
        else:
            if rc != -1:
                print("GPCCHS error when looking for the balise {} in configuration file {} : {}".format(
                      searchedBalise,self._feature_conf_template,xmlErr))
                rc = -1
        if xmlErr == None:
            searchedBalise = self._gpmcpuPullPortXmlBalise
            searchedBaliseContent = self._mcPullUrl
            xmlErr, confFileContent = self.setXmlConfValueInFileContent(confFileContent,searchedBalise,searchedBaliseContent)
        else:
            if rc != -1:
                print("GPCCHS error when looking for the balise {} in configuration file {} : {}".format(
                      searchedBalise,self._feature_conf_template,xmlErr))
                rc = -1
        if xmlErr == None: 
            searchedBalise = self._gpccdcDebugModeXmlBalise
            # 'True' is not taken into account by GPCCDC, it needs to be lowercase
            searchedBaliseContent = repr(self._debug).lower()
            xmlErr, confFileContent = self.setXmlConfValueInFileContent(confFileContent,searchedBalise,searchedBaliseContent)
        else:
            if rc != -1:
                print("GPCCHS error when looking for the balise {} in configuration file {} : {}".format(
                      searchedBalise,self._feature_conf_template,xmlErr))
                rc = -1 
        if xmlErr == None:
            # Look for the balise insertion point to put the launcher one right after
            insertionPoint = confFileContent.find(self._insertionConfBalise)
            if insertionPoint != -1:
                contentToWrite = confFileContent[:insertionPoint+len(self._insertionConfBalise)]
                insertionPoint = insertionPoint + len(self._insertionConfBalise)
            else:
                contentToWrite = self._insertionConfBalise
                insertionPoint = 0
            # Write the launcher configuration
            contentToWrite = contentToWrite + '\n    <IhmLauncherConfig>\n'
            contentToWrite = contentToWrite + "        <debug>" + repr(self._debug) + "</debug>\n"
            contentToWrite = contentToWrite + "        <fmdRoot>" + self._fmd_root + "</fmdRoot>\n"
            contentToWrite = contentToWrite + "        <nodePath>" + self._node_path + "</nodePath>\n"
            contentToWrite = contentToWrite + "        <dcPushUri>" + self._dcPushUrl + "</dcPushUri>\n"
            contentToWrite = contentToWrite + "        <dcPullUri>" + self._dcPullUrl + "</dcPullUri>\n"
            contentToWrite = contentToWrite + "        <mcPushUri>" + self._mcPushUrl + "</mcPushUri>\n"
            contentToWrite = contentToWrite + "        <mcPullUri>" + self._mcPullUrl + "</mcPullUri>\n"
            contentToWrite = contentToWrite + "        <featuresConfFile>" + self._feature_conf + "</featuresConfFile>\n"
            for arg in self._js_args:
                contentToWrite = contentToWrite + "        <additionalArg>" + arg + "</additionalArg>\n"
            contentToWrite = contentToWrite + "    </IhmLauncherConfig>"
            # Write the rest of the template configuration file
            contentToWrite = contentToWrite + confFileContent[insertionPoint:]
            # Write configuration file
            if self._debug == True:
                print("GPCCHS writes IhmLauncher configuration file in ",self._feature_conf)
            writeStatus = self.writeXmlFile(contentToWrite,self._feature_conf)
            if writeStatus != None:
                print("GPCCHS launcher error when writing configuration file {} : {}".format(self._feature_conf,writeStatus))
                rc = -1
        else:
            if rc != -1:
                print("GPCCHS error when looking for the balise {} in configuration file {} : {}".format(
                      searchedBalise,self._feature_conf_template,xmlErr))
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
            portsListFilePath = stdstreams['out'].strip('\n \t')
            self._read_ports_numbers(portsListFilePath,portsNums)
            if self._debug == True:
                print("GPCCHS gets the following list of available ports:\n",portsNums)
            try:
                self._dcPushUrl = self._url_base.format(portsNums[0])
                self._dcPullUrl = self._url_base.format(portsNums[1])
                self._mcPushUrl = self._url_base.format(portsNums[2])
                self._mcPullUrl = self._url_base.format(portsNums[3])
            except IndexError:
                print("GPCCHS launcher error : not enought UDP allocated to let the application work, see {} file".format(
                      portsListFilePath))
                rc=-1
        if rc == 0:
            rc = self._write_conf_file()
            if rc == 0:
                rc = self._run_iedit()
        if rc == 0:
            print("Visualization main application start requested to desktop\n(If it doesn't start, check that the default session selected in session widget contains a Js VIMA configuration)")
        return rc

if __name__ == '__main__':
    #Parse known and unknown arguments
    known_args = None
    unknown_args = None
    known_args, unknown_args = GPCCHS_argsParser.parse_known_args()

    exit(GPCCHS_launcher(known_args, unknown_args).run())

