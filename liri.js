require("dotenv").config();
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
// var config = require('./config')
var spotify = new Spotify (keys.spotify);
var twitter = new Twitter(keys.twitter);

  function OMDB(search) {
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
               var outputStr = "\n----------------------\n" + "Title: " + JSON.parse(body).Title + "\n" + "Released: " + JSON.parse(body).Year + 
               "\nIMDb: " + JSON.parse(body).imdbRating + "\nRotten Tomatoes: " + JSON.parse(body).Ratings[2].Value + "\nCountry Produced: " + 
               JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nFeatures: " + 
               JSON.parse(body).Actors;
               fs.appendFile("./log.txt", "Liri response: " + outputStr + "\n");
               console.log(outputStr);
           });
       }
   }

function spotifySong (search) {
    if (search) {
        spotify.search({ type: 'track', query: search}, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
            else {
            for (var i = 0; i<=5; i++) {
                // console.log(data.tracks)
            console.log("\n----------------------\n")
            console.log("Artists: " + data.tracks.items[i].artists[0].name + "\n" +
            "Title: " + data.tracks.items[i].name + "\n" +
            "Preview Link: " + data.tracks.items[i].preview_url + "\n" + 
            "Album: " + data.tracks.items[i].album.name + "\n")
            }
          }
          })
    }
    else {
        spotify
        .request('https://api.spotify.com/v1/tracks/6EPRKhUOdiFSQwGBRBbvsZ')
        .then(function(data) {
            // console.log(data.artists[0].name)
            
          console.log("Artists: " + data.artists[0].name + "\n" + 
          "Title: " + data.name +"\n" + 
          "Preview Link: " + data.preview_url +
          "Album: " + data.album.name
        ); 
        })
        .catch(function(err) {
          console.error('Error occurred: ' + err); 
        });
    }
}
    function tweets (search) {
        var params = {screen_name: 'atest69797170'};
twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
    if(error){
        console.log("ERROR:",error)
    }
  else if(!error) {
      for (var i= 0; i < tweets.length; i++) {
        console.log("TWEETS: ",tweets[i].text + tweets[i].created_at);
      }
  }
});
    }
    function read (search) {
        fs.readFile("random.txt", "utf8", function(error, data) {
             if (error) {
              return console.log(error);
            }
            else {
                var dataArr = data.split(",");
                var functionName = dataArr[0].trim();
                var parameter = dataArr[1].trim
                var commandString = data.split(",");
                var command = commandString[0].trim();
                liriCmnd = commandString[1].trim();
                var search = liriCmnd
                switch(command) {
                    case 'my-tweets':
                   tweets()
                        break;
                    case 'movie-this':
                        OMDB(liriCmnd)
                        break;
                    case 'spotify-this-song':
                        spotifySong(liriCmnd)
                        break;
                    default:
                        console.log("input error")
                }
            }
          });
    }

   switch(process.argv[2]) {
    case 'my-tweets':
   tweets()
        break;
    case 'movie-this':
        OMDB(process.argv[3])
        break;
    case 'spotify-this-song':
        spotifySong(process.argv[3])
        break;
        case 'do-what-it-says':
        read()
        break;
    default:
        console.log("input error")
}