import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar'
import FriendList from '../components/FriendList'
import './Layout.css'

export default function Layout() {
	return (
		<div className="App">
			<div className="layout">
				<Navbar />
				<div className="mainContent">
					<Outlet />
				</div>
				<FriendList />
			</div>
		</div>
	);
}
