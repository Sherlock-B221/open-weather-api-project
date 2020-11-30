const express = require("express");
const app = express();

const bodyParser = require("body-parser");


const https = require("https"); //native node module
const { log } = require("console");

app.use(bodyParser.urlencoded({extended: true}));



app.get("/",function(req,res){

        res.sendFile(__dirname + "/index.html")
        
});

app.post("/",function(req,res){
        console.log(req.body.cityName);
        const city = req.body.cityName
        const apiKey = "513a3f3e5feff37a3a9acc3df814249d"
        const units = "metric"
        const url= "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+units+"&appid="+apiKey;

        https.get(url , function(response){
                console.log(response.statusCode);

                response.on("data",function(data){
                        weatherData = JSON.parse(data)

                        var temp = weatherData.main.temp
                        var weatherDesc = weatherData.weather[0].description
                        const icon = weatherData.weather[0].icon
                        const imageURL= "https://openweathermap.org/img/wn/"+icon+"@2x.png"


                        console.log(temp, weatherDesc)
                        res.set("Content-Type", "text/html");

                        res.write("The temperature in "+city+" is "+ temp+" currently.")
                        res.write(" and it is "+weatherDesc+" out there..")
                        res.write('<p><img src="'+imageURL+'"><p>')
                        res.send()
                        //there can only be one res.send so other stuff to be sent
                        // or written can be through res.write
                })
        })

})




app.listen(3000, function(){
        console.log("Server is running on port 3000.")
})
