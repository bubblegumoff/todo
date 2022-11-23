const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    /**
     * Игнорирует запрос ресурса
     */
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        /**
         * Вытаскиваем JWT токен из header
         * @type {string}
         */
        const token = req.headers.authorization.split(' ')[1]

        /**
         * Если нет токена - возвращаем ошибку
         */
        if (!token) {
            return res.status(401).json({ message: 'Нет авторизации' })
        }
        /**
         * Записываем в req.auth данные из JWT токена
         * @type {*}
         */
        req.auth = jwt.verify(token, process.env.JWT_SECRET)
        next()

    } catch (e) {
        res.status(401).json({ message: e.message })
    }
}
