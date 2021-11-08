import React, { useEffect, useState, useRef } from 'react';
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './Layout.css';

export default function Layout(props) {
	const navbarRef = useRef(null);
	const sidebarRef = useRef(null);
	const [navbarWidth, setNavbarWidth] = useState(0);
	const [sidebarWidth, setSidebarWidth] = useState(0);

	useEffect(() => {
		if (navbarRef.current) {
			setNavbarWidth(navbarRef.current.offsetWidth);
		}
		if (sidebarRef.current) {
			setSidebarWidth(sidebarRef.current.offsetWidth);
		}
	}, [navbarRef, sidebarRef]);

	return (
		<div className="App">
			<div className="layout">
				<Navbar elementRef={navbarRef} />
				<div style={{ width: navbarWidth }} ></div>
				<div className="mainContent">
					<Outlet />
				</div>
				<div style={{ width: sidebarWidth }} ></div>
				<Sidebar setUser={props.setUser} elementRef={sidebarRef} />
			</div>
		</div>
	);
}
