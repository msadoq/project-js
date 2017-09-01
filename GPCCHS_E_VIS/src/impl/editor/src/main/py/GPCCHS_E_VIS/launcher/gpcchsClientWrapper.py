# !/usr/bin/env python
# -*- coding: utf-8 -*-
"""!
Project   : ISIS
Component : GPCCHS_E_VIS
@file     : gpcchsClientWrapper.py
@author   : isis
@date     : 23/01/2017
@brief    : Wrapper to launch GPCCHS client inside ISIS container
@type     : Class
"""
# ====================================================================
# HISTORY
# VERSION : 1.1.0 : : : 28/02/2017 : Initial version
# END-HISTORY
# ====================================================================

# Start of user code ImportsZone
import os
import sys
import time
import errno
import signal
import subprocess


class GPCCHSClientWrapper(object):
    """!
    @brief: GPCCHS_E_VIS.GPCCHSClientWrapper : Wrapper to let ISIS container manage the lifecycle of GPCCHS Client
    """
    # Start of user code ProtectedAttrZone
    # Time to wait between loop when monitoring child process ID
    _WAITING_TIME_IN_SEC = .75
    _process_factory = subprocess.Popen
    _on_stop_signals = (
        signal.SIGHUP,  # Hangup
        signal.SIGINT,  # Terminal interrupt signal
        signal.SIGABRT,  # Process abort signal
        signal.SIGTERM,  # Termination signal
        signal.SIGQUIT,  # Terminal quit signal
    )
    _cmd_options = {}
    _hsc_cmd = '/usr/share/isis/lib/js/gpcchs_e_vis_launcher/client/lpisis_gpcchs_e_clt --ISIS_DOCUMENTS_ROOT={} --NODE_PATH=/usr/share/isis/bin/node --ZMQ_GPCCDC_PUSH={} --ZMQ_GPCCDC_PULL={} '

    @property
    def _pid(self):
        """
        Property holding the child process ID

        :return: Child process ID
        :rtype: int
        """
        return self._process.pid

    @property
    def _cmd_as_list(self):
        """
        Export the command and its arguments as a list

        :return: The full command (with arguments)
        :rtype: list
        """
        return (
            self._hsc_cmd.format(
            self._fmd_root_dir,
            self._zmq_push,
            self._zmq_pull
            ).split() + self._hsc_args
        )

    def __init__(self, options, unknown_args):
        """!
        @brief : Constructor
        """
        # generated
        # Start of user code __init__
        if options.debug == "ConsoleOutputOn":
            self._debug = True
        else:
            self._debug = False
        self._fmd_root_dir = options.fmd_root_dir
        self._zmq_push = options.zmq_push_url
        self._zmq_pull = options.zmq_pull_url
        self._hsc_args = [""]
        if unknown_args and len(unknown_args) and unknown_args[0] != "None":
            self._hsc_args = unknown_args
        if self._debug == True:
            print("gpcchsClientWrapper called, unknown_args:", repr(unknown_args))
            print("gpcchsClientWrapper, _hsc_args:", repr(self._hsc_args))
        self._process = None
        # Set necessary environment variables
        os.environ["RTD_UNIX_SOCKET"]='0'
        # End of user code

    def __del__(self):
        """!
        @brief : Destructor
        """
        # generated
        # Start of user code __del__
        self._process = None
        self._debug = None
        self._fmd_root_dir = None
        self._zmq_push = None
        self._zmq_pull = None
        self._hsc_args = None
        # End of user code

    # Start of user code ProtectedOperZone
    @staticmethod
    def is_alive(pid):
        """
        Check if a child process is alive

        :param int pid: The child process ID
        :return:  Whether child process is alive or not
        :rtype: bool
        """
        try:
            return os.waitpid(pid, os.WNOHANG) == (0, 0)
        except OSError as e:
            if e.errno != errno.ECHILD:
                raise

    def _prepare_options(self, logFile=None):
        """
        Prepare inner command context options to execute

        """
        self._cmd_options['env'] = env = os.environ.copy()

        if logFile:
            self._cmd_options['stdout'] = logFile
            self._cmd_options['stderr'] = logFile
        else:
            self._cmd_options['stdout'] = subprocess.PIPE
            self._cmd_options['stderr'] = subprocess.PIPE

    def _prepare_handlers(self):
        """
        Register ending handler(s) to current process for signals

            * `SIGHUP` (Hangup)
            * `SIGINT` (Terminal interrupt signal)
            * `SIGABRT` (Process abort signal)
            * `SIGTERM` (Termination signal)
            * `SIGQUIT` (Terminal quit signal)

        Note: `SIGKILL` cannot be caught nor ignored (in a POSIX environment)
        """
        for _signal in self._on_stop_signals:
            signal.signal(_signal, self._stop)

    def _prepare(self):
        """
        Template method

        Prepare the inner command to be executed
        """
        logFile = None
        if self._debug == True:
            logFile = sys.stdout
        self._prepare_options(logFile)
        self._prepare_handlers()

    def _start(self):
        """
        Start executing inner command
        """
        self._prepare()
        cmdAsList = self._cmd_as_list
        if self._debug == True:
            cmdAsList.append("--LOG=console?level=debug") #To remove when iedit will forward arguments containing spaces (FA7446)
            print('GPCCHS_ClientWrapper Running command : {}'.format(' '.join(cmdAsList)))
        self._process = self._process_factory(cmdAsList, **self._cmd_options)

    def _wait(self):
        """
        Wait for started Process
        """
        while self.is_alive(self._pid):
            time.sleep(self._WAITING_TIME_IN_SEC)

    def _stop(self, *args):
        """
        Kill the process by sending `SIGTERM` signal
        through `os.kill``method

        :param tuple args: optional arguments
            when called through `signal.signal`

        :return: Return code Status
        :rtype: int
        """
        rc = 0
        pid = self._pid
        if self._debug == True:
            print('GPCCHS_ClientWrapper try to kill pid {}'.format(pid))
        try:
            os.kill(pid, signal.SIGTERM)
        except OSError as error:
            print("GPCCHS_ClientWrapper : OSError > ", error.errno)
            print("GPCCHS_ClientWrapper : OSError > ", error.strerror)
            print("GPCCHS_ClientWrapper : OSError > ", error.filename)
            rc = error.errno
        except Exception as err:
            print("GPCCHS_ClientWrapper : Exception > ", err)
            rc = -1
        return rc

    def run(self):
        """
        Main entry point
        """
        self._start()
        self._wait()


if __name__ == '__main__':
    # Imported only if called through CLI
    import argparse
    
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "debug",
        help="Activate the traces, either equal to ConsoleOutputOn or ConsoleOutputOff"
    )
    parser.add_argument(
        "fmd_root_dir",
        help="Base folder of the FMD document folder"
    )
    parser.add_argument(
        "zmq_push_url",
        help="URL with port number on which push ZMQ packet"
    )
    parser.add_argument(
        "zmq_pull_url",
        help="URL with port number on which pull ZMQ packet"
    )

    #Parse known and unknown arguments
    known_args = None
    unknown_args = None
    known_args, unknown_args = parser.parse_known_args()

    GPCCHSClientWrapper(known_args, unknown_args).run()
    # End of user code
