const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// define public folder
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//to use a static page with default route == as user put / and route name if file is exist it will display html page
//app.use(express.static(publicDirectoryPath))

//create dynamic page with handel bar template hbs for express

//setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

//register partials to hbs
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//index here is view name second arrgument is object with data passed to view
app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather app',
        name: 'test'
    })
})

//app.get used as routes
// app.get('',(req,res) => {
//     res.send('Hello')
// })

// app.get('/help',(req,res) => {
//     res.send('help page')
// })


//create 404 page == must be last thing

app.get('*',(req,res)=>{
    res.render('404',{
        msg: 'Error 404 Page not found'
    })
})

app.listen(3000, ()=>{
    console.log('server running')
})