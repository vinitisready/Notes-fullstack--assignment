@echo off
echo Setting up HD Notes Application...
echo.

echo Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Failed to install backend dependencies
    exit /b 1
)

echo.
echo Installing frontend dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo Failed to install frontend dependencies
    exit /b 1
)

cd ..
echo.
echo Setup completed successfully!
echo.
echo To start the application:
echo 1. Make sure MongoDB is running
echo 2. Configure environment variables in backend/.env
echo 3. Run 'npm run dev' to start both frontend and backend
echo.
pause