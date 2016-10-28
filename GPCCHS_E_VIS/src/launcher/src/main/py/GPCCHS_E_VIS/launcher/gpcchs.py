
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

    _cmd = 'gpcctc_l_cnt_isisStartContainer_cmd -p {0} --cd {1}{0}'
    _cmd_args = '-param command {} -param argc 2 -param arg1 {} -param arg2 {}'

    @property
    def _container_pid(self):
        """
        Get GPINDE `desktopx` container process ID
        """
        if not self.__container_pid:
            filename = self._container_pid_file.format(self._container_dir)
            with open(filename) as hdl:
                self.__container_pid, _ = hdl.read().split()
        return self.__container_pid

    @property
    def _cmd_base(self):
        """
        Property holding command-line as list
        """
        return self._cmd.format(
            self._container_pid,
            self._container_dir
        )

    @property
    def _ccreate_cmd(self):
        """
        Property holding command-line as list
        """
        cmd_args = self._cmd_args.format(
            sys.executable,
            self._workspace
        )
        return '{} -- ccreate {} {}'.format(
            self._cmd_base,
            self._feature_name,
            cmd_args
        ).split()

    @property
    def _cactivate_cmd(self):
        """
        Property holding command-line as list
        """
        return '{} -- cactivate {}'.format(
            self._cmd_base,
            self._feature_id
        ).split()

    @property
    def _cstart_cmd(self):
        """
        Property holding command-line as list
        """
        return '{} -- cstart {}'.format(
            self._cmd_base,
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
        self._options = options
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
        self._options = None
        self._workspace = None
        self._feature_id = None
        self.__container_pid = None
        # End of user code

    # Start of user code ProtectedOperZone
    def _run_ccreate(self):
        """
        Ensure feature is properly created into isisStartContainer
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
            print("GPCCHS Launcher CalledProcessError Error", error)
            return -1
        return 0

    def _run_cactivate(self):
        """
        Activate the feature (must be created first)
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
            print("GPCCHS Launcher CalledProcessError Error", error)
            return -1
        return 0

    def _run_cstart(self):
        """
        Start the feature (must be activated first)
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
            print("GPCCHS Launcher CalledProcessError Error", error)
            return -1
        return 0

    def _run_cmd(self, cmd):
        """
        Run a command
        """
        try:
            print('Running command : {}...'.format(cmd))
            proc = subprocess.Popen(
                cmd,
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
            print("GPCCHS Launcher CalledProcessError Error", error)
            return -1
        return 0

    def run(self):
        """
        Entry point

        Execute a call to `startContainer` through `subprocess` module.

        :return: A Process instance
        :rtype: subprocess.Popen
        """
        rc = 0
        if not self._feature_id:
            rc = self._run_ccreate()
        if rc == 0 and self._feature_id:
            rc = self._run_cactivate()
        if rc == 0 and self._feature_id:
            rc = self._run_cstart()
        if rc == 0:
            rc = self._run_cmd("code")
        return rc


if __name__ == '__main__':
    # Imported only if called through CLI
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument(
        "workspace",
        help="A folder path to open as workspace"
    )
    exit(GPCCHS(parser.parse_args()).run())
    # End of user code
