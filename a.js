require("dotenv").config();
var fs = require("fs");
var request = require("request");
var keys = require('./keys.js');
var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotifyKeys;


console.log("working");

// var Twitter = require('twitter');

// var client = new Twitter({
//   consumer_key: process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//   access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
// });


// client.get('statuses/user_timeline', {screen_name: 'GaTechFU1', count: 5}, function(error, tweets, response){
//  var i =0;
//  if (process.argv[2] === "my-tweets"){
//   var outputStr = "----------------------\n" + "User Tweets:\n" + "----------------------\n\n";
  
//         for (i = 0; i < tweets.length; i ++) {
//             outputStr += "Created on: " + tweets[i].created_at + "\n" + "Tweet content: " + tweets[i].text + "\n" + "----------------------\n";
//         }
        
//  }
        
//         fs.appendFile("./log.txt", "Liri response: " + outputStr + "\n");
//         console.log(outputStr);

// });


// var Spotify = require('node-spotify-api');
 
// var spotify = new Spotify({
//   id: "bbac1a33e7b3460d92c9118f3714cb8c",
//   secret:  "b7051b7553bc474dace3d84654def5d0"
    
// });
 
// spotify.search({ type: 'track', query: process.argv[3], limit: 20 }, function (err, data) {
//         if (err) {
//             return console.log('Error occurred: ' + err);
//         }
        
//         if (process.argv[2] === "spotify-this-song"){
//                 for (var i = 0; i<=5; i++){
//         console.log("Artists: " + data.tracks.items[i].artists[0].name);
//         console.log("Title: " + data.tracks.items[i].name);
//         console.log("Preview Link: " + data.tracks.items[i].preview_url);
//         console.log("Album: " + data.tracks.items[i].album.name+"\n*******************************************************************************************************************");
//                 }
//         }
//                 fs.appendFile("./log.txt", "Liri song err response: " + err + "\n");
     
//     });


function OMDB(search) {
 var search = liriCmnd;
    if (search === null){
        search = "Mr. Nobody";
        console.log("Mr. Nobody")
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


function read (search) {
    fs.readFile("random.txt", "utf8", function(error, data) {
         if (error) {
          return console.log(error);
        }
        else {
            // console.log(data);
            command = data.split(",");
            arg = dataArr[0].trim();
            console.log(typeof functionName)
            var parameter = dataArr[1].trim();
            console.log(parameter)
            switch(command)
        }
        switch (userInput) {
            case "my-tweets" :
                twitter();
                break;
            
            case "spotify-this-song" :
                spotify();
                break;
        
            case "movie-this" :
                OMDB();
                break;
            
            case "do-what-it-says":
                readtxt();
                break;
        }
        
})
}

function readtxt() {
    fs.readFile("./random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var commandString = data.split(",");
        var command = commandString[0].trim();
        liriCmnd = commandString[1].trim();
        var search = liriCmnd
        console.log(liriCmnd)

        switch (command) {
            case "twitter" :
                twitter();
                break;
            
            case "spotify" :
                spotify(search);
                break;
        
            case "omdb" :
                OMDB(search);
                break;
            
            case "do-what-it-says":
                readtxt();
                break;
        }

    })