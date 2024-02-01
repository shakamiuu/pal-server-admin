@echo off
set port=18181
for /f "tokens=1-5" %%i in ('netstat -ano^|findstr ":%port%"') do taskkill /pid %%m -t -f
exit
