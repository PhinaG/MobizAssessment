Employee Management Web Portal
Welcome to the Employee Management Web Portal. This guide will walk you through setting up and running the project locally.

1. Prerequisites
Before you begin, ensure you have the following installed on your system:

Node.js 
npm (comes with Node.js)
Vue CLI (Install globally using npm install -g @vue/cli)

2. Project Structure
This project is divided into two main parts:
Backend:
1.  Node.js/Express server for handling API requests
2.  Jest/Supertest for handling unit tests

Frontend: 
1. Vue.js application for the user interface.

3. Setup Instructions
1. Unzip the Project
Unzip the project folder you received via email.

2. Backend Setup
Navigate to the backend directory and follow these steps:
cd path/to/unzipped/project/backend

Install Dependencies:
npm install

Start the Backend Server:
npx ts-node src/index.ts

The backend server should now be running on http://localhost:3000.

3. Frontend Setup
Navigate to the frontend directory and follow these steps:
cd path/to/unzipped/project/frontend

Install Dependencies (if required):
npm install

Start the Frontend Development Server:
npm run serve

The frontend development server should now be running on http://localhost:8080 
The deployed frontend development server should be running  on https://mobiz-assessment-q5js.vercel.app/

4. Running Backend Tests
Navigate to the backend directory and run:
npm test








