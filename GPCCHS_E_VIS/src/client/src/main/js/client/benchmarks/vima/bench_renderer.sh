#!/bin/bash
function getRendererPID {
  local PID="`pgrep gpcchs_renderer | tr -d '\n'`"
  if [ -z $PID ]; then
    echo "ERROR: Aucun process du nom de gpcchs_renderer est en cours d'execution"
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

SLEEP_DELAY=5
CPT=0
ZERO=0
echo 'window.benchRendererData = [];' > bench_renderer_data.js
RENDERER_PID="$(getRendererPID)"
TOP=`top -b -n 1 -p $RENDERER_PID | sed -n '8p' | awk '{print $6}'`
TOP=`toMega $TOP`
CPU=`top -b -n 1 -p $RENDERER_PID | sed -n '8p' | awk '{print $9}' | xargs printf "%.*f\n" 0`
CONTENT=''

while [ -n "$TOP" ]; do
  CONTENT=`cat bench_renderer_data.js`
  CONTENT=${CONTENT::-2}
  if [ $CPT -eq $ZERO ]; then
    CONTENT="$CONTENT[$CPT,$TOP,$CPU]];"
  else
    CONTENT="$CONTENT,[$(($CPT*$SLEEP_DELAY)),$TOP,$CPU]];"
  fi
  echo $TOP
  echo $CONTENT > bench_renderer_data.js
  sleep $SLEEP_DELAY
  CPT=$(($CPT+1))
  TOP=`top -b -n 1 -p $RENDERER_PID | sed -n '8p' | awk '{print $6}'`
  TOP=`toMega $TOP`
  CPU=`top -b -n 1 -p $RENDERER_PID | sed -n '8p' | awk '{print $9}' | xargs printf "%.*f\n" 0`

done

echo "VIMA STOP AFTER $(($CPT*$SLEEP_DELAY)) secondes"
