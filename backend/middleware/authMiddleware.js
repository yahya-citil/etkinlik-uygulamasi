const jwt = require('jsonwebtoken');
const JWT_SECRET = 'gizliJWTanahtarin'; // .env'den almak istersen process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token bulunamadı veya geçersiz' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // user id'yi taşı
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Geçersiz token' });
  }
};

module.exports = verifyToken;
