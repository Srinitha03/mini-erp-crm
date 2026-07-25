const express = require("express");
const router = express.Router();

const salesController = require("../controllers/salesController");

router.get("/", salesController.getSales);
router.post("/", salesController.addSale);
router.put("/:id", salesController.updateSale);
router.delete("/:id", salesController.deleteSale);

module.exports = router;