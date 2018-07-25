require("dotenv").config();
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var Twitter = require('twitter');
var config = require('./config')
var spotify = keys.spotify;
var twitter = keys.twitter;



  function OMDB(search) {
    var search = liriCmnd;
       if (search === null){
           search = "Mr. Nobody";
       }
       else {
           fs.appendFile("./log.txt", "User command: movie-this " + search + "\n", (error) => {
               if (error) {
                   return console.log(error);
               }
           });
           request("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
               if (error) {
                   return console.log(error);
               }   
               var outputStr = "\n----------------------\n" + "Title: " + JSON.parse(body).Title + "\n" + "Released: " + JSON.parse(body).Year + "\nIMDb: " + JSON.parse(body).imdbRating + "\nRotten Tomatoes: " + JSON.parse(body).tomatoRating + "\nCountry Produced: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nFeatures: " + JSON.parse(body).Actors;
               fs.appendFile("./log.txt", "Liri response: " + outputStr + "\n");
               console.log(outputStr);
           });
       }
   }