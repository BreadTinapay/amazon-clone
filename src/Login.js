import React, { useState } from 'react';
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Login() {

    const history = useHistory();
    const [ email, setEmail] = useState(''); //declare variables
    const [password, setPassword] = useState(''); //declare variable

    // you can substitute event with e
    const signIn = event => {
        event.preventDefault(); //stops refresh

//login logic in firebase
        auth
        .signInWithEmailAndPassword(email, password)
            .then((auth) => {
                //redirect to hompage
                history.push('/');
            })
            .catch((event) => alert(event.message))
    }


//register logic
    const register = event => {
        event.preventDefault();//stops refresh


//firebase register here!
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(auth => {
                //created a new user and logged in and redirect to homepage
                if(auth) {
                    history.push('/')
                }
            })
            .catch(event => alert(event.message))
    }

    return (
        <div className="login">
            <Link to="/">
                <img 
                className="login__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type="email" value={email} onChange={event => setEmail(event.target.value)}/> 

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={event => setPassword(event.target.value)}/>

                    <button type="submit" onClick={signIn} className="login__signInButton">Sign-in</button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button onClick={register} className="login__registerButton">Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
