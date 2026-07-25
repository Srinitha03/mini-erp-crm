const db = require("../config/db");

// Get all products
exports.getProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// Add product
exports.addProduct = (req, res) => {
  const { sku, product_name, category, price, stock, status } = req.body;

  const sql = `
    INSERT INTO products
    (sku, product_name, category, price, stock, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [sku, product_name, category, price, stock, status],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Product Added Successfully",
      });
    }
  );
};

// Update product
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { sku, product_name, category, price, stock, status } = req.body;

  const sql = `
    UPDATE products
    SET sku=?, product_name=?, category=?, price=?, stock=?, status=?
    WHERE id=?
  `;

  db.query(
    sql,
    [sku, product_name, category, price, stock, status, id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Product Updated Successfully",
      });
    }
  );
};

// Delete product
exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM products WHERE id=?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Product Deleted Successfully",
      });
    }
  );
};