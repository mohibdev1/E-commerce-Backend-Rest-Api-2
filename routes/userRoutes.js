const express = require("express");
const users = require("../data/user");
const apiKeyMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "All users fetched successfully",
    data: users,
  });
});


router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      status: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    status: true,
    message: "User fetched successfully",
    data: user,
  });
});
  
router.post("/", apiKeyMiddleware, (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      status: false,
      message: "Name, email and password are required",
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
  };

  users.push(newUser);

  res.status(201).json({
    status: true,
    message: "User added successfully",
    data: newUser,
  });
});

router.put("/:id", apiKeyMiddleware, (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      status: false,
      message: "User not found",
    });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      status: false,
      message: "Name, email and password are required",
    });
  }

  user.name = name;
  user.email = email;
  user.password = password;

  res.status(200).json({
    status: true,
    message: "User updated successfully",
    data: user,
  });
});
router.delete("/:id", apiKeyMiddleware, (req, res) => {
  const id = parseInt(req.params.id);

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      status: false,
      message: "User not found",
    });
  }

  const deletedUser = users.splice(userIndex, 1);

  res.status(200).json({
    status: true,
    message: "User deleted successfully",
    data: deletedUser[0],
  });
});

module.exports = router;