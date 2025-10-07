const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, authMiddleware } = require('../controllers/transactionController');

router.get('/', authMiddleware, getTransactions);
router.post('/', authMiddleware, addTransaction);

module.exports = router;
