import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar'
import FriendList from '../components/FriendList'

export default function Layout() {
	return (
		<div>
			<Navbar />
			<Outlet />
			<FriendList />
		</div>
	);
}
