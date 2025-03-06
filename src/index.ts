import express from 'express';
import router from './router';
import mongoose from 'mongoose';
import cors from "cors";

// Create an instance of express
const app = express();

// Define a port
const PORT = 8000;

// Middleware should be applied BEFORE routes
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data

// Register routes AFTER middleware
app.use('/api', router);

mongoose
  .connect("mongodb+srv://somaevdtechnology:sKZLSef6M5mqMOoG@cluster0.dg8nt.mongodb.net/myDatabase?retryWrites=true&w=majority")
  .then(() => {
    console.log('MongoDB connected');
    // Start the server only after the connection is successful
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with failure
  });
