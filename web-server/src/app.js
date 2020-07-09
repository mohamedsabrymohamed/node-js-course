const path = require('path')
const express = require('express')

const app = express()

// define public folder
const publicDirectoryPath = path.join(__dirname,'../public')

//to use a static page with default route
app.use(express.static(publicDirectoryPath))

//app.get used as routes
// app.get('',(req,res) => {
//     res.send('Hello')
// })

app.get('/help',(req,res) => {
    res.send('help page')
})


app.listen(3000, ()=>{
    console.log('server running')
})