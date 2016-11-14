
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


class IsisContainerError(Exception):
    """
    Custom exception When no cantainer
    has been found by isisStartContainer
    """
# End of user code


class GPCCHS(object):
    """!
    @brief: GPCCHS_E_VIS.gpcchs : Launcher of GPCCHS visualization application
    """
    _ROOT = os.path.dirname(__file__)
    # Start of user code ProtectedAttrZone
    _container_dir = '/data/isis/work/'
    _feature_name = 'gpcchs_e_vis_launcher-default.xml'
    _container_pid_file = '{}gpinde-isis-desktopx.demo-:0-container.pid'

    _startContainerCmd = 'gpcctc_l_cnt_isisStartContainer_cmd -p {0} --cd {1}{0}'
    _hssPath = '/usr/share/isis/lib/js/gpcchs_e_vis_launcher/server'
    _hssRunCmd = 'NODE_ENV=production DEBUG=GPCCHS:* LEVEL=INFO HTTP_LOGS=0 PORT={} ZMQ_GPCCDC_PUSH=tcp://127.0.0.1:{} ZMQ_GPCCDC_PULL=tcp://127.0.0.1:{} ZMQ_VIMA_TIMEBAR=tcp://127.0.0.1:{} ZMQ_VIMA_TIMEBAR_INIT=tcp://127.0.0.1:{} ZMQ_VIMA_STUB_TIMEBAR= STUB_DC_ON=off STUB_TB_ON=off MONITORING=off PROFILING=off node --max_old_space_size=8000 index'
    _hscPath = '/usr/share/isis/lib/js/gpcchs_e_vis_launcher/client'
    _hscRunCmd = './lpisis_gpcchs_e_clt --HSS=http://127.0.0.1:{} --FMD_ROOT=$FMD_ROOT_DIR --OPEN={} --PROFILING=off'

    @property
    def _hss_run_cmd(self):
        """
        Property holding HSS run command-line as list
        """
        return self._hssRunCmd.format(
            self._hssPort,
            self._dcPushPort,
            self._dcPullPort,
            self._tbPullPort,            
            self._tbPushPort
        ).split()

    @property
    def _hsc_run_cmd(self):
        """
        Property holding HSC run command-line as list
        """
        return self._hscRunCmd.format(
            self._hssPort,
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
            self._feature_name
        ).split()

    @property
    def _cactivate_cmd(self):
        """
        Property holding container activate command-line as list
        """
        return '{} -- cactivate {}'.format(
            self._container_cmd_base,
            self._feature_id
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

    # End of user code

    def __init__(self, options):
        """!
        @brief : Constructor
        """
        # generated
        # Start of user code __init__
        self._context = {}
        self._timebarName = 'TB1'
        self._hssPort = None
        self._dcPushPort = None
        self._dcPullPort = None
        self._tbPushPort = None
        self._tbPullPort = None
        self._fmdRoot = None
        self._feature_id = None
        self.__container_pid = None
        self._workspace = options.workspace
        # End of user code

    def __del__(self):
        """!
        @brief : Destructor
        """
        # generated
        # Start of user code __del__
        self._context = None
        self._timebarName = None
        self._hssPort = None
        self._dcPushPort = None
        self._dcPullPort = None
        self._tbPushPort = None
        self._tbPullPort = None
        self._fmdRoot = None        
        self._workspace = None
        self._feature_id = None
        self.__container_pid = None
        # End of user code

    # Start of user code ProtectedOperZone
    def _create_feature(self):
        """
        Create the feature defined in self._feature_name
        
        :return: Zero if success, -1 if error
        :rtype: integer
        """

        def extract_eid(stdout):
            """
            Extract through regex the EID from ccreate command
            """
            p = re.compile(r'eid ([\d]+)', re.IGNORECASE)
            matches = re.findall(p, stdout)
            return matches[0] if matches else None

        try:
            proc = subprocess.Popen(
                self._ccreate_cmd,
                env=os.environ,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            self._feature_id = extract_eid(proc.stdout.read().decode('utf-8'))
            print('Feature instance created under ID {}.'.format(self._feature_id))
        except subprocess.CalledProcessError as error:
            print("GPCCHS Launcher Feature creation process error:", error)
            return -1
        return 0

    def _activate_feature(self):
        """
        Activate the feature (must be created first)
        
        :return: Zero if success, -1 if error
        :rtype: integer
        """
        try:
            print('Activating feature ID {}...'.format(self._feature_id))
            proc = subprocess.Popen(
                self._cactivate_cmd,
                env=os.environ,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            for std in [proc.stdout, proc.stderr]:
                if std:
                    std = std.read().decode('utf-8')
                    if 'Error=1' in std:
                        raise IsisContainerError(std)
        except subprocess.CalledProcessError as error:
            print("GPCCHS Launcher Feature activation process error:", error)
            return -1
        return 0

    def _start_feature(self):
        """
        Start the feature (must be activated first)
        
        :return: Zero if success, -1 if error
        :rtype: integer
        """
        try:
            print('Starting feature ID {}...'.format(self._feature_id))
            proc = subprocess.Popen(
                self._cstart_cmd,
                env=os.environ,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            for std in [proc.stdout, proc.stderr]:
                if std:
                    std = std.read().decode('utf-8')
                    if 'Error=1' in std:
                        raise IsisContainerError(std)
        except subprocess.CalledProcessError as error:
            print("GPCCHS Launcher Feature start process error:", error)
            return -1
        return 0

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
        proc = None
        try:
            print('Executing command : {}'.format(cmd))
            proc = subprocess.Popen(
                cmd.split(),
                env=os.environ,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            proc.wait()
            stdstreams['out'] = proc.stdout.read().decode('utf-8')
            stdstreams['error'] = proc.stderr.read().decode('utf-8')
        except subprocess.CalledProcessError as error:
            print("GPCCHS Launcher Command execution error:", error)
            return None
        return proc.returncode

    def _run_process(self, cmd):
        """
        Run a process
        
        :param cmd: Command to run the process
        :type cmd: string
        :return: Created process or None is process creation failed
        :rtype: subprocess.Popen
        """
        proc = None
        try:
            print('Running command : {}'.format(cmd))
            proc = subprocess.Popen(
                cmd.split(),
                env=os.environ,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            for std in [proc.stdout, proc.stderr]:
                if std:
                    std = std.read().decode('utf-8')
                    if 'Error=1' in std:
                        raise IsisContainerError(std)
        except subprocess.CalledProcessError as error:
            print("GPCCHS Launcher Process creation error:", error)
            return proc
        return proc
    
    def _read_ports_numbers(self,filepath,portslist):
        """
        Read and return a list of port from a given file
        """
        try:
            readFile = open(filepath,'r')
        except IOError:
            print("GPCCHS Ports list reading fail from file:",filepath)
        else:
            for line in readFile.readlines():
                portslist.append(line.strip('\n \t'))
            readFile.close()

    def run(self):
        """
        Main function

        Perform necessary operation to run GPCCHS

        :return: Zero if success and -1 if error
        :rtype: integer
        """
        rc = -1
        stdstreams = dict(out=None,error=None)
        portsNums = []
        rc = self._exec_cmd("localslot --workdir /tmp --type gpvima",stdstreams)
        if rc == 0:
            self._read_ports_numbers(stdstreams['out'].strip('\n \t'),portsNums)
            if len(portsNums) >= 5:
                self._hssPort = portsNums[0]
                self._dcPushPort = portsNums[1]
                self._dcPullPort = portsNums[2]
                self._tbPushPort = portsNums[3]
                self._tbPullPort = portsNums[4]
                print("HSS run command:",' '.join(self._hss_run_cmd))
                print("HSC run command:",' '.join(self._hsc_run_cmd))
                os.environ['PORT_NUM_TIMEBAR_PULL'] = self._tbPullPort
                os.environ['PORT_NUM_TIMEBAR_PUSH_{}'.format(self._timebarName)] = self._tbPushPort
                print("Timebar listening on port ",os.environ['PORT_NUM_TIMEBAR_PULL'])
                print("Timebar TB1 push on port ",os.environ['PORT_NUM_TIMEBAR_PUSH_TB1'])
                if rc == 0:
                    if not self._feature_id:
                        rc = self._create_feature()
                    if rc == 0 and self._feature_id:
                        rc = self._activate_feature()
                    if rc == 0 and self._feature_id:
                        rc = self._start_feature()
        return rc


if __name__ == '__main__':
    # Imported only if called through CLI
    import argparse

    parser = argparse.ArgumentParser(description='Run visualization application')
    parser.add_argument(
        "workspace",
        help="The FMD path of the workspace to open"
    )
    exit(GPCCHS(parser.parse_args()).run())
    # End of user code