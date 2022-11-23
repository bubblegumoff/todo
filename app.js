const express = require('express')
const {mongoose} = require('mongoose')
const bodyParser = require("body-parser");
const {check} = require("express-validator");

const cors = require('cors')
require('dotenv').config()

/**
 * Auth middleware. Проверка авторизации клиента по JWT ключу
 * @type {function(req, res, next): (*|undefined)}
 */
const authMiddleware = require('./middlewares/auth.middleware')
/**
 * Авторизация клиента
 * @type {function(req, res): Promise<*|undefined>}
 */
const ApiUserAuthLogin = require('./routes/api/user/auth/login.route')
/**
 * Регистрация клиента
 * @type {function(req, res): Promise<*|undefined>}
 */
const ApiUserAuthRegister = require('./routes/api/user/auth/register.route')
/**
 * Вывод всех todo
 * @type {function(req, res): Promise<*|undefined>}
 */
const ApiTodoGetAll = require('./routes/api/todo/get/all.route')
/**
 * Вывод одного todo
 * @type {function(req, res): Promise<*|undefined>}
 */
const ApiTodoGetOne = require('./routes/api/todo/get/one.route')
/**
 * Вывод всех todo по страницам
 * @type {function(req, res): Promise<*|undefined>}
 */
const ApiTodoGetAllPaginated = require('./routes/api/todo/get/paginated.route')
/**
 * Добавление одного todo
 * @type {function(req, res): Promise<*|undefined>}
 */
const ApiTodoNew = require('./routes/api/todo/new/one.route')
/**
 * Редактирование одного todo
 * @type {function(req, res): Promise<*|undefined>}
 */
const ApiTodoUpdateOne = require('./routes/api/todo/update/one.route')
/**
 * Удаление одного todo
 * @type {function(req, res): Promise<*|undefined>}
 */
const ApiTodoDeleteOne = require('./routes/api/todo/delete/one.route')

const app = express()
/**
 * Добавляем парсер, чтобы он добавлял данные в req.body
 */
app.use(bodyParser.json());
/**
 * Обозначаем конфиг CORS. В origin поставить сайт с которого можно обращаться к Express. * - можно всем
 * @type {{origin: string}}
 */
const corsOptions = {
    origin: '*'
}

app.options('*', cors(corsOptions))
/**
 * Проверка вводимых данных. В данном случае, проверка емайл на корректность и взождение пароля
 * @type {ValidationChain[]}
 */
const loginRegisterChecker = [
    check('email', 'Введите верный email').isEmail(),
    check('password', 'Заполните поле пароль').exists()
]
/**
 * Подключаем к post роуты
 */
app.post('/api/user/auth/login', loginRegisterChecker, ApiUserAuthLogin)
app.post('/api/user/auth/register', loginRegisterChecker, ApiUserAuthRegister)

/**
 * Подключаем к get роуты
 */
app.get('/api/todo/get/all', authMiddleware, ApiTodoGetAll)
app.get('/api/todo/get/all/:page', authMiddleware, ApiTodoGetAllPaginated)
app.get('/api/todo/get/:todo_id', authMiddleware, ApiTodoGetOne)

const newUpdateTodoChecker = [
    check('name', 'Заполните поле название').exists(),
    check('text', 'Заполните поле текст').exists()
]
/**
 * Подключаем к put роуты
 */
app.put('/api/todo/new', newUpdateTodoChecker, authMiddleware, ApiTodoNew)
app.put('/api/todo/update/:todo_id', newUpdateTodoChecker, authMiddleware, ApiTodoUpdateOne)

/**
 * Подключаем к delete роуты
 */
app.delete('/api/todo/delete/:todo_id', authMiddleware, ApiTodoDeleteOne)
/**
 * Запуск сервера с базой данных
 * @returns {Promise<string|*>}
 */
const start = async () => {
    try{
        const express_port = process.env.EXPRESS_PORT
        await mongoose.connect(process.env.MONGO_URI, {
            "useNewUrlParser": true,
            "useUnifiedTopology": true
        })
        app.listen(express_port)
        return "Сервер запущен на порту " + express_port
    }catch (e) {
        return e
    }
}

start().then(console.log).catch(console.log)