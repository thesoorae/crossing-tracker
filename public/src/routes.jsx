import React from 'react';
import { Route, IndexRoute} from 'react-router';
import App from './components/App.jsx';
import HomePage from './components/home/homePage.jsx';
import TripsPage from './components/trips/tripsPage.jsx';
import UdateTrip from './components/trips/updateTrip.jsx';
import {Sginup} from './components/signup/signupPage.jsx';
import SigninPage from './components/signin/signinPage.jsx';
import CreateTrip from './components/createTrip/createTrip.jsx';
import TripDetails from './components/tripDetails/tripDetails.jsx';
import SuccessPage from './components/success/successPage.jsx';
import AdminHome from './components/admin/homeAdmin.jsx';
export default (
  <Route path="/" component={App}>
    <IndexRoute component={SigninPage} />
    <Route path="trips" component={TripsPage} />
    <Route path="signup" component={Sginup} />
    <Route path="home" component={HomePage} />
    <Route path="createtrip" component={CreateTrip} />
    <Route path="tripdetails/:id" component={TripDetails} />
    <Route path="success" component={SuccessPage} />
    <Route path="adminpage" component={AdminHome} />
    <Route path="updatetrip/:id" component={UdateTrip} />
  </Route>

);
