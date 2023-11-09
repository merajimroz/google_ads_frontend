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

import React, {useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';

const Home = () => {

    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [refreshToken, setRefreshToken, removeRefreshToken] = useCookies(['refreshToken'])
    let history = useHistory()



    // grab query string
    const queryString = window.location.search;

    // parse que query string's parameters
    const urlParams = new URLSearchParams(queryString)

    // get the code that is the access code of user after authenticating and authorizing permission
    const google_access_code = urlParams.get('code')
    console.log(google_access_code)

    // get the state that is the anti-forgery state token
    const state = urlParams.get('state')
    console.log(state)

    // if there is a code in the parameter of the url
    // send it to the backend with the state
    // where they will be used to get the refresh token
    useEffect(() => {
        if(google_access_code) {
            
            // data to send to the backend
            const data = { 'mytoken': token['mytoken'], 'google_access_code': google_access_code, 'passthrough_val': state}

            fetch('http://adflare.allegiantglobal.io:8000/api/get-token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token['mytoken']}`
                },
                body: JSON.stringify(data),
                
            })
            .then(resp => resp.json())
            .then(resp => {
                console.log('response from our backend:'+resp)
                // if user has a refresh token
                if (resp.refresh_token ===1) {
                    console.log('user has a refresh token')
                    setRefreshToken('refreshToken', 'True')
                    // redirect user to the accessible accounts page
                    history.push('/googleads-accounts')
                }
            })
            .catch(error => console.log(error))
            
        }
    }, [token, google_access_code, state, history, setRefreshToken])

    // START button
    const goStart = () => {
        // if there is a refresh token in the cookies,
        // send user to the Accounts page.
        if(refreshToken['refreshToken']) {
            history.push('/googleads-accounts')
        }
        // if no refresh token but yes mytoken,
        // send user to Google Ads page.
        else if(token['mytoken']) {
            history.push('/googleads')
        }
        // if neither, this means user is not logged in yet,
        // so push user to the login or signup page.
        else {
            history.push('/login')
        }  
    }

    // LEARN MORE button
    const goLearnMore = () => {
        history.push('/learn-more')  
    }

    return (
        
    <div className="container mt-4">
        
        <br/>
        <h4 className="display-4 text-center mb-4" font="gotham-rounded-bold" style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            Get in the first page of Google!
        </h4>

        <br/>
        <br/>
        <p className="mb-0" font="gotham-rounded-bold" align="center" style={{color:'black', fontSize:'20px'}}>
        FranAds is a free app that that will <strong style={{color:'rgb(248,172,6)'}} >help you sell more by promoting your business </strong>on Google Search, 
        Google Maps, YouTube, Gmail, and Google partner websites.
        </p>

        <br/>
        <br/>
        
        <div className='mt-4' align="center">
            <br></br>
            
            <button type="button" className="btn btn-primary btn-block" style={{margin:'10px'}}
            onClick={goStart}>START</button>
            
            <button type="button" className="btn btn-outline-primary btn-block" style={{margin:'10px'}}
            onClick={goLearnMore}>LEARN MORE</button>
            
        </div>
        
    </div>
)}

export default Home;