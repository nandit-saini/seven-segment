'use strict';

// importing packages
var express    = require('express');
var multer     = require('multer')
var router     = express.Router();
var upload     = multer({ dest: 'uploads/' })
/*
 * Module dependencies.
 */

const sevenSegment = require('../app/controllers/sevenSegment');


router.post('/parse', upload.single('invoiceFile'), sevenSegment.parse);
router.post('/secret', upload.single('invoiceFile'), sevenSegment.secret);

module.exports = router;
