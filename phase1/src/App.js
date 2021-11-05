import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomLink from './components/CustomLink';
import UserProfile from './pages/Profile';
import Layout from './pages/Layout';
import Home from './pages/Home';
import './App.css';

export default function App() {
	return (
		<BrowserRouter>
			<div>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="about" element={<About />} />
						<Route path="users" element={<Users />} />
						<Route path="user/:id" element={<UserProfile />} />
					</Route>
					<Route path="*" element={<MissingPage />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

function About() {
	return <h2>About</h2>;
}

function Users() {
	return <h2>Users</h2>;
}

function MissingPage() {
	return (
		<div>
			<h1>404</h1>
			<CustomLink to="/">Go to the home page</CustomLink>
		</div>
	);
}
