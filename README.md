# Travel Bucket List App

A full-stack travel bucket list application built with React (frontend) and Node.js/Express (backend) with MongoDB Atlas.

## Backend Deployment

The backend is deployed on Render at: https://travel-bucket-list-backend.onrender.com

### Environment Variables for Backend
- `MONGODB_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: Secret key for JWT token generation

## Frontend Configuration

The frontend is configured to use the deployed backend URL. To run locally:

1. Create a `.env` file in the root directory with:
   ```
   VITE_BACKEND_URL=https://travel-bucket-list-backend.onrender.com
   ```

2. For local development, you can override this with:
   ```
   VITE_BACKEND_URL=http://localhost:5000
   ```

## Features

- User authentication (signup/login)
- Browse travel destinations
- Add custom places to bucket list
- Track travel milestones
- Responsive design

## Tech Stack

- **Frontend**: React, Vite, CSS
- **Backend**: Node.js, Express, MongoDB Atlas
- **Authentication**: JWT
- **Deployment**: Render (Backend), Vercel/Netlify (Frontend)

## API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/places` - Get all places
- `POST /api/places` - Add new place
- `DELETE /api/places/:id` - Delete place
- `GET /api/bucketlist` - Get user's bucket list
- `POST /api/bucketlist` - Add to bucket list
- `PATCH /api/bucketlist/:id` - Update milestone status
