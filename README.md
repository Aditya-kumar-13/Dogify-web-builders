# Disease Detection and Treatment Suggestion Web Application

This web application provides disease detection through an AI model, **Roboflow**, by allowing users to upload an image. The application predicts the disease with a percentage of confidence and fetches the treatment for the disease using the Wikipedia API. It also includes user authentication with JWT tokens, password recovery using Nodemailer, and premium user access based on their status stored in the database.

## Features
- **User Authentication**: JWT-based authentication.
- **Forgot Password**: Implemented with Nodemailer for email-based recovery.
- **Premium User Status**: Stored in the database for special access to premium features.
- **AI Disease Prediction**: Users upload an image for disease detection using **Roboflow**, an AI model.
- **Treatment Suggestions**: Wikipedia API is used to fetch treatment suggestions based on the detected disease.
- **Product Display**: Shows available products within the app.
- **Technologies**: React.js, Chakra UI, Node.js, Express.js, MongoDB.

## Technologies Used
### Frontend:
- **React.js**: Frontend framework.
- **Chakra UI**: Used for styling components.

### Backend:
- **Node.js**: Server-side runtime environment.
- **Express.js**: Web framework for building the API.
- **MongoDB**: Database for storing user and product data.
- **Nodemailer**: Email service for password recovery.
- **JWT**: For token-based authentication.

### AI and External APIs:
- **Roboflow**: AI model for disease detection from uploaded images.
- **Wikipedia API**: To fetch treatment information for the detected diseases.

## Installation

### Prerequisites
- **Node.js**: Ensure that Node.js is installed on your system.
- **MongoDB**: Set up a MongoDB instance (either local or cloud).
- **React**: Install `npm` to run the frontend.

### Backend Setup
1. Clone the repository.
2. Navigate to the `backend` folder and install dependencies:
   ```bash
   cd backend
   npm install
   Set up environment variables for the backend:
Create a .env file in the backend folder with the following contents:
PORT=5000
MONGODB_URI=<your-mongodb-connection-uri>
JWT_SECRET=<your-jwt-secret>
EMAIL_USER=<your-email-address>
EMAIL_PASS=<your-email-password>

Start the backend server:
npm devStart

Frontend Setup

Navigate to the frontend folder and install dependencies:
cd frontend
npm install

Start the frontend development server:
npm run dev
The frontend will be running at: http://localhost:5174
The backend will be running at: http://localhost:5000


What's Left
While the application is functional, the following features were planned but not completed due to time constraints:

Treatment Access for Premium Users: We planned to show the disease prediction to all users, but only premium users would have access to the treatment information. While the user status is being checked, the restriction on treatment info is not yet fully implemented.
Medicine Information Using Medline API: We were planning to fetch detailed medicine information related to the disease using the Medline API. This feature is still pending.

Image Storage on S3: Initially, we planned to store uploaded images in an S3 bucket for persistent storage. This feature was left due to time constraints.

Nodemailer for Feedback Form: While Nodemailer was successfully implemented for password recovery, we intended to extend it to a feedback form, where feedback would be emailed to the owner's account. This feature is not fully integrated yet.

Usage
Register and log in to the application.
Upload an image for disease detection.
View the predicted disease with a confidence percentage from Roboflow.
Check for treatment information fetched from Wikipedia.
Explore products and premium membership features.
License
This project is licensed under the MIT License.


