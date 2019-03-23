require("dotenv").config();

var keys = require("./keys.js");

//var spotify = new Spotify(keys.spotify);

const axios = require('axios');

let command = process.argv[2];
let input = process.argv[3];

let concert = () => {
    let bandsURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
    try {
        return await axios.get(bandsURL)
      } catch (error) {
        console.error(error)
      }}

concert();
/*
 switch (command) {
    case "concert-this":
        concert();
        break;
    case "spotify-this-song":
    
        break;
    case "movie-this":
    
        break;
    case "do-what-it-says":
    
        break;
    default:
        break;
 }
 */