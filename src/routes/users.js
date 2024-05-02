const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.get("/", usersController.getUsers)
router.get("/:id", usersController.getUserById)
router.delete("/:id", usersController.deleteUser)
router.post("/", usersController.createUser)
router.post("/auth", usersController.loginUser)

module.exports = router