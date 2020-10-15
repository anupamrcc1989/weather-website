const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
const hbs = require('hbs')
//define paths for express configuration
const PublicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'/templates/views')
const partialsPath = path.join(__dirname,'/templates/partials')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//setup handlebars engines ane views location 
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)



app.use(express.static(PublicDirectoryPath))

app.get('',(req,res) =>{
    res.render('index',{
        title : "Weather",
        Author: "Anupam Biswas"
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title:"This is the about page",
        Author: "Tiger"
    })
})


app.get('/help',(req,res) =>{
    res.render('help',{
        title:"This is the help page",
        Author: "Anupam"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }
    geocode(req.query.address,(error, {Latitude, Longitude, Location}={}) =>
    {
        if (error != null)
        {
            console.log('Error', error)
            res.send({error})
        }
        else
        {
            //console.log(Location)
            forecast(Latitude,Longitude,(error,response) =>
            {
                if (error != null)
                {
                    console.log('Error', error)
                    res.send({error})
                }
                else
                {
                    console.log(Location,response)
                    res.send({
                        Location: req.query.address,
                        Forecast: response,
                        Loc: Location
                    })
                }
            }
            )
        }   
    })    
    
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error: 'you must a provide a search criterion'
        })
    }
    res.send({
        products: []
    })
})


app.get('/help/*',(req,res) =>{
    res.render('404_page',{
        title: "404",
        errorMessage:"Help article not found"
    })
})
app.get('*',(req,res) =>{
    res.render('404_page',{
        title:"404",
        errorMessage:"Page not found"

    })
})

app.listen(port, () =>{
    console.log('Server is up at port '+ port)
})