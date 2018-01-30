# coding: utf-8
import sys
import ctypes
import os
import json
import random

def handler(inputParam):
	libc = ctypes.cdll.LoadLibrary('libc.so.6')
	# System dependent, see e.g. /usr/include/x86_64-linux-gnu/asm/unistd_64.h
	SYS_gettid = 186

	print ("Handler ----- input = " + repr(inputParam) + " PID = "+ repr(os.getpid()) + " ThreadID = " + repr(libc.syscall(SYS_gettid)));

	valeur = inputParam['value'];

	return int(valeur) * random.randint(2,100);


