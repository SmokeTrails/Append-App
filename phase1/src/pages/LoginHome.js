import {
	BrowserRouter, Link
} from "react-router-dom";

import "./Login.css"
import Heading from "./LoginHeading.js"

export default function LoginHome() {
  return (
    <div className="LoginHome">
				<Heading title="Welcome!" />
        <Link className="link" to={"/CreateAccount"}>
          <div className="buttonContainer1">
            <button className="button"> Create a new account</button>
          </div>
        </Link>
        <Link className="link" to={"/StudentLogin"}>
          <div className="buttonContainer2">
            <button className="button"> Login as student</button>
          </div>
        </Link>
        <Link className="link" to={"/AdminLogin"}>
          <div className="buttonContainer3">
            <button className="button"> Login as admin</button>
          </div>
        </Link>
    </div>
  )
}

/*
export function Heading(props) {
	return (
		<div className="titleContainer">
			<h1> {props.title} </h1>
		</div>
	)
}*/
