const pool = require('../../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'gizliJWTanahtarin'; // .env içine de koyabiliriz

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'Email zaten kayıtlı' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });

    // şifreyi kullanıcıdan ayır
    const { password: _, ...userWithoutPassword } = user;

    res.json({ token, user: userWithoutPassword });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) return res.status(400).json({ error: 'Kullanıcı bulunamadı' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Şifre yanlış' });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });

    // şifreyi kullanıcıdan ayır
    const { password: _, ...userWithoutPassword } = user;

    res.json({ token, user: userWithoutPassword });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
