import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import { ProtectedRoute } from './hooks/Routing';
import Profile from './pages/Profile';
import Home from './pages/Home';
import './App.css';

const auth = {
	isLoggedIn: false,
	signin(callback) {
		this.isLoggedIn = true;
		setTimeout(callback, 100);
	},
	signout(callback) {
		this.isLoggedIn = false;
		setTimeout(callback, 100);
	}
};

export default function App() {
	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/about">About</Link>
						</li>
						<li>
							<Link to="/users">Users</Link>
						</li>
						<li>
							<Link to="/user/Haider">Profile</Link>
						</li>
					</ul>
				</nav>

				{/* A <Switch> looks through its children <Route>s and
			  renders the first one that matches the current URL. */}
				<Switch>
					<Route path="/about" component={About} />
					<Route path="/users" component={Users} />
					<Route path="/user/:id" component={Profile} />
					<ProtectedRoute path="/" component={Home} />
				</Switch>
			</div>
		</Router>
	);
}

function About() {
	return <h2>About</h2>;
}

function Users() {
	return <h2>Users</h2>;
}
