require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

/* Coommands
   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

 */
let command = process.argv[2];
let input = process.argv[3];

let concert = () => {
    
}

 switch (command) {
    case "concert-this":
        
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