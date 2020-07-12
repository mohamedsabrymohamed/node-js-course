const express = require('express')
const app = express()
const port = process.env.PORT || 3000
//to make express accept json 
app.use(express.json)
////////////////////////// resource creation //////////////////////////

app.post('/users', (req, res) => {
    res.send('testing')
})
app.listen(port, () => {
    console.log('serve is up on  port ' + port)
})