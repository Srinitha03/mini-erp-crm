const db = require("../config/db");

// Get All Sales
exports.getSales = (req, res) => {
  db.query(
    "SELECT * FROM sales ORDER BY id ASC",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// Add Sale
exports.addSale = (req, res) => {
  const {
    challan_no,
    customer,
    products,
    total_qty,
    status,
    created_by,
    created_date
  } = req.body;

  const sql = `
    INSERT INTO sales
    (challan_no, customer, products, total_qty, status, createdBy, createdDate)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      challan_no,
      customer,
      products,
      total_qty,
      status,
      created_by,
      created_date
    ],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        message: "Sale Added Successfully"
      });
    }
  );
};

// Update Sale
exports.updateSale = (req, res) => {
  const { id } = req.params;

  const {
    challan_no,
    customer,
    products,
    total_qty,
    status,
    created_by,
    created_date
  } = req.body;

  const sql = `
    UPDATE sales
    SET
      challan_no=?,
      customer=?,
      products=?,
      total_qty=?,
      status=?,
      createdBy=?,
      createdDate=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      challan_no,
      customer,
      products,
      total_qty,
      status,
      created_by,
      created_date,
      id
    ],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Sale Updated Successfully"
      });
    }
  );
};

// Delete Sale
exports.deleteSale = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM sales WHERE id=?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Sale Deleted Successfully"
      });
    }
  );
};