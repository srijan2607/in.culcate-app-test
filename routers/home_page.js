const express = require("express");
const router = express.Router();

const {
  get_knowledge_capsule_home_page,
  get_category_home_page_by_id,
} = require("../controllers/home_page/home");

router.get("/", get_knowledge_capsule_home_page);
router.get("/category/:id", get_category_home_page_by_id);

module.exports = router;
