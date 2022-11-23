const {validationResult} = require('express-validator')

const User = require('../../../../models/User.model')
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
    try{
        const validationErrors = validationResult(req)
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({
                error: validationErrors
            })
        }

        let {email, password} = req.body
        email = email.toLowerCase()

        const user = await User.findOne({email})

        if(user){
            return res.status(400).json({
                error: {
                    message: "Указанный Email адрес уже зарегистрирован"
                }
            })
        }

        const hashed_password = await bcrypt.hash(password, 16)

        const newUser = new User({
            email,
            password: hashed_password
        })

        await newUser.save()

        return res.json({
            message: "Пользователь успешно зарегистрирован"
        })

    }catch(e){
        return res.json.status(500)({
            error: e
        })
    }
}