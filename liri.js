require("dotenv").config();

const Spotify = require("node-spotify-api");
const keys = require("./keys");
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
let spotify = new Spotify(keys.spotify);


let getArtistNames = (artist) => {
    return artist.name;
};

// Function for running a Spotify search
let getMeSpotify = (songName) => {
    if (songName === undefined) {
        songName = "What's my age again";
    }

    spotify.search(
        {
            type: "track",
            query: songName
        },
        function (err, data) {
            if (err) {
                console.log(`${err}`);
                return;
            }

            let songs = data.tracks.items;

            for (let i = 0; i < songs.length; i++) {
                console.log(i);
                console.log(`artist(s): ${songs[i].artists.map(getArtistNames)}`);
                console.log(`song name: ${songs[i].name}`);
                console.log(`preview song: ${songs[i].preview_url}`);
                console.log(`album: ${songs[i].album.name}`);
                console.log("-----------------------------------");
            }
        }
    );
};

let getMyBands = (artist) => {
    let queryURL = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;

    axios.get(queryURL).then(
        function (response) {
            let jsonData = response.data;

            if (!jsonData.length) {
                console.log(`No results found for ${artist}`);
                return;
            }

            console.log(`Upcoming concerts for ${artist} ":"`);

            for (let i = 0; i < jsonData.length; i++) {
                let show = jsonData[i];

                console.log(
                    show.venue.city +
                    "," +
                    (show.venue.region || show.venue.country) +
                    " at " +
                    show.venue.name +
                    " " +
                    moment(show.datetime).format("MM/DD/YYYY")
                );
            }
        }
    );
};

// Function for running a Movie Search
let getMeMovie = (movieName) => {
    if (movieName === undefined) {
        movieName = "Mr Nobody";
    }

    let urlHit =
        `http://www.omdbapi.com/?t=${movieName}&y=&plot=full&tomatoes=true&apikey=trilogy`;

    axios.get(urlHit).then(
        function (response) {
            let jsonData = response.data;

            console.log(`Title: ${jsonData.Title}`);
            console.log(`Year: ${jsonData.Year}`);
            console.log(`Rated: ${jsonData.Rated}`);
            console.log(`IMDB Rating: ${jsonData.imdbRating}`);
            console.log(`Country: ${jsonData.Country}`);
            console.log(`Language: ${jsonData.Language}`);
            console.log(`Plot: ${jsonData.Plot}`);
            console.log(`Actors: ${jsonData.Actors}`);
            console.log(`Rotten Tomatoes Rating: ${jsonData.Ratings[1].Value}`);
        }
    );
};

let doWhatItSays = () => {
    fs.readFile("random.txt", "utf8", function (error, data) {
        console.log(data);
        if (error) {
            console.log(error);
        };

        let dataArr = data.split(",");

        if (dataArr.length === 2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length === 1) {
            pick(dataArr[0]);
        }
    });
};


let pick = (caseData, functionData) => {
    switch (caseData) {
        case "concert-this":
            getMyBands(functionData);
            break;
        case "spotify-this-song":
            getMeSpotify(functionData);
            break;
        case "movie-this":
            getMeMovie(functionData);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("LIRI doesn't know that");
    }
};


let runThis = (argOne, argTwo) => {
    pick(argOne, argTwo);
};


runThis(process.argv[2], process.argv.slice(3).join(" "));