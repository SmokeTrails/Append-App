import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import './Layout.css'

export default function Layout(props) {
	return (
		<div className="App">
			<div className="layout">
				<Navbar />
				<div className="mainContent">
					<Outlet />
				</div>
				<SideBar setUser={props.setUser} />
			</div>
		</div>
	);
}
