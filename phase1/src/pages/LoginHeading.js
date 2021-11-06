import {
	BrowserRouter, Link
} from "react-router-dom";
import './Login.css'

export default function Heading(props) {
	return (
		<div className="titleContainer">
			<h1> {props.title} </h1>
		</div>
	)
}
