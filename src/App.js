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

import React, { Fragment } from 'react';
import { Route, Switch, BrowserRouter, } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/Home';
import LearnMore from './components/LearnMore';
import GoogleAds from './components/GoogleAds';
import NavBar from './components/NavBar';
import About from './components/About';
import Login from './components/Login';
import ScrollToTop from './components/ScrollToTop';
import AccessibleCustomers from './components/AccessibleCustomers';
import Campaigns from './components/Campaigns';
import CreateCampaign from './components/CreateCampaign';
import KeywordThemes from './components/KeywordThemes';
import WriteSmartAd from './components/WriteSmartAd';
import Location from './components/Location';
import Budget from './components/Budget';
import CreateAccount from './components/CreateAccount';
import EditCampaign from './components/EditCampaign';
import "./App.css"
const App = () => (

  <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
    <NavBar />
    <div className="container mt-4">
      <Fragment>
        <ScrollToTop />
        <Switch>
          <Route exact path= "/" component={Home} />
          <Route path= "/learn-more" component={LearnMore} />
          <Route path= "/googleads" component={GoogleAds} />
          <Route path= "/login" component={Login} />
          <Route path= "/googleads-accounts" component={AccessibleCustomers} />
          <Route path= "/create-google-ads-account" component={CreateAccount} />
          <Route path= "/campaigns" component={Campaigns} />
          <Route path= "/create-campaign" component={CreateCampaign} />
          <Route path= "/write-smart-ad" component={WriteSmartAd} />
          <Route path= "/keyword-themes" component={KeywordThemes} />
          <Route path= "/geo-location" component={Location} />
          <Route path= "/budget" component={Budget} />
          <Route path= "/edit-campaign" component={EditCampaign} />
          <Route path= "/about" component={About} />
        </Switch>
      </Fragment>
    <Footer />
    
    </div>
  </BrowserRouter>
);

export default App;

