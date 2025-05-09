const pool = require('../../db');

// Tüm etkinlikleri getir
exports.getAllEvents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY date ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Etkinlikler alınamadı:', err);
    res.status(500).json({ error: 'Etkinlikler alınırken bir hata oluştu.' });
  }
};

// Yeni etkinlik oluştur
exports.createEvent = async (req, res) => {
  const { title, description, category, latitude, longitude, date, created_by } = req.body;

  if (!title || !latitude || !longitude || !date) {
    return res.status(400).json({ error: 'Zorunlu alanlar eksik.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO events (title, description, category, latitude, longitude, date, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, description || '', category || '', latitude, longitude, date, created_by || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Etkinlik oluşturulamadı:', err);
    res.status(500).json({ error: 'Etkinlik oluşturulurken bir hata oluştu.' });
  }
};

// Belirli bir etkinliği getir
exports.getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Etkinlik bulunamadı.' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Etkinlik alınamadı:', err);
    res.status(500).json({ error: 'Etkinlik alınırken bir hata oluştu.' });
  }
};

// Etkinlik güncelle
exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, latitude, longitude, date } = req.body;

  try {
    const result = await pool.query(
      `UPDATE events
       SET title = $1, description = $2, category = $3, latitude = $4, longitude = $5, date = $6
       WHERE id = $7 RETURNING *`,
      [title, description, category, latitude, longitude, date, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Etkinlik bulunamadı.' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Etkinlik güncellenemedi:', err);
    res.status(500).json({ error: 'Etkinlik güncellenirken bir hata oluştu.' });
  }
};

// Etkinlik sil
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM events WHERE id = $1', [id]);
    res.status(200).json({ message: 'Etkinlik başarıyla silindi.' });
  } catch (err) {
    console.error('Etkinlik silinemedi:', err);
    res.status(500).json({ error: 'Etkinlik silinirken bir hata oluştu.' });
  }
};
