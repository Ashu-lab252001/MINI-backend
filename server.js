const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authroutes');  // Import auth routes

dotenv.config();

const app = express();
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ MongoDB URI is missing! Check your .env file.");
  process.exit(1);
}
app.get('/', (req, res)=>{
  res.send("MINI_Link")
})

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your actual frontend URL
  methods: 'GET,POST,PUT,DELETE',
  credentials: true // If using cookies or authentication
}));
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.log('MongoDB connection error:', err);
});

// Use auth routes
app.use('/api/auth', authRoutes);

// Server setup
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
