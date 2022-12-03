/**
 * Auth Server
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

require('dotenv').config()
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const env = process.env.NODE_ENV
const client_id = process.env.SPOTIFY_API_CLIENT_ID
const client_secret = process.env.SPOTIFY_API_CLIENT_SECRET
const redirect_uri = process.env.AUTH_CALLBACK_URL
const stateKey = 'spotify_auth_state'

// const prodCallbackUrl = 'https://my-fyauth.herokuapp.com/callback' // production

/**
 * TODO - What on earth is this about ??
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
	var text = ''
	const possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return text
}

var app = express()
app.use(express.static(__dirname + '/public'))
	.use(cors())
	.use(cookieParser())

app.get('/login', function (req, res) {
	var state = generateRandomString(16)
	res.cookie(stateKey, state)

	// Request Authorization
	var scope =
		'user-top-read user-read-private user-read-email user-read-playback-state user-read-recently-played user-follow-read playlist-read-private playlist-read-collaborative user-follow-modify playlist-modify-public playlist-modify-private'
	res.redirect(
		'https://accounts.spotify.com/authorize?' +
			new URLSearchParams({
				response_type: 'code',
				client_id: client_id,
				scope: scope,
				redirect_uri: redirect_uri,
				state: state,
			})
	)
})

app.get('/callback', function (req, res) {
	var code = req.query.code || null
	var state = req.query.state || null
	var storedState = req.cookies ? req.cookies[stateKey] : null

	if (state === null || state !== storedState) {
		res.redirect(
			'/#' +
				new URLSearchParams({
					error: 'state_mismatch',
				})
		)
	}

	res.clearCookie(stateKey)

	const authUrl = 'https://accounts.spotify.com/api/token'
	const formBody = new URLSearchParams({
		code: code,
		redirect_uri: redirect_uri,
		grant_type: 'authorization_code',
	})
	const headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
		Authorization:
			'Basic ' +
			new Buffer(client_id + ':' + client_secret).toString('base64'),
	}

	axios
		.post(authUrl, formBody, { headers: headers })
		.then(function (response) {
			if (response.status != 200) {
				res.redirect(
					'/#' +
						new URLSearchParams({
							error: 'invalid_token',
						})
				)
			}

			const { access_token, refresh_token } = response.data

			// Pass access token to the client via redirect
			const devTokenRedirectUrl = 'http://localhost:3000/#' //development
			const prodTokenRedirectUrl = 'https://my-fy3.herokuapp.com/#' //production
			const tokenRedirectUrl =
				env === 'production'
					? prodTokenRedirectUrl
					: devTokenRedirectUrl

			res.redirect(
				tokenRedirectUrl +
					new URLSearchParams({
						access_token: access_token,
						refresh_token: refresh_token,
					})
			)
		})
})

// This is not yet utilised
app.get('/refresh_token', function (req, res) {
	// requesting access token from refresh token
	var refresh_token = req.query.refresh_token
	var authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		headers: {
			Authorization:
				'Basic ' +
				new Buffer(client_id + ':' + client_secret).toString('base64'),
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: refresh_token,
		}),
	}

	axios
		.post(authOptions.url, authOptions.body, {
			headers: authOptions.headers,
		})
		.then(function (response) {
			if (response.state != 200) {
				res.redirect(
					'/#' +
						new URLSearchParams({
							error: 'invalid_token',
						})
				)
			}

			var access_token = body.access_token
			res.send({
				access_token: access_token,
			})
		})
})

console.log('Auth Server Running...')

app.listen(process.env.PORT || 8888)
