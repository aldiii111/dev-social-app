import dotenv from 'dotenv';
// Load environment variables
dotenv.config();
import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/index.js';
const app = express();
const PORT = process.env.PORT || 3000;
// Middlewares
app.use(cors());
app.use(express.json());
// Routes
app.use('/api', apiRoutes);
// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled server error:', err);
    res.status(500).json({
        message: err.message || 'Internal Server Error',
    });
});
app.listen(PORT, () => {
    console.log(`DevConnect server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map