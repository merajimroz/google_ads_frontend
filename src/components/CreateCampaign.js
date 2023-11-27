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

import React, {useState, useEffect, Fragment} from 'react'
import {useCookies} from 'react-cookie'
import {useHistory} from 'react-router-dom'
import Message from './Message'
import MessageError from './MessageErrorNoClose'
import ProgressionTracker from './ProgressionTracker'


// this is step 1 from a 5-step process
const CreateCampaign = () => {

    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [refreshToken, setRefreshToken, removeRefreshToken] = useCookies(['refreshToken'])
    let history = useHistory()

    // to store the Google My Business info in case user has GMB
    const [accountInfo, setAccountInfo] = useState([])

    // fields to be completed by user
    const [goal, setGoal] = useState("sales_signups")
    const [businessName, setBusinessName] = useState("")
    const [businessLocationId, setBusinessLocationId] = useState("")
    const [landingPage, setLandingPage] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [countryCode, setCountryCode] = useState("US")
    const [languageCode, setLanguageCode] = useState("en")

    // cookies from step 1
    const [country_code, setCountry_code, removeCountry_code] = useCookies(['country_code', "US"])
    const [business_name, setBusiness_name, removeBusiness_name] = useCookies(['business_name'])
    const [business_location_id, setBusiness_location_id, removeBusiness_location_id] = useCookies(['business_location_id'])
    const [landing_page, setLanding_page, removeLanding_page] = useCookies(['landing_page'])
    const [phone_number, setPhone_number, removePhone_number] = useCookies(['phone_number'])
    const [language_code, setLanguage_code, removeLanguage_code] = useCookies(['language_code'])
    
    const [messageError, setMessageError] = useState('')
    const [message, setMessage] = useState('')


    // if there is no mytoken in the cookie, redirect user to the home page (denying access)
    useEffect(() => {
        if(!token['mytoken']) {
            // history.push('/')
            window.location.href = '/'
        }
    }, [token])

    // if there is a refresh token in the cookies
    // send it to the backend with the mytoken
    // and get information of the Google My Business
    useEffect(() => {
        if(refreshToken['refreshToken']) {

            // tell user you are fetching their data
            setMessage(' Fetching your data... It can take a few seconds.')
            console.log('trying to get GMB data...')
            
            // data to send to the backend
            const data = { 
                'mytoken': token['mytoken']
            }

            fetch(`${window.env.API_URL}/api/get-business-info/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token['mytoken']}`
                },
                body: JSON.stringify(data),
                
            })
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp)
                setAccountInfo(resp)
                setBusinessLocationId(resp[0].business_location_id)
                setMessage('')
                })
            .catch(error => {
                console.log(error)
                setMessage('')
                })
            
              
        }
    }, [token, refreshToken])

    // set advertising goal
    const onChangeGoal = (e) => {setGoal(e.target.value)}

    // set business name
    const onChangeBusName = (e) => {
        // removeBusiness_name(['business_name']);
        // if accountInfo.business_name exists, remove it
        console.log('changing bus name')
        if(accountInfo && accountInfo.length > 0 && accountInfo[0].business_name) {
            console.log('inside if(accountInfo.length > 0 && accountInfo[0].business_name) statement')
            const itemToRemove = accountInfo[0].business_name
            console.log('itemToRemove')
            console.log(itemToRemove)
            const newArray = accountInfo.filter(el => el.business_name !== itemToRemove)
            console.log('newArray')
            console.log(newArray)
            setAccountInfo(newArray)
            console.log('accountInfo')
            console.log(accountInfo)
        }
        setBusinessName(e.target.value)}

    // set business name
    const onChangeLanding = (e) => {
        removeLanding_page(['landing_page']);
        // if accountInfo.final_url exists, remove it
        if(accountInfo.length > 0) {
            console.log('inside if(accountInfo.length > 0) statement')
            const itemToRemove = accountInfo[0].final_url
            console.log('itemToRemove')
            console.log(itemToRemove)
            const newArray = accountInfo.filter(el => el.final_url !== itemToRemove)
            console.log('newArray')
            console.log(newArray)
            setAccountInfo(newArray)
            console.log('accountInfo')
            console.log(accountInfo)
        }
        setLandingPage(e.target.value)}

    // set phone number
    const onChangePhoneNumber = (e) => {
        removePhone_number(['phone_number']);
        // if accountInfo.phone_number exists, remove it
        if(accountInfo && accountInfo.length > 0) {
            console.log('inside if statement')
            const itemToRemove = accountInfo[0].phone_number
            console.log('itemToRemove')
            console.log(itemToRemove)
            const newArray = accountInfo.filter(el => el.phone_number !== itemToRemove)
            console.log('newArray')
            console.log(newArray)
            setAccountInfo(newArray)
            console.log('accountInfo')
            console.log(accountInfo)
        }
        setPhoneNumber(e.target.value)}

    // set country code for phone number
    const onChangeCountryCode = (e) => {
        removeCountry_code(['country_code']);
        setCountryCode(e.target.value)}

    // set language code
    const onChangeLanguageCode = (e) => {
        removeLanguage_code(['language_code']);
        setLanguageCode(e.target.value)}

    // if there are field values saved as cookies, populate fields with those values
    // or if the user has GMB and we get their Business Profile info, use those values
    useEffect(() => {
        if(business_name['business_name']) {
            
            setBusinessName(business_name['business_name'])
        } 
        else if(accountInfo && accountInfo.length > 0) {
            if(accountInfo[0].business_name) {
                setBusinessName(accountInfo[0].business_name)
            }
            
            
        }
    }, [business_name, accountInfo]) 

    useEffect(() => {
        if(landing_page['landing_page']) {
            
            setLandingPage(landing_page['landing_page'])
        }
        else if(accountInfo.length > 0) {
            
            setLandingPage(accountInfo[0].final_url)
        }
    }, [landing_page, accountInfo])

    useEffect(() => {
        if(phone_number['phone_number']) {
            
            setPhoneNumber(phone_number['phone_number'])
        }
        else if(accountInfo.length > 0) {
            
            setPhoneNumber(accountInfo[0].phone_number)
        }
    }, [phone_number, accountInfo])

    useEffect(() => {
        if(country_code['country_code']) {
            
            setCountryCode(country_code['country_code'])
        }
    }, [country_code])

    useEffect(() => {
        if(language_code['language_code']) {
            
            setLanguageCode(language_code['language_code'])
        }
    }, [language_code])

    // when user clicks on 'Next' button
    const goStep2 = () => {
        if (
            // if required fields are completed
            // or there are cookies of the fields
            // send user to the next step
            // if not, error message
            ((businessName.length !== 0) && (landingPage.length !== 0) && (phoneNumber.length !== 0)) || 
            ((business_name['business_name']) && 
            (landing_page['landing_page']) && 
            (phone_number['phone_number']))) 
               
                {
                    // save values as cookies to use later and send user to step 2
                    setLanguage_code("language_code", languageCode, { encode: String});
                    setBusiness_name("business_name", businessName, { encode: String});
                    setBusiness_location_id("business_location_id", businessLocationId);
                    setLanding_page("landing_page", landingPage, { encode: String});
                    setCountry_code("country_code", countryCode);
                    setPhone_number("phone_number", phoneNumber);
                    history.push('/geo-location');
                } else {setMessageError('You need to fill out all fields to continue.');}
        }

    // when user clicks on 'Back' button
    const goPreviousStep = () => {
        history.push('/campaigns')}
    


    return (
        
    <div className="container mt-4" font="gotham-rounded-bold">
        
        <br/>
        <h4 className="display-4 text-left mb-4" font="gotham-rounded-bold" 
        style={{color:'rgb(19, 57, 120)', fontSize:'40px'}}>
            Create New Campaign
        </h4> 

        <br/>

        <ProgressionTracker step="step1" />
        
        <br/>
        <br/>

        <button type="button" className="btn btn-link" name="go back" 
        onClick={goPreviousStep} 
        style={{ color: 'black' }}>
            <i className="fas fa-arrow-left fa-2x"></i>
        </button>
        <br/>
        <br/>

        <h6 className="display-4 text-left mb-4" font="gotham-rounded-bold" 
        style={{color:'rgb(19, 57, 120)', fontSize:'20px'}}>
            1. General Information
        </h6>
        {message ? 
        <Fragment>
        <Message msg={message} />
        <br/>
        </Fragment>
         : null}

        {/* all fields in this section will be pre-populated 
        if user already filled them in another section
        and didn't remove all cookies, or user has GMB profile */}
        <label>What do you want to accomplish from this Google ad?</label>
        <br/>
        <br/>
        <div className="list-group" role="group">
            <label className="list-group-item list-group-item-action" style={{ cursor: 'pointer', 
            color: (goal === 'calls') && 'rgb(30,136,229)'}}>
                <input className="form-check-input me-1" type="radio" value="calls" 
                onChange={onChangeGoal} 
                checked={ goal === "calls"}/>
                Get more calls
            </label>
            <label className="list-group-item list-group-item-action" style={{ cursor: 'pointer', 
            color: (goal === 'sales_signups') && 'rgb(30,136,229)'}}>
                <input className="form-check-input me-1" type="radio" value="sales_signups" 
                onChange={onChangeGoal} 
                checked={ goal === "sales_signups"}/>
                Get more website sales or sign-ups
            </label>
            <label className="list-group-item list-group-item-action" style={{ cursor: 'pointer', 
            color: (goal === 'offline_sales') && 'rgb(30,136,229)'}}>
                <input className="form-check-input me-1" type="radio" value="offline_sales" 
                onChange={onChangeGoal} 
                checked={ goal === "offline_sales"}/>
                Get more visits to your physical location
            </label>
        </div>
        <small className="form-text text-muted">
            If you have more than one goal, create separate campaigns for each one of them.
        </small>
        <br/>
        <br/>
        <br/>

        <label>Enter name of your business</label>
        <br/>
        <br/>
        <textarea className="form-control" placeholder="Enter name of your business..." 
        id="business_name" rows="1" maxLength="1000"
        onChange={onChangeBusName} 
        value={accountInfo && accountInfo.length > 0 ? accountInfo[0].business_name : businessName}></textarea>
        <small className="form-text text-muted">
            This helps Google show your ad when people search for your business by name.
        </small>
        <br/>
        <br/>
        <br/>

        <label>Tell us where people go after they click your ad</label>
        <br/>
        <br/>
        {accountInfo && accountInfo.length > 0 ? 
        <textarea className="form-control" placeholder="https://www.example.com" id="landing_page_url" rows="1" maxLength="1000"
        onChange={onChangeLanding} 
        value={accountInfo[0].final_url ? accountInfo[0].final_url : landingPage}></textarea> :
        <textarea className="form-control" placeholder="https://www.example.com" id="landing_page_url" rows="1" maxLength="1000"
        onChange={onChangeLanding} 
        value={landing_page ? landing_page['landing_page'] : landingPage}></textarea>
        }
        <small className="form-text text-muted">
            This might be your homepage, or a more specific page. 
            Copy the page address (URL) and paste it here 
            to make sure there are no mistakes.
        </small>
        <br/>
        <br/>
        <br/>

        <label>Select language of your ad</label>
        <br/>
        <br/>
            <select className="form-select form-select" onChange={onChangeLanguageCode} 
            value={language_code ? language_code['language_code'] : languageCode} aria-label="Choose language for your ad">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="pt">Portuguese</option>
            </select>
        <br/>
        <br/>
        <br/>

        <label>Enter your business phone number</label>
            <br/>
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <label>Select country of your phone number</label>
                        <select className="form-select form-select" onChange={onChangeCountryCode} 
                        value={country_code ? country_code['country_code'] : countryCode} aria-label="Choose country code for phone number">
                            <option value="US">United States</option>
                            <option value="AR">Argentina</option>
                            <option value="BR">Brazil</option>
                        </select>
                    </div>
                    <div className="col">
                        <label>Enter phone number for your business</label>
                        {accountInfo && accountInfo.length > 0 ? 
                        <textarea className="form-control" placeholder="Enter phone number..." 
                        id="phone_number" rows="1" maxLength="100"
                        onChange={onChangePhoneNumber} 
                        value={accountInfo[0].phone_number ? accountInfo[0].phone_number : phoneNumber}></textarea> :
                        <textarea className="form-control" placeholder="Enter phone number..." 
                            id="phone_number" rows="1" maxLength="100"
                            onChange={onChangePhoneNumber} 
                            value={phone_number ? phone_number['phone_number'] : phoneNumber}></textarea>
                            }
                    </div>
                </div>
            </div>
            <br/>
            <br/>

        {messageError ? <MessageError msg={messageError} /> : null}
        <div className="container" align="left">
            
            <div className="row">
                    <div className="col">

                        <button type="button" onClick={goPreviousStep} 
                        className="btn" 
                        style={{margin:'10px', backgroundColor: 'rgb(19, 57, 120)', color: 'white'}}>Back
                        </button>
                
                    </div>

                    <div className="col" align="right">

                        <button type="button" onClick={goStep2} 
                        className="btn"  
                        style={{margin:'10px', backgroundColor: 'rgb(19, 57, 120)', color: 'white'}}>
                            Next
                        </button>
                
                    </div>
            </div>
        </div>
        <br/>
        <br/>
        
        <br/>
        
    </div>
)}

export default CreateCampaign;