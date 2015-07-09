@ECHO off
ECHO Newsletter Builder 0.9.0
ECHO Press any key to continue or Ctrl-C to abort...
PAUSE > nul
CALL npm install
CALL bower install
CALL gulp install
CALL gulp and-watch
PAUSE
