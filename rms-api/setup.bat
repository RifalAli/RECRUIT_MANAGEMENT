@echo off
:: Install Composer Dependencies
call composer install
if %ERRORLEVEL% neq 0 (
    echo Composer Install Failed!
    exit /b %ERRORLEVEL%
)

:: Require JWT for Auth
call composer require tymon/jwt-auth

:: Copy .env.example to .env
call copy .env.example .env

:: Generate Application Key
call php artisan key:generate

:: Generate JWT Secret
call php artisan jwt:secret

:: Run migrations and seeders
call php artisan migrate:fresh --seed
if %ERRORLEVEL% neq 0 (
    echo Migration Failed!
    exit /b %ERRORLEVEL%
)

echo Composer Install, JWT Auth Setup, Key Generate,  Migrations, and Seeders Finished!