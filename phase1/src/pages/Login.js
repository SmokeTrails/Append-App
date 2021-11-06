import {
	BrowserRouter, Link
} from "react-router-dom";
import './Login.css'
import Heading from './LoginHeading.js'


export default function Login() {
  return (
    <div className="Login">
      <Heading title="Sign in to your account" />
          <div className="usernameContainer">
            <h3> Username: </h3>
            <input className="text" type="text"/>
          </div>
          <div className="passwordContainer">
            <h3> Password: </h3>
            <input className="text" type="text"/>
          </div>
          <Link className="link" to={"/"}>
            <div className="submitContainer">
              <button className="button"> Login</button>
              </div>
          </Link>
    </div>
  )
}
