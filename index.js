import express from 'express';
import compression from "compression"; // Optional: Compresses files for faster loading
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 2. GoDaddy dynamically assigns a port. Default to 3000 for local testing.
const PORT = process.env.PORT || 3000;

// 3. Global Production Middleware
app.use(compression()); // Gzip compression
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true }));

// 4. Serve Vite's compiled static files from the 'dist' folder
app.use(express.static(path.join(__dirname, 'dist')));

// Routing
app.get(/.*$/, (req, res) => { 
	res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 7. Error Handling Middleware
app.use((err, req, res, next) => {
		console.error(err.stack);
		res.status(500).json({ error: 'Internal Server Error' });
});

// 8. Start Server
app.listen(PORT, () => {
		console.log(`Production server running on port ${PORT}`);
});
