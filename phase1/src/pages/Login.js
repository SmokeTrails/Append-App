import {
	BrowserRouter, Link
} from "react-router-dom";
import './Login.css'
import Heading from './LoginHeading.js'


export default function Login() {
  return (
    <div>
      <Heading title="Login" />
        <Link className="link" to={"/"}>
          <div className="buttonContainer2">
            <button className="button"> Submit</button>
          </div>
      </Link>
    </div>
  )
}
