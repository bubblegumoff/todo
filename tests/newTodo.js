const axios = require('axios')

const config = {
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM3Y2ZmOGI1YTdkN2RlNTJiZTVlZWEwIiwiaWF0IjoxNjY5MTQyNzY0LCJleHAiOjE2NjkxNzg3NjR9.srHO7rSPHB3AWEDZduJx49uqlLT_TXMjjlZbpa-psWs"
    }
}

axios.put("http://localhost:5000/api/todo/new", {
    name: "Name",
    text: "Text"
}, config).then(console.log).catch(console.log)