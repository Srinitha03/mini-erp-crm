const db = require("../config/db");

// Get Settings
exports.getSettings = (req, res) => {
  db.query("SELECT * FROM settings LIMIT 1", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result[0]);
  });
};

// Update Settings
exports.updateSettings = (req, res) => {
  const {
    name,
    email,
    phone,
    company,
    newPassword,
  } = req.body;

  db.query(
    `UPDATE settings
     SET name=?, email=?, phone=?, company=?, password=?
     WHERE id=1`,
    [
      name,
      email,
      phone,
      company,
      newPassword || "admin123",
    ],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Settings Updated Successfully",
      });
    }
  );
};