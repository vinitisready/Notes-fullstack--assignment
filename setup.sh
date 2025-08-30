#!/bin/bash

echo "Setting up HD Notes Application..."
echo

echo "Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install backend dependencies"
    exit 1
fi

echo
echo "Installing frontend dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install frontend dependencies"
    exit 1
fi

cd ..
echo
echo "Setup completed successfully!"
echo
echo "To start the application:"
echo "1. Make sure MongoDB is running"
echo "2. Configure environment variables in backend/.env"
echo "3. Run 'npm run dev' to start both frontend and backend"
echo