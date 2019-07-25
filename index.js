const fetch = require('node-fetch');
const express = require('express')
const cors = require('cors')
const app = express()

const spotifyAPIBaseUri = 'https://api.spotify.com'
const spotifyAccountsBaseUri = 'https://accounts.spotify.com'

const clientId = 'client_id'
const clientSecret = 'client_secret'
const refreshToken = 'refresh_token'
let accessToken = ''

const { URLSearchParams } = require('url');
const params = new URLSearchParams(`grant_type=refresh_token&refresh_token=${refreshToken}`);
params.append('a', 1);

const getRecentlyPlayed = () => {
  return fetch(`${spotifyAccountsBaseUri}/api/token`, {
    method: 'POST',
    body: params,
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        clientId + ':' + clientSecret
      ).toString('base64'))
    },
  })
  .then((refreshResponse) => refreshResponse.json())
  .then((refreshResponse) => {
  accessToken = refreshResponse['access_token'];
  return fetch(`${spotifyAPIBaseUri}/v1/me/player/recently-played?limit=1`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
      }
    })
  })
}

app.get('/my-recently-played', cors(), function (req, res) {
  getRecentlyPlayed()
    .then((recentlyPlayedResponse) => recentlyPlayedResponse.json())
    .then((recentlyPlayedResponseJSON) => {
      res.send(recentlyPlayedResponseJSON);
    })
})

let port = process.env.PORT || 8888
console.log(`Listening on port ${port}, go to /my-recently-played`)
app.listen(port)
