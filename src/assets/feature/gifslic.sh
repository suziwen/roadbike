#!/bin/bash
for file in ./*.gif
do
  gifsicle -E --name png -i $file "#0"
  echo "process $file success"
done
