import React, { useImperativeHandle, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import "./LoginComponent.css";
function SignUp({ toggleView }) {
	const [userName, setuserName] = useState("");
	const [email, setEmail] = useState("");
	const [passowrd, setPassword] = useState("");
	const handleClick = (event) => {
		event.preventDefault();
		console.log(userName, passowrd, email);
	};
	return (
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
			/>
			<label className='form_label' htmlFor='password'>
				Password
			</label>
			<input
				value={passowrd}
				type='password'
				name='password'
				id='sign-in-password'
				className='form_input'
				onChange={(event) => {
					setPassword(event.target.value);
				}}
			/>
			<button className='form_button' onClick={handleClick}>
				Sign Up
			</button>
			<p>
				i am already a member{" "}
				<a className='form_link' onClick={toggleView}>
					sign in
				</a>
			</p>
		</form>
	);
}

function SignIn({ toggleView }) {
	const [userName, setuserName] = useState("");
	const [passowrd, setPassword] = useState("");
	const handleClick = (event) => {
		event.preventDefault();
		console.log(userName, passowrd);
	};
	return (
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
				value={passowrd}
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
				onClick={handleClick}
			>
				Sign In
			</button>
			<p>
				create and account{" "}
				<a className='form_link' onClick={toggleView}>
					sign up
				</a>
			</p>
		</form>
	);
}

function LoginComponent() {
	const [toggleView, setToggleView] = useState(true);
	const handletoggleView = () => {
		setToggleView(!toggleView);
	};
	return (
		<div className='login_page'>
			{toggleView ? (
				<SignUp toggleView={handletoggleView} />
			) : (
				<SignIn toggleView={handletoggleView} />
			)}
		</div>
	);
}

export default LoginComponent;
