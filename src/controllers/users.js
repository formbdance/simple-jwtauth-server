const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

// получение пользователей 
async function getUsers(req, res) {
    User
    .find()
    .sort({title: 1})
    .then((users) => {
        res
            .status(200)
            .json(users);
    })
    .catch((err) => {
        console.log(`Getting error ${err}`);
    })
}

// поиск пользователя по ID
async function getUserById(req, res) {
    User.findById(req.params.id)
    .then((user) => {
        res
            .status(200)
            .json(user);
    })
    .catch((err) => {
        console.log(`Getting error ${err}`);
    })
}

// удаление пользователя из БД
async function deleteUser(req, res) {
    User
    .findByIdAndDelete(req.params.id)
    .then((result) => {
        res
            .status(200)
            .json(result);
    })
    .catch((err) => {
        console.log(`Delete error ${err}`);
    })
}

// создание пользователя в БД (регистрация)
async function createUser(req, res) {
    // Проверяем, существует ли уже пользователь с таким же полем "telegram"
    const existingUser = await User.findOne({ telegram: req.body.telegram });

    // Если пользователь с таким же полем "telegram" уже существует, отправляем ошибку
    if (existingUser) {
        return res.status(409).json({ error: 'User with this telegram already exists' });
    }
    const user = new User(req.body);
    user
        .save()
        .then((result) => {
            res
                .status(201)
                .json(result);
        })
        .catch((err) => {
            console.log(`Delete error ${err}`);
        })
}

async function loginUser(req, res) {
    const filter = { "telegram": req.body.telegram }
  
    // Находим пользователя по его telegram
    const user = await User.findOne(filter);
  
    // Если пользователь не найден, отправляем ошибку
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    // Сравниваем введенный пароль с хэшированным паролем
    const isMatch = await bcrypt.compare(req.body.password, user.password);
  
    // Если пароли совпадают, отправляем ответ с токеном авторизации
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({ token });
    }
  
    // Если пароли не совпадают, отправляем ошибку
    return res.status(401).json({ error: 'Incorrect password' });
  }

module.exports = {
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    loginUser


}