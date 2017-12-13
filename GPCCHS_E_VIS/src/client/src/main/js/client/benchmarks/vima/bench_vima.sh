#!/bin/bash

# ====================================================================
# HISTORY
# VERSION : 1.1.2 : DM : #6816 : 09/08/2017 : add textviews with 10, 1000 and >5000 EP
# END-HISTORY
# ====================================================================

RENDERER_ON=0
MAIN_ON=0
HSS_ON=0

SLEEP_DELAY=5
CPT=0
ZERO=0

function getRendererPID {
  local PID="`pgrep gpcchs_renderer | tr -d '\n'`"
  if [ -z $PID ]; then
    echo "ERROR: Aucun process du nom de gpcchs_renderer est en cours d'execution"
    exit 1
  else
    echo $PID
  fi
}

function getHssPID {
  local PID="`pgrep gpcchs_master | tr -d '\n'`"
  if [ -z $PID ]; then
    echo "ERROR: Aucun process du nom de gpcchs_master est en cours d'execution"
    exit 1
  else
    echo $PID
  fi
}

function getMainPID {
  local PID="`pgrep gpcchs_main | tr -d '\n'`"
  if [ -z $PID ]; then
    echo "ERROR: Aucun process du nom de gpcchs_main est en cours d'execution"
    exit 1
  else
    echo $PID
  fi
}

function toMega {
  local tmp=`echo $1 | rev`
  if [[ ${tmp:0:1} == "g" ]]; then
    local tmp_=`echo $tmp | cut -c 2- | rev`
    local res="${tmp_//.}"
    local zeros="000"
    echo $res$zeros
  else
    if [[ ${tmp:0:1} == "m" ]]; then
      local tmp_=`echo $tmp | cut -c 2- | rev`
      local res="${tmp_//.}"
      local zeros="00"
      echo $res$zeros
    else
      echo $1
    fi
  fi
}

while [[ $# -gt 0 ]]
do
key="$1"
case $key in
  --renderer)
  RENDERER_ON=1
  shift
  ;;
  --main)
  MAIN_ON=1
  shift
  ;;
  --master)
  HSS_ON=1
  shift
  ;;
  --default)
  shift
  ;;
esac
done

printf "\n\n############ VIMA BENCHMARK ############\n\n"
printf "Starting at `date` \n\n"

if [ "$RENDERER_ON" -eq "1" ]; then
  echo 'window.benchRendererData = [];' > bench_renderer_data.js
  RENDERER_PID="$(getRendererPID)"
  echo "RENDERER: ON (PID $RENDERER_PID)"
  RENDERER_RES=`top -b -n 1 -p $RENDERER_PID | sed -n '8p' | awk '{print $6}'`
  RENDERER_RES=`toMega $RENDERER_RES`
  RENDERER_CPU=`top -b -n 1 -p $RENDERER_PID | sed -n '8p' | awk '{print $9}' | xargs printf "%.*f\n" 0`
  RENDERER_DATA=''
fi

if [ "$MAIN_ON" -eq "1" ]; then
  echo 'window.benchMainData = [];' > bench_main_data.js
  MAIN_PID="$(getMainPID)"
  echo "MAIN: ON (PID $MAIN_PID)"
  MAIN_RES=`top -b -n 1 -p $MAIN_PID | sed -n '8p' | awk '{print $6}'`
  MAIN_RES=`toMega $MAIN_RES`
  MAIN_CPU=`top -b -n 1 -p $MAIN_PID | sed -n '8p' | awk '{print $9}' | xargs printf "%.*f\n" 0`
  MAIN_DATA=''
fi

if [ "$HSS_ON" -eq "1" ]; then
  echo 'window.benchHssData = [];' > bench_hss_data.js
  HSS_PID="$(getHssPID)"
  echo "HSS: ON (PID $HSS_PID)"
  HSS_RES=`top -b -n 1 -p $HSS_PID | sed -n '8p' | awk '{print $6}'`
  HSS_RES=`toMega $HSS_RES`
  HSS_CPU=`top -b -n 1 -p $HSS_PID | sed -n '8p' | awk '{print $9}' | xargs printf "%.*f\n" 0`
  HSS_DATA=''
fi

while [ -n "$RENDERER_RES" ] || [ -n "$MAIN_RES" ] || [ -n "$HSS_RES" ]; do
  if [ "$RENDERER_ON" -eq "1" ] && [ -n "$RENDERER_RES" ]; then
    RENDERER_DATA=`cat bench_renderer_data.js`
    RENDERER_DATA=${RENDERER_DATA::-2}
    if [ $CPT -eq $ZERO ]; then
      RENDERER_DATA="$RENDERER_DATA[$CPT,$RENDERER_CPU,$RENDERER_RES]];"
    else
      RENDERER_DATA="$RENDERER_DATA,[$(($CPT*$SLEEP_DELAY)),$RENDERER_CPU,$RENDERER_RES]];"
    fi
    echo $RENDERER_DATA > bench_renderer_data.js
    RENDERER_RES=`top -b -n 1 -p $RENDERER_PID | sed -n '8p' | awk '{print $6}'`
    RENDERER_RES=`toMega $RENDERER_RES`
    RENDERER_CPU=`top -b -n 1 -p $RENDERER_PID | sed -n '8p' | awk '{print $9}' | xargs printf "%.*f\n" 0`
  fi
  if [ "$MAIN_ON" -eq "1" ] && [ -n "$MAIN_RES" ]; then
    MAIN_DATA=`cat bench_main_data.js`
    MAIN_DATA=${MAIN_DATA::-2}
    if [ $CPT -eq $ZERO ]; then
      MAIN_DATA="$MAIN_DATA[$CPT,$MAIN_CPU,$MAIN_RES]];"
    else
      MAIN_DATA="$MAIN_DATA,[$(($CPT*$SLEEP_DELAY)),$MAIN_CPU,$MAIN_RES]];"
    fi
    echo $MAIN_DATA > bench_main_data.js
    MAIN_RES=`top -b -n 1 -p $MAIN_PID | sed -n '8p' | awk '{print $6}'`
    MAIN_RES=`toMega $MAIN_RES`
    MAIN_CPU=`top -b -n 1 -p $MAIN_PID | sed -n '8p' | awk '{print $9}' | xargs printf "%.*f\n" 0`
  fi
  if [ "$HSS_ON" -eq "1" ] && [ -n "$HSS_RES" ]; then
    HSS_DATA=`cat bench_hss_data.js`
    HSS_DATA=${HSS_DATA::-2}
    if [ $CPT -eq $ZERO ]; then
      HSS_DATA="$HSS_DATA[$CPT,$HSS_CPU,$HSS_RES]];"
    else
      HSS_DATA="$HSS_DATA,[$(($CPT*$SLEEP_DELAY)),$HSS_CPU,$HSS_RES]];"
    fi
    echo $HSS_DATA > bench_hss_data.js
    HSS_RES=`top -b -n 1 -p $HSS_PID | sed -n '8p' | awk '{print $6}'`
    HSS_RES=`toMega $HSS_RES`
    HSS_CPU=`top -b -n 1 -p $HSS_PID | sed -n '8p' | awk '{print $9}' | xargs printf "%.*f\n" 0`
  fi
  sleep $SLEEP_DELAY
  CPT=$(($CPT+1))
done
