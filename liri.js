require("dotenv").config();

const keys = require("./keys.js");
const axios = require('axios');
const moment = require('moment');
const Spotify = require("node-spotify-api");
const fs = require("fs");

const command = process.argv[2];
const value = process.argv.splice(3).join("+");

const writeLog = (res) => {
    if (fs.existsSync("log.txt")) {
        fs.appendFile("log.txt", "," + JSON.stringify(res), (err) =>{
            if (err) throw err;
        })
    } else {
        fs.appendFile("log.txt", JSON.stringify(res), (err) =>{
            if (err) throw err;
        })
    }
}

const consoleLog = (res) => {
    res.forEach(element => {
        console.log("---------------------------------")
        for (const key in element) {
                const entry = element[key];
                console.log(`${key}: ${entry}`)
        }                            
    })
}

const concert = (title) => {
    let input = title.replace(/ |\+/g, "%20").replace(/"/g, "")

    let bandsURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";

    axios
        .get(bandsURL)
        .then(function(response){
            let results = [{"Command": "concert-this"}];
            if (!response.data.length){
                const errMsg = {"Error": `Sorry, ${title.replace(/"/g,"")} has no upcoming show.`}
                results.push(errMsg)
            } else {
                let show = response.data
                for (let i = 0; i < show.length; i++){
                    let venue = show[i].venue.name;
                    let location = show[i].venue.city + ", " + show[i].venue.country;
                    let dT = show[i].datetime;
                    let date = moment(dT).format("LL")
                    let result = {
                        "Venue": venue,
                        "Location": location,
                        "Date": date
                    }
                    results.push(result)
                }
            }
            writeLog(results);             
            consoleLog(results);                    
        })
        .catch(function(err){
            console.log(`Oops! ${err}`)
        })  
}


const song = (title) => {
    let spotify = new Spotify(keys.spotify);

    let input = title.replace(/ /g, '+').replace(/"/g, "")

    spotify
        .search({ type: 'track', query: input, limit: 5 })
        .then(function(response) {
            let results = [{"Command": "spotify-this-song"}];
            for (var i = 0; i < response.tracks.items.length; i++){
                let artists = response.tracks.items[i].album.artists[0].name;
                let name = response.tracks.items[i].name;
                let preview = response.tracks.items[i].preview_url;
                let album = response.tracks.items[i].album.name

                let result = {
                    "Artist(s)": artists,
                    "Title": name,
                    "Preview": preview,
                    "Album": album
                }
                results.push(result)    
            };
            if (!response.tracks.items.length){
                spotify
                .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
                .then(function(response) {
                    let artists = response.album.artists[0].name;
                    let name = response.name;
                    let preview = response.preview_url;
                    let album = response.album.name;

                    let result = [{
                        "Error": "Song not found! Try this song instead.",
                        "Artist(s)": artists,
                        "Title": name,
                        "Preview": preview,
                        "Album": album
                    }]

                    writeLog(result);             
                    consoleLog(result);                
                })    
            }
            writeLog(results);             
            consoleLog(results);                    
        })
        .catch(function(err){
            console.log(`Oops! ${err}`)
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
                let result = [{"Command": "movie-this"},                    
                    {"Title": response.data.Title,
                    "Year": response.data.Year,
                    "IMBD_Rating": response.data.Ratings[0].Value,
                    "Tomatoes_Rating": response.data.Ratings[1].Value,
                    "Country": response.data.Country,
                    "Language": response.data.Language,
                    "Plot": response.data.Plot,
                    "Actors": response.data.Actors
                }]           
                writeLog(result);             
                consoleLog(result);    
            }
        })
        .catch(function(err){            
            console.log(`Oops! ${err}`)
        })  
}

const simon = () => {
    fs.readFile("random.txt", "utf8", (err, data)=>{
        if (err) throw err;
        input = data.split(",")
        controller(input[0],input[1])
    })

    let result = [{"Command": "do-what-it-says"}];
    writeLog(result);             
    consoleLog(result);  
}

const showLog = () => {
    fs.readFile("log.txt", "utf8", (err, data) => {
        if (err) {console.log("Sorry, the log is empty.")}
        else{
            const dataLog = JSON.parse(`[${data}]`);
            dataLog.forEach(entry => {
                entry.forEach(obj => {
                    console.log("---------------------------")
                    for (const key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            console.log(`${key}: ${obj[key]}`);            
                        }
                    }    
                })
            })
        }
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
       case "show-log":
           showLog();
           break; 
       default:
           console.log("Did you forget something?")
           break;
    }
}

const title = () =>{
    console.log("\n\n\n\n\n\n\n\n\n\n\n    LIRIBOTLIRIBOTLIRIBOTLIRIBOTLIRIBOTLIRIBOTLIRIBOTLIRIBOTLIRIBOT")
    console.log("    LI                                                           OT")
    console.log("    LI  B       OTLIR  OTLIR   TLIRI     RIBOT    BOTL   BOTLI   OT")
    console.log("    LI  B         L    O    I    I       R    L  I    I    T     OT")
    console.log("    LI  B         L    OTLIR     I       RIBOTL  I    I    T     OT")
    console.log("    LI  B         L    O  IR     I       R    L  I    I    T     OT")
    console.log("    LI  BOTLIR  OTLIR  O    I  TLIRI     RIBOT    BOTL     T     OT")
    console.log("    LI                                                           OT")
    console.log("    LIRIBOTLIRIBOTLIRIBOTLIRIBOTLIRIBOTLIRIBOTLIRIBOTLIRIBOTLIRIBOT\n\n\n\n\n\n\n\n\n\n\n")
}

controller(command, value);
 
