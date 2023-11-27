// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, {useState, useEffect} from 'react';
import APIService from '../APIService';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useCookies(['mytoken'])
    const [refreshToken, setRefreshToken] = useCookies(['refreshToken'])
    const [isLogin, setLogin] = useState(true)
    let history = useHistory()

    // if user has token, redirect user to googleads page
    useEffect (() => {
        if(token['mytoken']) {
            history.push('/googleads')
        }
    }, [token, history])
    
    const loginBtn = () => {
        APIService.LoginUser({username, password})
        .then(resp =>{
            console.log(resp)
            
            setToken('mytoken', resp.access)
            setRefreshToken('refreshToken', resp.refresh )
        
        })
        .catch(error => console.log(error))

    }

    const registerBtn = () => {
        APIService.RegisterUser({username, password})
        .then(() => loginBtn())
        .catch(error => console.log(error))
    }


    return (
        <div>
            <br/>
            {isLogin ? <h4 className="display-4 text-left mb-4"  style={{color:'rgb(19, 57, 120)', fontSize:'40px'}}>Login to your account</h4> 
            : <h4 className="display-4 text-left mb-4"  style={{color:'rgb(19, 57, 120)', fontSize:'40px'}}>Create your account</h4>}

            <div className="mb-3">

                <label htmlFor="username" className= "form-label" >Username</label>
                <input type="text" className="form-control" id="username" placeholder="Please Enter Username" 
                value={username} onChange= {e => setUsername(e.target.value)} />
            </div>

            <div className="mb-3">

                <label htmlFor="password" className= "form-label" >Password</label>
                <input type="password" className="form-control" id="password" placeholder="Please Enter Password" 
                value={password} onChange= {e => setPassword(e.target.value)}/>
            </div>

            {isLogin ? <button onClick={loginBtn} className="btn" style={{backgroundColor: 'rgb(19, 57, 120)', color: 'white'}}>Login</button>
            : <button onClick={registerBtn} className="btn" style={{backgroundColor: 'rgb(19, 57, 120)', color: 'white'}}>Signup</button>}

            <div className="mb-3">
                <br/>
                {isLogin ? <p >Don't have an account? <button className="btn" onClick={() => setLogin(false)} style={{backgroundColor: 'rgb(19, 57, 120)', color: 'white'}}>Signup here</button></p>
                : <p >If You Have An Account, Please <button className="btn" onClick={() => setLogin(true)} style={{backgroundColor: 'rgb(19, 57, 120)', color: 'white'}}>Login here</button> </p>
                }
            </div>

        </div>
    )
}

export default Login