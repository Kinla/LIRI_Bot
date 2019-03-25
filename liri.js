require("dotenv").config();

const keys = require("./keys.js");
const axios = require('axios');
const moment = require('moment');
const Spotify = require("node-spotify-api");
const fs = require("fs");

const command = process.argv[2];
const value = process.argv.splice(3).join("+");

const concert = (title) => {
    let input = title.replace(/ |\+/g, "%20").replace(/"/g, "")

    let bandsURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";

    axios
        .get(bandsURL)
        .then(function(response){
            if (!response.data.length){
                console.log("Sorry, this artist has no upcoming show.")
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
        .catch(function(err){
            console.log("Oops! " + err)
        })  
};


const song = (title) => {
    let spotify = new Spotify(keys.spotify);

    let input = title.replace(/ /g, '+').replace(/"/g, "")

    spotify
        .search({ type: 'track', query: input, limit: 5 })
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
            if (!response.tracks.items.length){
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
        .catch(function(err){
            console.log("Oops! " + err)
        })  
    }

const movie = (title) => {
    let input = "";
    let queryUrl = "";

    if (!title){
        queryUrl = "http://www.omdbapi.com/?t=Mr%2E+Nobody&y=&plot=short&apikey=trilogy";
    } else {
        input = title.replace(/ /g, '+').replace(/"/g, "")
        queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy"; 
    }

    axios
        .get(queryUrl)
        .then(function(response){
            if (response.data.Response === "False"){
                movie();
            } else {
                console.log("--------------------------------");            
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("IMBD Rating: " + response.data.Ratings[0].Value);
                console.log("Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            }
        })
        .catch(function(err){            
            console.log("Oops! " + err)
        })  
}

const simon = () => {
    fs.readFile("random.txt", "utf8", (err, data)=>{
        if (err) throw err;
        input = data.split(",")
        controller(input[0],input[1])
    })

}

const controller = (cmd,val) => {
    switch (cmd) {
       case "concert-this":
           concert(val);
           break;
           case "spotify-this-song":
           song(val);
           break;
       case "movie-this":
           movie(val);
           break;
       case "do-what-it-says":
           simon();
           break;
       default:
           console.log("Did you forget something?")
           break;
    }
}
 
controller(command, value);