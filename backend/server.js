require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const helmet = require("helmet");
const ratelimit = require("express-rate-limit");



const authRoutes = require("./src/router/authRoutes");
const limit = ratelimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const cardsRoutes = require("./src/router/cardsRoutes");
const usersRoutes = require("./src/router/usersRoutes");
const wishlistRoutes = require("./src/router/wishlistRoutes");
const chatRoutes = require("./src/router/chatRoutes");
const messageRoutes = require("./src/router/messageRoutes");

// Middleware to parse JSON requests
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(limit);

// Mount the router to handle /api/COC requests
app.use("/api/COC", cardsRoutes);
app.use("/api", usersRoutes);
app.use("/api", wishlistRoutes);
app.use("/api", chatRoutes);
app.use("/api", messageRoutes);

// app.use("/auth", require("./src/router/jwtauth"));
app.use("/auth", authRoutes);

app.get('/api/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE userid = $1', [userId]);
    if (rows.length === 1) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
const port = 5000; // Use the provided PORT or default to 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
