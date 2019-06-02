LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

What Each Command Should Do

node liri.js concert-this <artist/band name here>
This will search the Bands in Town Artist Events API and show information about the closest concert date.

node liri.js spotify-this-song ''
This will show information about the song.

node liri.js movie-this ''
This will output information about the movie

node liri.js do-what-it-says
Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

