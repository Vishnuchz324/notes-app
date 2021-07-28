import "./App.css";
import LoginComponent from "./components/LoginComponents";
import HomeComponent from "./components/HomeComponent";
import { useState, useEffect } from "react";

function App() {
	const [isAuthenticated, setisAuthenticated] = useState(false);
	const [userId, setuserID] = useState(0);
	const [userName, setuserName] = useState("");
	const handleAuth = (user, username) => {
		setuserID(user);
		setuserName(username);
		setisAuthenticated(true);
	};
	const handleLogout = () => {
		setuserID(0);
		setuserName("");
		localStorage.clear();
		setisAuthenticated(false);
	};
	useEffect(() => {
		if (localStorage.getItem("userId")) {
			handleAuth(
				localStorage.getItem("userId"),
				localStorage.getItem("userName")
			);
		}
	}, [isAuthenticated]);
	return (
		<>
			{!isAuthenticated ? (
				<LoginComponent handleAuth={handleAuth} />
			) : (
				<HomeComponent
					userID={userId}
					userName={userName}
					handleLogout={handleLogout}
				/>
			)}
		</>
	);
}

export default App;
