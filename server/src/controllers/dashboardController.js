const db = require("../config/db");

exports.getDashboard = (req, res) => {
  const dashboard = {};

  db.query("SELECT COUNT(*) AS totalCustomers FROM customers", (err, customers) => {
    if (err) return res.status(500).json(err);

    dashboard.customers = customers[0].totalCustomers;

    db.query("SELECT COUNT(*) AS totalProducts FROM products", (err, products) => {
      if (err) return res.status(500).json(err);

      dashboard.products = products[0].totalProducts;

      db.query(
        "SELECT IFNULL(SUM(total_qty),0) AS totalSales FROM sales",
        (err, sales) => {
          if (err) return res.status(500).json(err);

          dashboard.sales = sales[0].totalSales;

          db.query(
            "SELECT COUNT(*) AS pendingOrders FROM sales WHERE status='Pending'",
            (err, pending) => {
              if (err) return res.status(500).json(err);

              dashboard.pending = pending[0].pendingOrders;

              res.json(dashboard);
            }
          );
        }
      );
    });
  });
};