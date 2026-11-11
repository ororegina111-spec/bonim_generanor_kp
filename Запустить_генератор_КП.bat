@echo off
cd /d "%~dp0"
echo Запускаю генератор КП BONIM. Окно браузера откроется само. Не закрывайте это окно, пока работаете.
call npx vite preview --port 4173 --open
pause
