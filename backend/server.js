require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const notesRoutes = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use('/api/notes', notesRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.log('❌ MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});