import { Button } from '@material-ui/core'
import React from 'react'
import "./Login.css"
import { auth, provider } from './firebase'
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {
    const [{ user }, dispatch] = useStateValue();
    const signIn = () => {
        auth.signInWithPopup(provider).then(result => {
            console.log(result);
            dispatch({ type: "SET_USER", user: result.user });
        }).catch(err => {
            alert(err.message);
        })
    }
    console.log(user);
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://cdn.mos.cms.futurecdn.net/SD" alt="" />
                <h1>Signin to Slack</h1>
                <p>slack.com</p>
                <Button onClick={signIn}>Sign in with Google</Button>
            </div>
        </div>
    )
}

export default Login
