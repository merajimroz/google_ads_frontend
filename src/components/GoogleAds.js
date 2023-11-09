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
import {useCookies} from 'react-cookie';
import {useHistory, Link} from 'react-router-dom';

const GoogleAds = () => {

    const [Url, setUrl] = useState('')
    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [refreshToken, setRefreshToken, removeRefreshToken] = useCookies(['refreshToken'])
    const [customerId, setCustomerId, removeCustomerID] = useCookies(['customer_id'])
    let history = useHistory()


    // if there is no mytoken in the cookie, redirect user to the login page (denying access)
    useEffect(() => {
        if(!token['mytoken']) {
            // history.push('/')
            window.location.href = '/'
        }
    }, [token])

    // check to see if user has a refresh token for Google
    // and if so, save it as a cookie
    // and redirect user to the '/googleads-accounts' page
    useEffect(() => {
        if(!refreshToken['refreshToken']) {
            const data = { 'mytoken': token['mytoken']}

            fetch('http://adflare.allegiantglobal.io:8000/api/lookup-refreshtoken/', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mytoken']}`
            },
            body: JSON.stringify(data),
        })
        .then(resp => resp.json())
        .then(resp => {
            console.log('response from our backend:'+resp)
            // if user does not have a refresh token but has a Google Ads account
            if (resp.refresh_token === 0 && resp.customer_id !==0) {
                console.log('user has an Ads account but no refresh token')
                // save the Google Ads account ID as a cookie
                console.log('Google Ads ID:'+resp.customer_id)
                setCustomerId('customerID', resp.customer_id, { encode: String})
                // redirect user to the Reporting page
                history.push('/campaigns')
            }
            // if user has a refresh token
            else if (resp.refresh_token ===1) {
                console.log('user has a refresh token')
                setRefreshToken('refreshToken', 'True')
                // redirect user to the accessible accounts page
                history.push('/googleads-accounts')
            }
            else if (resp.refresh_token === 0 && resp.customer_id === 0) {
                console.log('New user that does not have refresh token or Google Ads account')
            }
           
        })
        .catch(error => console.log(error))   
        }
    }, [refreshToken, token, history, setRefreshToken, setCustomerId])


    // if user has a refresh token saved as a cookie,
    // redirect user to the Accounts page
    useEffect(() => {
        if(refreshToken['refreshToken']) {
            history.push('/googleads-accounts')

        }
    }, [refreshToken, history])


    // when user clicks the 'Sign in with Google' button
    const authenticateGoogle = () => {
        fetch('http://adflare.allegiantglobal.io:8000:8000/api/connect/', {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mytoken']}`
            }
        })
        .then(function(response) {    
            return response.text();
        })
        .then(function(text) {
            console.log(text);
            setUrl(text);
        })
    .   catch(error => console.log(error))

    }

    // if Url has a value, redirect user to that url
    // that is the url where the user will authenticate in Google and authorize your app
    useEffect(() => {
        if(Url) {
           
            window.location.href = Url;
        }
    }, [Url])

    // create new Google Ads account (client, not manager)
    const createAccount = () => {
        history.push('/create-google-ads-account')
    }



    return (
        
    <div className="container mt-4" font="gotham-rounded-bold">
        
        <h4 className="display-4 text-left mb-4" font="gotham-rounded-bold" style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            Welcome to Google Ads!
        </h4>

        <br/>
        <br/>

        {/* If user already has a Google Ads account */}
        <div className="row">
            <div className="col-sm-6">
                <div className="card" style={{width: '18rem'}} >
                    <img className="card-img-top" src="connect-to-google-ads.jpeg" 
                    alt="Already have Google Ads account?" 
                    style={{borderBottom: '1px solid gray'}}/>
                    <div className="card-body bg-light">
                        <h5 className="card-title">Connect to Google Ads</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Already have an account?</h6>
                        <br/>
                        <p className="card-text">
                            Connect your account and  
                            manage it from our app!  
                            
                        </p>
                        <p className="card-text">
                            You can disconnect your account anytime you want.
                        </p>
                        <br/>
                        <button onClick={authenticateGoogle} className="btn btn-outline-light">
                            <img src="btn_google_signin_dark_normal_web.png" alt="Sign in with Google" height="auto" />
                        </button>
                    </div>
                </div> 
            </div>

            {/* If user does not have a Google Ads account */}
            <div className="col-sm-6">
                <div className="card" style={{width: '18rem'}} >
                    <img className="card-img-top" src="google-ads-logo.png" 
                    alt="Need to create a Google Ads account?" 
                    style={{borderBottom: '1px solid gray'}} />
                    <div className="card-body bg-light">
                        <h5 className="card-title">Create a Google Ads account</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Don't have an account?</h6>
                        <br/>
                        <p className="card-text">
                            Don't worry! We can create one for you.
                        </p>
                        <br/>
                        <br/>
                        <button onClick={createAccount} className="btn btn-success">CREATE</button>
                    </div>
                </div>
            </div>
        </div>

        {Url && <p>Redirecting you to {Url}</p>}

        <br/>
        <br/>
        
    </div>
)}

export default GoogleAds;