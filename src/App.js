import "./App.css";
import { SignInComponent, SignUpComponent } from "./components/LoginComponents";
import HomeComponent from "./components/HomeComponent";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/' component={SignUpComponent} exact />
				<Route path='/home' component={HomeComponent} exact />
				<Route path='/signup' component={SignUpComponent} exact />
				<Route path='/signin' component={SignInComponent} exact />
			</Switch>
		</Router>
	);
}

export default App;
