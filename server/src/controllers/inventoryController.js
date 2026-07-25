const db = require("../config/db");

// Get
exports.getInventory = (req, res) => {
  db.query(
    "SELECT * FROM inventory ORDER BY id DESC",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// Add
exports.addInventory = (req, res) => {
  const {
    sku,
    product,
    quantity,
    type,
    reason,
    createdBy
  } = req.body;

  const sql = `
    INSERT INTO inventory
    (sku, product, quantity, type, reason, createdBy)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [sku, product, quantity, type, reason, createdBy],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Inventory Added" });
    }
  );
};

// Update
exports.updateInventory = (req, res) => {
  const { id } = req.params;

  const {
    sku,
    product,
    quantity,
    type,
    reason,
    createdBy
  } = req.body;

  const sql = `
    UPDATE inventory
    SET
      sku=?,
      product=?,
      quantity=?,
      type=?,
      reason=?,
      createdBy=?
    WHERE id=?
  `;

  db.query(
    sql,
    [sku, product, quantity, type, reason, createdBy, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Inventory Updated" });
    }
  );
};

// Delete
exports.deleteInventory = (req, res) => {
  db.query(
    "DELETE FROM inventory WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Inventory Deleted" });
    }
  );
};