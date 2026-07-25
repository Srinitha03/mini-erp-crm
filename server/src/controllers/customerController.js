const db = require("../config/db");

// Get all customers
exports.getCustomers = (req, res) => {
  db.query("SELECT * FROM customers", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// Add customer
exports.addCustomer = (req, res) => {
  const { name, business, phone, email, type, status } = req.body;

  const sql = `
    INSERT INTO customers
    (name,business,phone,email,type,status)
    VALUES (?,?,?,?,?,?)
  `;

  db.query(
    sql,
    [name, business, phone, email, type, status],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({
        message: "Customer Added Successfully"
      });
    }
  );
};
exports.updateCustomer = (req, res) => {
  const { id } = req.params;
  const { name, business, phone, email, type, status } = req.body;

  const sql = `
    UPDATE customers
    SET name=?, business=?, phone=?, email=?, type=?, status=?
    WHERE id=?
  `;

  db.query(
    sql,
    [name, business, phone, email, type, status, id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Customer Updated Successfully",
      });
    }
  );
};

exports.deleteCustomer = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM customers WHERE id=?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Customer Deleted Successfully",
      });
    }
  );
};