@ECHO off
ECHO Newsletter Builder 0.9.0
PAUSE
CALL npm install
CALL bower install
CALL gulp install
CALL gulp and-watch
PAUSE