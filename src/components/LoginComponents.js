import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import "./LoginComponents.css";

export const SignUpComponent = ({ toggleView }) => {
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
			.then((response) => {
				<Redirect to='/sign-in' />;
			})
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
					<Link to='/signin'>
						<a className='form_link'>sign in</a>
					</Link>
				</p>
			</form>
		</div>
	);
};

export const SignInComponent = ({ toggleView }) => {
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
				<Redirect to='/home' />;
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
					<Link to='/signup'>
						<a className='form_link'>sign up</a>
					</Link>
				</p>
			</form>
		</div>
	);
};
