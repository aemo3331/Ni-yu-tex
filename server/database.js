const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Ensure the 'uploads' directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const dbPath = path.join(__dirname, 'inventory.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create the products table if it doesn't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            sub TEXT,
            price REAL NOT NULL,
            stock INTEGER NOT NULL DEFAULT 0,
            image TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Products table is ready.');
            // Optionally, seed the database with initial products from the old static array
            // This can be done once by uncommenting the next block.
            /*
            db.get("SELECT COUNT(*) as count FROM products", [], (err, row) => {
                if (row.count === 0) {
                    const initialProducts = [
                        { id:'D01', name:'Indigo Selvedge Slim', category:'denim', sub:'Mid-rise · 12oz Candiani', price:4290, stock:25 },
                        // Add more products as needed
                    ];
                    const insertStmt = db.prepare("INSERT INTO products (id, name, category, sub, price, stock) VALUES (?, ?, ?, ?, ?, ?)");
                    initialProducts.forEach(p => {
                        insertStmt.run(p.id, p.name, p.category, p.sub, p.price, p.stock);
                    });
                    insertStmt.finalize();
                }
            });
            */
        }
    });
});

module.exports = db;
