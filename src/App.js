import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Search from "./components/search/search";
import Details from "./components/search/details";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Register from "./components/login/register";
import YourProfile from "./components/profile/your-profile";
import OtherProfile from "./components/profile/other-profile";
import Header from './components/header'

function App() {
  return (
    <BrowserRouter>
      <Route path={["/search/:searchQuery", "/search", "/"]}>
        <Header />
      </Route>
      <div className="px-3 mt-4">
        <Route path={["/"]} exact={true}>
          <Home/>
        </Route>
        <Route path={["/search", "/search/:searchQuery"]} exact={true}>
          <Search/>
        </Route>
        <Route path={["/details/:bookId"]} exact={true}>
          <Details/>
        </Route>
        <Route path={["/login"]} exact={true}>
          <Login/>
        </Route>
        <Route path={["/register"]} exact={true}>
          <Register/>
        </Route>
        <Route path={["/profile"]} exact={true}>
          <YourProfile/>
        </Route>
        <Route path={["/profile/:profileId"]} exact={true}>
          <OtherProfile/>
        </Route>
      </div>
      </BrowserRouter>
  );
}

export default App;
