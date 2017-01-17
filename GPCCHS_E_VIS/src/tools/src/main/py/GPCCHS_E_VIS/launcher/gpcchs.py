
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
    _gpccdc_feature_name = 'gpccdc_d_dbr-default.xml'
    _gpccdc_conf_path = '/usr/share/isis/conf/config_gpccdc_d_dbr-default.xml'
    _container_pid_file = '{}gpinde-isis-desktopx.demo-:0-container.pid'

    _startContainerCmd = 'gpcctc_l_cnt_isisStartContainer_cmd -p {0} --cd {1}{0}'
    _hscPath = '/usr/share/isis/lib/js/gpcchs_e_vis_launcher/client'
    _hscRunCmd = './lpisis_gpcchs_e_clt --FMD_ROOT={} --OPEN={}'
    _hscLogPath = '/var/log/isis/GPCCHS_E_VIS_client.log'

    @property
    def _hsc_run_cmd(self):
        """
        Property holding HSC run command-line as list
        """
        return self._hscRunCmd.format(
            self._fmd_root,
            self._workspace
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
                print("GPCCHS Getting desktopx container process ID failed, cannot read file:",filename)
            else:            
                self.__container_pid, _ = hdl.read().split()
        return self.__container_pid

    @property
    def _container_cmd_base(self):
        """
        Property holding container base command-line as list
        """
        return self._startContainerCmd.format(
            self._container_pid,
            self._container_dir
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

    def __init__(self, options):
        """!
        @brief : Constructor
        """
        # generated
        # Start of user code __init__
        self._context = {}
        self._hscProc = None
        self._dcPushPort = None
        self._dcPullPort = None
        self._fmdRoot = None
        self._feature_id = None
        self.__container_pid = None
        self._gpccdc_created = False
        self._gpccdc_started = False
        self._gpccdc_config_file = options.gpccdc_config_file
        if options.workspace.rfind('/') != -1:
            self._workspace = options.workspace[options.workspace.rfind('/')+1:]
            self._fmd_root = os.environ['FMD_ROOT_DIR'] + '/' + options.workspace[:options.workspace.rfind('/')+1]
        else:
            self._workspace = options.workspace
            self._fmd_root = os.environ['FMD_ROOT_DIR'] + '/'
        self._feature_conf = self._gpccdc_conf_path
        self._debug = options.debug
        self._hscLogFile = None
        # End of user code

    def __del__(self):
        """!
        @brief : Destructor
        """
        # generated
        # Start of user code __del__
        self._context = None
        self._timebarName = None
        self._hscProc = None
        self._dcPushPort = None
        self._dcPullPort = None
        self._fmdRoot = None
        self._workspace = None
        self._debug = None
        self._hscLogFile = None
        self._feature_id = None
        self._feature_conf = None
        self.__container_pid = None
        self._gpccdc_created = False
        self._gpccdc_started = False
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

    def _create_gpccdc_conf_file(self):
        """
        Create /tmp/gpccdc_d_dbr.conf file to give configuration to GPCCDC
        Patch to correct with FT:#4407
        
        :return: Zero if success, -1 if error
        :rtype: integer
        """
        rc = 0
        
        user = os.environ["USERNAME"]
        hostname = os.environ["HOSTNAME"]
        display = os.environ["DISPLAY"]
        filename = "gpinde-{}-{}-{}-default.ses".format(user, hostname, display)
        gpindefile = os.path.join(os.environ["ISIS_WORK_DIR"], filename)
        session = None
        if os.path.isfile(gpindefile) :
            fileopen = open(gpindefile)
            line = fileopen.readline()
            session = line[:len(line) -1]
            fileopen.close()
        else :
            session = "session-system"
        
        session = session.upper()
        session = session.split("-")[1]

        templatedir = "/usr/share/isis/templates"
        templatefile = "gpccdc_d_dbr.tpl"
        destfile = self._gpccdc_config_file

        loader = FileSystemLoader(templatedir)
        environment = Environment(loader = loader)
        template = environment.get_template(templatefile)

        config = template.render(session=session, pull=self._dcPullPort, push=self._dcPushPort)

        try:
            writeFile = open(destfile,'w')
        except IOError:
            print("GPCCHS Failed to create GPCCCDC ports configuratin file {}".format(destfile))
            rc = -1
        else:
            if self._debug == True:
                print("GPCCHS write GPCCDC configuration file with:\n",config)
            writeFile.write(config)
            writeFile.close()
        return rc
            
    def _open_log_file(self,filepath):
        """
        Open a log file to append process output in it
        
        :return: Opened file object or None if opening fail
        :rtype: file object
        """
        readFile = None
        try:
            readFile = open(filepath,'a')
        except IOError:
            print("GPCCHS Log file opening fail:",filepath)
        return readFile

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
        print("Considering FMD ROOT as", self._fmd_root)
        if not os.path.isfile(self._fmd_root + self._workspace):
            print("GPCCHS Specified workspace file does not exist: ", self._fmd_root + self._workspace)
            rc = -1
        if rc == 0:
            rc = self._exec_cmd("localslot --type gpvima",stdstreams)
        if rc == 0:
            self._read_ports_numbers(stdstreams['out'].strip('\n \t'),portsNums)
            if self._debug == True:
                print("GPCCHS gets the following list of available ports:\n",portsNums)
            if len(portsNums) >= 5:
                self._dcPushPort = portsNums[1]
                self._dcPullPort = portsNums[2]
            else:
                rc=-1
        if rc == 0:
            if not self._feature_id:
                rc = self._create_gpccdc_conf_file()
                if rc == 0:
                    rc = self._create_feature()
            if not self._feature_id:
                print("GPCCHS Feature cannot be created, check if session and desktop are running")
                rc = -1
            else:
                self._gpccdc_created = True
        if rc == 0:
            rc = self._activate_feature()
        if rc == 0:
            rc = self._start_feature()
        if rc == 0:
            self._gpccdc_started = True
        if self._debug == True:
            self._hscLogFile = self._open_log_file(self._hscLogPath)
        if rc == 0:
            os.chdir(self._hscPath)
            self._hscProc = self._run_process(' '.join(self._hsc_run_cmd),self._hscLogFile)
            if self._hscProc == None:
                print("GPCCHS Failed to create client, launch aborted")
                rc = -1
        if rc == 0:
            print("GPCCHS Successfully started")
            try:
                while self._hscProc.poll() == None:
                    if self._hscProc.poll() == None:
                        self._hscProc.terminate()
                        self._hscProc.wait()
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
            print("GPCCHS terminated GPCCDC, but run again this command to be sure: ",' '.join(self._cdestroy_cmd))
        if self._hscLogFile:
            self._hscLogFile.close()
        return rc

if __name__ == '__main__':
    # Imported only if called through CLI
    import argparse

    parser = argparse.ArgumentParser(description='Run visualization application')
    parser.add_argument(
        "workspace",
        help="The FMD path of the workspace to open"
    )
    parser.add_argument("--debug","-d",
        action='store_true',
        help="Activate the traces in /var/log/isis folder"
    )
    parser.add_argument("--gpccdc_config_file", default="/data/isis/work/gpccdc_dbr.conf")

    exit(GPCCHS(parser.parse_args()).run())
    # End of user code
