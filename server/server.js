const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve image files

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'server/uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// ===================== API ROUTES =====================

// GET all products (with optional category filter)
app.get('/api/products', (req, res) => {
    const category = req.query.category;
    let sql = 'SELECT * FROM products';
    let params = [];

    if (category && category !== 'all') {
        sql += ' WHERE category = ?';
        params = [category];
    }

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// GET a single product by ID
app.get('/api/products/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json(row);
    });
});

// POST a new product (with image upload)
app.post('/api/products', upload.single('image'), (req, res) => {
    const { name, category, sub, price, stock } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const sql = `INSERT INTO products (name, category, sub, price, stock, image) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(sql, [name, category, sub, price, stock, image], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({
            id: this.lastID,
            name,
            category,
            sub,
            price,
            stock,
            image
        });
    });
});

// DELETE a product by ID
app.delete('/api/products/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json({ message: 'Product deleted successfully' });
    });
});

// PATCH (update) product stock and price
app.patch('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const { price, stock } = req.body;
    const sql = `UPDATE products SET price = COALESCE(?, price), stock = COALESCE(?, stock) WHERE id = ?`;
    db.run(sql, [price, stock, id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json({ id, price, stock });
    });
});

// Serve static frontend files from the project root
app.use(express.static(path.join(__dirname, '..')));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
