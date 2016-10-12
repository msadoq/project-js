 #!/bin/bash

export readonly ERROR=1
export readonly WARN=2
export readonly INFO=3
export readonly DEBUG=4
export readonly VERBOSE=5

export readonly OK=0
export readonly KO=1

#############################
#  CONFIGURATION
#############################
if [ -z "${LOGLEVEL}" ] ; then
  export LOGLEVEL="${INFO}"
fi

