@echo off

SET data = %date:~6,4%-%date:~3,2%-%date:~0,2%

echo "Copiando dados"

:: Chamada para exporte full.
::node index.js full > job.log

:: Chamada por data
node index.js incremental %data% > job.log

exit