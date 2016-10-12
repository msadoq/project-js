 #!/bin/bash

#############################
#  Main log method
#############################
Log () {
  if [ $# -eq 3 ]; then
    LEVEL=$3
    METHOD=$1
    MESSAGE=$2

    if [ ${LEVEL} -le ${LOGLEVEL} ]; then
      case ${LEVEL} in
        ${ERROR})
          EchoLog "ERROR" ${METHOD} "${MESSAGE}";
        ;;
        ${WARN})
          EchoLog "WARN" ${METHOD} "${MESSAGE}";
        ;;
        ${INFO})
          EchoLog "INFO" ${METHOD} "${MESSAGE}";
        ;;
        ${DEBUG})
          EchoLog "DEBUG" ${METHOD} "${MESSAGE}";
        ;;
        ${VERBOSE})
          EchoLog "VERBOSE" ${METHOD} "${MESSAGE}";
        ;;
        *)
          EchoLog ${LEVEL} ${METHOD} "${MESSAGE}" 
        ;;
      esac
    fi
    return ${OK};
  elif [ $# -eq 2 ]; then
    Log "$1" "$2" ${DEBUG}
    return ${OK};
  elif [ $# -eq 1 ]; then
    Log "log" $1 ${DEBUG}
  else
    return ${KO}; 
  fi
}

LogErr () {
 MESSAGE=$1
 echo -e "$MESSAGE" 1>&2
}

#write status to the standard output
LogStatus () {
  MESSAGE=$1
  STATUS=$2
  VERT="\033[1;32m"
  ROUGE="\033[1;31m"
  GRAS="[\033[1;39m"
  NORMAL="\033[0;39m"
  COL_STATUS="\033[60G"
  COL_RETOUR="\033[0m"

  if [ ${STATUS} = ${OK} ]; then 
	STATUS_STRING="${COL_STATUS}${VERT}[ OK ]${NORMAL}${COL_RETOUR}"
  else 
	STATUS_STRING="${COL_STATUS}${ROUGE}[ KO ]${NORMAL}${COL_RETOUR}"  
  fi
  echo -e "${MESSAGE}${STATUS_STRING}"
}

EchoLog () {

    LEVEL=$1
    METHOD=$2
    MESSAGE=$3
    DATE_UTC=`date -u +"%Hh%Mm%Ss"`
    echo "${LEVEL}:${DATE_UTC}:${METHOD}:${MESSAGE}"
}


#############################
#  Set log level
#############################
setLogLevel () {
  if [ $# -eq 1 ]; then
    LOGLEVEL=$1
    return ${OK};
  else
    return ${KO};
  fi
}

# Inform debugger is ready to use
##Log "Logger loaded"

########
#  END
########
