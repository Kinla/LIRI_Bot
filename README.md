# LIRI_Bot

### Overview

This LIRI Bot is a CLI app that takes in parameters and returns data in terminal base on these 5 functions.
   * `concert-this` - Find future concert by artist(s) query
   * `spotify-this-song` - Find song info by title query
   * `movie-this` - Find movie info by title query
   * `do-what-it-says` - Find info of either concert, song or movie via commands found in a text file
   * `show-log` - Display historical search results

### Technologies

* Node.js
* JavaScript
* npm
    * axios
    * dotenv
    * moment
    * node-spotify-api
* Bandsintown API
* OMDB API 

- - -
   
### How This Works

   * `concert-this`
      * Working example: concert-this Drake
      * Fail: concert-this adele
   ![how-this-works](https://github.com/Kinla/LIRI_Bot/blob/master/Recordings/concert.gif)

   * `spotify-this-song`
      * Working example: spotify-this-song hello (max result: 5)
      * Fail: spotify-this-song dsafjl
   ![how-this-works](https://github.com/Kinla/LIRI_Bot/blob/master/Recordings/song.gif)

   * `movie-this`
      * Working example: movie-this the matrix
      * Fail: movie-this
   ![how-this-works](https://github.com/Kinla/LIRI_Bot/blob/master/Recordings/movie.gif)

   * `do-what-it-says`
      * Working example: do-what-it-says
   ![how-this-works](https://github.com/Kinla/LIRI_Bot/blob/master/Recordings/simon.gif)

   * `show-log`
      * Working example: show-log
   ![how-this-works](https://github.com/Kinla/LIRI_Bot/blob/master/Recordings/log.gif)

- - -

### Run LIRI Bot

If you would like to clone and run this LIRI Bot yourself, please supply your own `.env` file with Spotify API key/secret.

*Instruction*: Create a file named `.env`, add the following to it, replacing the values with your API keys (no quotes) once you have them:
```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
```

You would also need to install the npms.

*Instruction*: 
```js
npm install
```

- - -

### Bugs / Improvements

  1. Movie errors are not being logged.
  2. Should be albe to have spotify provide more detailed artist info if there are more than one artist.
  