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
SLEEP_DELAY=5
CPT=0
ZERO=0
echo 'window.benchData = [];' > bench_renderer_data.js
RENDERER_PID="$(getRendererPID)"
TOP=`top -b -n 1 -p $RENDERER_PID | sed -n '8p' | awk '{print $6}'`
CONTENT=''

while [ -n "$TOP" ]; do
  echo $TOP
  CONTENT=`cat bench_renderer_data.js`
  CONTENT=${CONTENT::-2}
  if [ $CPT -eq $ZERO ]; then
    CONTENT="$CONTENT[$CPT,$TOP]];"
  else
    CONTENT="$CONTENT,[$(($CPT*$SLEEP_DELAY)),$TOP]];"
  fi
  echo $CONTENT > bench_renderer_data.js
  sleep $SLEEP_DELAY
  CPT=$(($CPT+1))
  TOP=`top -b -n 1 -p $RENDERER_PID | sed -n '8p' | awk '{print $6}'`
done

echo "VIMA STOP AFTER $(($CPT*$SLEEP_DELAY)) secondes"
