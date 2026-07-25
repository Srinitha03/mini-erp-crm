const db = require("../config/db");

exports.getReports = (req, res) => {
  const sql = `
    SELECT
      id,
      challan_no AS challanNo,
      customer,
      products,
      total_qty AS quantity,
      status,
      createdDate AS date
    FROM sales
    ORDER BY id DESC
  `;

  db.query(sql, (err, sales) => {
    if (err) return res.status(500).json(err);

    const reports = sales.map((item) => ({
      ...item,
      amount: item.quantity * 500,
    }));

    res.json(reports);
  });
};