#!/bin/bash
##http://milkteafuzz.com/j/2012/02/22/a-simple-bash-alarm-clock/
##kill $$
## kills own command($$=pid)
printf "What time are you setting this alarm for?"
read date
echo $(date --date="$date");
echo Okay! Will ring you on $(date --date="$date").
sleep $(( $(date --date="$date" +%s) - $(date +%s) ));
echo Wake up!
echo Working...
amixer -q sset Master 0
once=1
while true; do

if [[ $once -eq 1 ]]
then
  mplayer http://66.225.205.192:80 </dev/null >/dev/null 2>&1 &
  (( once++ ))
fi    

if [[ $volume -le 60 ]]
then
  (( volume++ ))
fi
  sleep .5
## set to 2.5
  amixer -q sset Master $volume
read -p "Press any key..." -n1 -s
pkill mplayer
kill $$
done

