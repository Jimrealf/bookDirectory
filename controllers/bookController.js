const db = require('../models/db');

// Get all books
getAllBooks = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM books');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single book
getBook = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM books WHERE id = $1', [
            req.params.id,
        ]);
        if (result.rows.length === 0) {
            return res.status(500).json({ message: 'Book not found' });
        }
        res.json(result.row[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new book
addBook = async (req, res) => {
    try {
        const { title, author, genre, published_year } = req.body;
        const result = await db.query(
            'INSERT INTO books (title, author, genre, published_year) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, author, genre, published_year]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing book
updateBook = async (req, res) => {
    try {
        const { title, author, genre, published_year } = req.body;
        const result = await db.query(
            'UPDATE books SET title = $1, author = $2, genre = $3, published_year = $4 WHERE id = $5 RETURNING *',
            [title, author, genre, published_year]
        );
        if (result.rows.length === 0) {
            return res.status(500).json({ message: 'Book not found' });
        }
        res.json(result.row[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a book
deleteBook = async (req, res) => {
    try {
        const result = await db.query(
            'DELETE FROM books where id = $1 RETURNING *',
            [req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(500).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook,
};