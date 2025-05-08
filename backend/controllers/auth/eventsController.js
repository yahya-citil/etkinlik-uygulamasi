const pool = require('../../db');

// Tüm etkinlikleri getir
exports.getAllEvents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Yeni etkinlik oluştur
exports.createEvent = async (req, res) => {
  const { title, description, category, latitude, longitude, date, created_by } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO events (title, description, category, latitude, longitude, date, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, description, category, latitude, longitude, date, created_by]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Belirli bir etkinliği getir
exports.getEventById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Etkinlik güncelle
exports.updateEvent = async (req, res) => {
  const id = req.params.id;
  const { title, description, category, latitude, longitude, date } = req.body;
  try {
    const result = await pool.query(
      'UPDATE events SET title = $1, description = $2, category = $3, latitude = $4, longitude = $5, date = $6 WHERE id = $7 RETURNING *',
      [title, description, category, latitude, longitude, date, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Etkinlik sil
exports.deleteEvent = async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM events WHERE id = $1', [id]);
    res.json({ message: 'Etkinlik silindi.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
