const express = require("express");
const router = express.Router();

const {
  get_long_articles,
  update_long_articles,
} = require("../controllers/article/article_long");
const {
  get_short_articles,
  get_short_articles_by_id,
} = require("../controllers/article/article_short");

router.get("/short", get_short_articles);
router.get("/long/:id", get_long_articles);

module.exports = router;
