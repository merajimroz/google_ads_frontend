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

import React, { useState } from 'react';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';


const LearnMore = () => {

    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [refreshToken, setRefreshToken, removeRefreshToken] = useCookies(['refreshToken'])

    let history = useHistory()

    // Manage state of component so it shows when user clicks it
    const [showCases, setShowCases] = useState(false)
    const onClick = () => setShowCases(showCases ? false : true)

    // Component that has the list of use cases
    const Cases = () => (
        
        <div className="card">
            <div className="card-body">
            <p className="mb-0" align="left" style={{color:'black', fontSize:'20px'}}>
                    1. Create an online ad <strong>quickly and easily</strong>.
                <br/>
                    2. Pay only when people click your ad.
                <br/>
                    3. <strong>Attract more customers</strong> to your website or Google Maps listing.
                <br/>
                    4. Minimal ongoing management necessary. <strong>Google Ads runs your ads for you</strong>.
                <br/>
                    5. Reach customers on desktop computers and mobile devices (such as mobile phones and tablets).
                <br/>
                    6. Review the effectiveness of your ads in your dashboard.
            </p>
            </div>
        </div>
        
    )

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

    // HOME button
    const goHome = () => {
        history.push('/')  
    }

    return (
        
    <div className="container mt-4">
        <br/>
        
        <h4 className="display-4 text-left mb-4" style={{color:'rgb(19, 57, 120)', fontSize:'40px'}}>
            Why use Google Ads?
        </h4>

        <br/>
        <br/>


        <p className="mb-0" align="left" style={{color:'black', fontSize:'20px'}}>
        Google Ads allows you to take advantage of the benefits of online advertising: show your ads to the<strong style={{color:'rgb(19, 57, 120)'}} > right people, 
        in the right place, and at the right time.</strong>
        <br/>
        <br/>
        <br/>
        When you sign up for a Smart campaign, 
        you’ll write an ad that describes your business. 
        You’ll also choose which keyword themes you want to target your ad 
        and set a budget. Your ad will automatically show to potential customers 
        across Google Search, Google Maps, YouTube, Gmail, and Google partner websites.
        <br/>
        <br/>
        <br/>
        </p>
        
        <button type="button" className="btn btn-link" 
        onClick={onClick} 
        style={{ 
            "textDecoration": "none", 
            color:'black', 
            "font":"gotham-rounded-bold", 
            fontSize:'20px' }}>
                See key benefits   
                <i className="fas fa-chevron-down fa-fw"></i>
        </button>
        { showCases ? <Cases /> : null }
        
        <div className='mt-4' align="center">
            <br></br>
            
            <button type="button" className="btn" style={{margin:'10px', backgroundColor: 'rgb(19, 57, 120)', color: 'white'}}
            onClick={goStart}>START</button>
           
            <button type="button" className="btn" style={{margin:'10px', backgroundColor: 'rgb(19, 57, 120)', color: 'white'}}
            onClick={goHome}>HOME</button>
            
        </div>
        
    </div>
)}

export default LearnMore;