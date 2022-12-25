const express = require('express');

const router = express.Router();

/* GET redirects to api */
router.get('/', (req, res) => {
  res.send('Welcome to the JSMG Server!');
});

module.exports = router;
