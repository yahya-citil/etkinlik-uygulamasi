const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const {
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent
} = require('../controllers/auth/eventsController');

// 🌐 Herkes görebilir
router.get('/', getAllEvents);
router.get('/:id', getEventById);

// 🔐 Giriş yapmış kullanıcılar işlem yapabilir
router.post('/', verifyToken, createEvent);
router.put('/:id', verifyToken, updateEvent);
router.delete('/:id', verifyToken, deleteEvent);

module.exports = router;
