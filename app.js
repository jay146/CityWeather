const express=require('express');
const res = require('express/lib/response');
const app=express();
const port=9999;
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
// using https module for making get
app.listen(port,function(){
 console.log("app is listening to port no"+port)
});

                                                                           app.get("/",function(req,resp){
                                                                           resp.sendFile(__dirname+"/index.html");
                                                                           });

                                                                      app.post("/",function(req,res){
                                                                       console.log(req.body.cityName); 
                                                                      const query=req.body.cityName;
                                                                      const apiKey="af74d817abf3d2f96cdd3f50ead0a544";
                                                                      const unit="metric";
                                                                      const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
               https.get(url,function(response){
               //console.log(response);
               // use cryptii website for hexadecimal conversion
               console.log("server response code  is "+response.statusCode);
               response.on("data",function(data){
               // console.log(data);
               const weatherData=JSON.parse(data);
               // the weatherData will convert hexadecimal into some javascript object
               //accessing using parsed js object
               const icon=weatherData.weather[0].icon;
                const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
               console.log(weatherData);
         //accessing using parsed js object
                                                                                 temp=weatherData.main.temp;
         //accessing using parsed js object
                                                                                 console.log("temperature is"+temp);
                                                                                 description=weatherData.weather[0].description;
                                                                                 console.log("decription is"+description);
                                                                                 res.write("<h1>Temperature in  "+query+" is"+" " +temp  +" degreees celcius.</h1>");
                                                                                 res.write("<h2>The weather  is "+description+"</h2>");
                                                                                 res.write("<img src=" +imageURL+ ">");
                                                                                 res.send();
                                                                                })
                                                       })

})
