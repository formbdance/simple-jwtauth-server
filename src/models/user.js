const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    telegram: {
        type: String,
        required: false
    }

})

userSchema.pre('save', async function(next) {
    // Генерируем соль для хэширования
    const salt = await bcrypt.genSalt(10);
  
    // Хэшируем пароль с использованием соли
    this.password = await bcrypt.hash(this.password, salt);
  
    next();
  });

const User = mongoose.model('User', userSchema);

module.exports = User;