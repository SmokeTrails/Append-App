import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomLink from './components/CustomLink';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Friends from './pages/Friends';
import UserProfile from './pages/Profile';
import LoginHome from './pages/LoginHome';
import Login from './pages/Login'
import Admin from './pages/Admin'
import './App.css';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/LoginHome" element={<LoginHome />} />
				<Route path="/Login" element={<Login />} />
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="friends" element={<Friends />} />
					<Route path="user/:username" element={<UserProfile />} />
					<Route path="friends" element={<Friends />} />
					<Route path="admin" element={<Admin />} />
				</Route>
				<Route path="*" element={<MissingPage />} />
			</Routes>
		</BrowserRouter>
	);
}

function MissingPage() {
	return (
		<div>
			<h1>404</h1>
			<CustomLink to="/">Go to the home page</CustomLink>
		</div>
	);
}
