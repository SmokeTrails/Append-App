import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './Layout.css';

export default function Layout(props) {
	return (
		<div className="App">
			<div className="layout">
				<Navbar />
				<main>
					<Outlet />
				</main>
				<Sidebar setUser={props.setUser} />
			</div>
		</div>
	);
}
