const db = require("../config/db");

exports.getUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.addUser = (req, res) => {
  const { name, email, role, phone, status } = req.body;

  db.query(
    "INSERT INTO users(name,email,role,phone,status) VALUES(?,?,?,?,?)",
    [name, email, role, phone, status],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "User Added" });
    }
  );
};

exports.updateUser = (req, res) => {
  const { name, email, role, phone, status } = req.body;

  db.query(
    "UPDATE users SET name=?,email=?,role=?,phone=?,status=? WHERE id=?",
    [name, email, role, phone, status, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "User Updated" });
    }
  );
};

exports.deleteUser = (req, res) => {
  db.query(
    "DELETE FROM users WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "User Deleted" });
    }
  );
};