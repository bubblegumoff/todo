const axios = require('axios')


axios.post("http://localhost:5000/api/user/auth/login", {
    email: "test@test.com",
    password: "password"
}).then(console.log).catch(console.log)