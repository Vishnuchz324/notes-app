import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import "./LoginComponents.css";

const SignUpComponent = ({ toggleView, handleAuth }) => {
	const [userName, setuserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState();
	const handleSubmit = async (event) => {
		event.preventDefault();
		await axios({
			method: "POST",
			headers: { "content-type": "application/json" },
			url: "http://127.0.0.1:5000/auth/register",
			data: {
				userName: userName,
				password: password,
				email: email,
			},
		})
			.then((response) => {})
			.catch((e) => console.log(e.response));
	};
	return (
		<div className='login_page'>
			<form className='form'>
				<h2>Sign Up</h2>
				<label className='form_label' htmlFor='username'>
					First Name
				</label>
				<input
					value={userName}
					type='text'
					name='username'
					id='sign-in-username'
					className='form_input'
					onChange={(event) => {
						setuserName(event.target.value);
					}}
					required
				/>
				<label className='form_label' htmlFor='email'>
					Email
				</label>
				<input
					value={email}
					type='email'
					name='email'
					id='sign-in-email'
					className='form_input'
					onChange={(event) => {
						setEmail(event.target.value);
					}}
					required
				/>
				<label className='form_label' htmlFor='password'>
					Password
				</label>
				<input
					value={password}
					type='password'
					name='password'
					id='sign-in-password'
					className='form_input'
					onChange={(event) => {
						setPassword(event.target.value);
					}}
					required
				/>
				<button className='form_button' onClick={handleSubmit}>
					Sign Up
				</button>
				<p>
					i am already a member{" "}
					<a onClick={toggleView} className='form_link'>
						sign in
					</a>
				</p>
			</form>
		</div>
	);
};

const SignInComponent = ({ toggleView, handleAuth }) => {
	const [userName, setuserName] = useState("");
	const [password, setPassword] = useState("");
	const handleSubmit = async (event) => {
		event.preventDefault();
		await axios({
			method: "POST",
			headers: { "content-type": "application/json" },
			url: "http://127.0.0.1:5000/auth/login",
			data: {
				userName: userName,
				password: password,
			},
		})
			.then((response) => {
				localStorage.setItem("userId", response.data);
				localStorage.setItem("userName", userName);
				handleAuth(response.data, userName);
			})
			.catch((e) => console.log(e.response));
	};
	return (
		<div className='login_page'>
			<form className='form'>
				<h2>Sign In</h2>
				<label className='form_label' htmlFor='username'>
					First Name
				</label>
				<input
					value={userName}
					type='text'
					name='username'
					id='sign-in-username'
					className='form_input'
					onChange={(event) => {
						setuserName(event.target.value);
					}}
				/>
				<label className='form_label' htmlFor='password'>
					Password
				</label>
				<input
					value={password}
					type='password'
					name='password'
					id='sign-in-password'
					className='form_input'
					onChange={(event) => {
						setPassword(event.target.value);
					}}
				/>
				<button
					className='form_button'
					className='form_button'
					onClick={handleSubmit}
				>
					Sign In
				</button>
				<p>
					create and account{" "}
					<a onClick={toggleView} className='form_link'>
						sign up
					</a>
				</p>
			</form>
		</div>
	);
};

export default function LoginComponent({ handleAuth }) {
	const [isRegistered, setIsRegistered] = useState(false);
	const toggleView = () => {
		setIsRegistered(!isRegistered);
	};
	return (
		<>
			{!isRegistered ? (
				<SignInComponent handleAuth={handleAuth} toggleView={toggleView} />
			) : (
				<SignUpComponent toggleView={toggleView} />
			)}
		</>
	);
}
