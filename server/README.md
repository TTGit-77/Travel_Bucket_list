# Backend Deployment on Render

## Steps

1. **Push to GitHub**
   - Make sure your `server` folder is in a GitHub repository.

2. **Create a new Web Service on Render**
   - Connect your GitHub repo.
   - Set the root directory to `server`.
   - Set the build and start command to:
     - Build command: (leave blank or `npm install`)
     - Start command: `npm start`

3. **Set Environment Variables**
   - In the Render dashboard, add the following environment variable:
     - `MONGODB_URI` = `mongodb+srv://raviprasanth9786:xwNPv9nuthmv484g@cluster0.lef1s9f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

4. **Deploy**
   - Click deploy. After deployment, Render will provide a backend URL (e.g., `https://your-backend.onrender.com`).

5. **Update Frontend**
   - Use this backend URL in your frontend for API requests. 