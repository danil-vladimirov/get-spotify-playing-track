# Get your Spotify currently playing track using Node.js

This app fetch user’s (you) last played track using Spotify Web API and post a JSON data of this track for future fetching. This template is intended to be deployed on Heroku (or equals) because you never want to share client_id/client_secret or tokens to public.

It uses user-read-recently-played scope instead of user-read-currently-playing, this way our app will always fetch last played track even is user is not listening something right now. You can change it if you want, just edit header field of app fetch.

This app runs on Node.js and npm

## Usage

First, register your Spotify Application, you can do it here:
https://developer.spotify.com/my-applications

After that you need to get refreshable user authorization using Authorization Code flow. Here is Spotify’s tutorial how to do it https://github.com/spotify/web-api-auth-examples

You need to authorise your token against user-read-recently-played scope

Eventually you should have your very own Client id, Client Secret and Refresh Token. 

Next, clone the repository and replace the ‘client_id’, ‘client_secret’ and ‘refresh_token’ in the ‘index.js’ with yours.

## Run

    $ npm install
    $ npm start

Go to ‘http://localhost:8888/my-recently-played' in your browser. This should show JSON data for the user’s last played track.

(I recommend installing JSON Formatter extension to your browser)

## Deploy

The idea is like this: 

== Website fetch data from your app <<
<< App fetch data from Spotify <<
<< Spotify API data
 
So you need to create free Heroku Node application to push your app there and have it on something like https://my-spotify-track.herokuapp.com/

Then your website would be able to load and parse JSON data to html securely and at any time.

You could do it using this Javascript code (don’t forget to replace the link to yours):

```
var xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET', 'https://my-spotify-track.herokuapp.com/my-recently-played', true);
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
        if(xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
            var artistName = data.items[0].track.artists[0].name
            var trackName = data.items[0].track.name
            var names = document.getElementById('track');
            names.innerHTML = artistName + " — " + trackName;
         }
    }
};
xmlhttp.send(null);
```
which would place ‘Artist — Track’ data in this div:

```
<div id=“track”></div>
```

Check this for more https://stackoverflow.com/questions/20743186/get-json-array-with-pure-js

## Links

https://www.youtube.com/watch?v=Mg7Ma5i8NgM&list=PLqGj3iMvMa4LFqyGab_aR7M0zfQm2KTuX
Recommended to check DevTips youtube series, really nice explanation of how Spotify API works.