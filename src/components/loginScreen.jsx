import React, { Component } from 'react'
// import logo from "../logo.svg";
import '../App.css'
import '../styles/spotifyButton.css'
import '../styles/loginScreen.css'

require('dotenv').config()

// const DEV_SERVER = "http://localhost:8888";
const PROD_AUTH_SERVER = 'https://my-fyauth.azurewebsites.net'
class LoginScreen extends Component {
	state = {
		authServerURL: PROD_AUTH_SERVER,
	}

	componentDidMount() {
		this.setState({
			authServerURL: PROD_AUTH_SERVER,
		})
	}

	render() {
		return (
			<header className='App-header'>
				<div>
					{/* <img src={logo} className="App-logo" alt="logo" /> */}
					<div style={{ textAlign: 'center' }}>
						{/* https://my-fyauth.herokuapp.com/ -production
              http://localhost:8888 - development */}
						<h1 className='login-title'>My-Fy</h1>
						<a href={this.state.authServerURL}>
							<button className='Spotify-Button Spotify-Button-Play login-button'>
								<i
									className='fab fa-spotify icon'
									aria-hidden='true'
								></i>
								Connect With Spotify
							</button>
						</a>
					</div>
				</div>
			</header>
		)
	}
}
export default LoginScreen
