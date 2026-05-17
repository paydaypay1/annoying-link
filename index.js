import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// GoDaddy dynamically assigns a port. Default to 3000 for local testing.
const PORT = process.env.PORT || 3000;

// Global Production Middleware
app.use(compression()); // Gzip compression
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true }));

// Serve Vite's compiled static files from the 'dist' folder
app.use(express.static(path.join(__dirname, 'dist')));

// Routing passthrough to React Router
app.get(/.*$/, (req, res) => { 
	res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
		console.error(err.stack);
		res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
});
