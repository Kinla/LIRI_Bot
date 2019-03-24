require("dotenv").config();

const keys = require("./keys.js");

//var spotify = new Spotify(keys.spotify);

const axios = require('axios');
const moment = require('moment');
const Spotify = require("node-spotify-api");

let command = process.argv[2];

let concert = () => {
    let input = "";
    for (let i = 3; i < process.argv.length; i++){
        if (i < process.argv.length - 1){
            switch (process.argv[i]) {
                case "/":
                    input+="%252F%20"
                    break;            
                case "?":
                    input+="%253F%20"
                    break;            
                case "*":
                    input+="%252A%20"
                    break;            
                case '"':
                    input+="%27C%20"
                    break;            
                default:
                    input+=process.argv[i]+ "%20"
                    break;
            }
        } else {
            switch (process.argv[i]) {
                case "/":
                    input+="%252F"
                    break;            
                case "?":
                    input+="%253F"
                    break;            
                case "*":
                    input+="%252A"
                    break;            
                case '"':
                    input+="%27C"
                    break;            
                default:
                    input+=process.argv[i]
                    break;
            }
        }
    }
    
    let bandsURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";

    axios
        .get(bandsURL)
        .then(function(response){
            if (response.data.length === 0){
                console.log("Sorry, " + input + " has no upcoming show.")
            } else {
                let show = response.data
                for (let i = 0; i < response.data.length; i++){
                    let venue = show[i].venue.name;
                    let location = show[i].venue.city + ", " + show[i].venue.country;
                    let dT = show[i].datetime;
                    let date = moment(dT).format("LL")

                    console.log("--------------------------------");
                    console.log("Venue: " + venue);
                    console.log("Location: " + location);
                    console.log("Date: " + date);


                }

            }
        })
};


let song = () => {
    let spotify = new Spotify({
        id: "b32945b228cd448691a70ebe2eae3b42",
        secret: "2f8d75a4d3f64925be3ccbdb59c95b29"
    });

    let input = process.argv.slice(3).join("+")

    spotify
        .search({ type: 'track', query: input })
        .then(function(response) {
            for (var i = 0; i < response.tracks.items.length; i++){
                let artists = response.tracks.items[i].album.artists[0].name;
                let name = response.tracks.items[i].name;
                let preview = response.tracks.items[i].preview_url;
                let album = response.tracks.items[i].album.name
    
                console.log("--------------------------------");
                console.log("Artist(s): " + artists);
                console.log("Song Title: " + name);
                console.log("Preview: " + preview);
                console.log("Album: " + album);
            };
            if (response.tracks.items.length === 0){
                spotify
                .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
                .then(function(response) {
                    let artists = response.album.artists[0].name;
                    let name = response.name;
                    let preview = response.preview_url;
                    let album = response.album.name;
        
                    console.log("--------------------------------");
                    console.log("Oops, that isn't a song we recognize. Try this number~")
                    console.log(" ")
                    console.log("Artist(s): " + artists);
                    console.log("Song Title: " + name);
                    console.log("Preview: " + preview);
                    console.log("Album: " + album);
                    })
    
            }

        })
    }




 switch (command) {
    case "concert-this":
        concert();
        break;
        case "spotify-this-song":
        song();
        break;
    case "movie-this":
    
        break;
    case "do-what-it-says":
    
        break;
    default:
        break;
 }
