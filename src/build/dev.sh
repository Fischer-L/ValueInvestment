#!/bin/bash

osascript -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' -e 'tell application "Terminal" to do script with command "yarn build-extension" in window 1'
osascript -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' -e 'tell application "Terminal" to do script with command "yarn build-local" in window 1'
osascript -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down'
yarn run-svr
