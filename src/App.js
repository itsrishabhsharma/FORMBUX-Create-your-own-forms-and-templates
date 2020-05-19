import React,{Suspense} from 'react';
import './App.css';
// import {  } from "react-router";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,useLocation, Redirect
} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";
import 'antd/dist/antd.css';
import cookie from 'react-cookies';

const Landing = React.lazy(()=>import("./views/Lading"));
const Login =React.lazy(()=>import("./views/Login"));
const Signup =React.lazy(()=>import("./views/Signup"));
const FormBase= React.lazy(()=>import('./views/FormsBase'));
const LiveForm= React.lazy(()=>import('./views/forms/liveForm'))
const Container= React.lazy(()=>import('./views/forms/extracted/container.js'));
const ADLogin =React.lazy(()=>import("./admin/Login"));

const ADFormBase= React.lazy(()=>import('./admin/FormsBase'));
const ADLiveForm= React.lazy(()=>import('./admin/forms/liveForm'))



function App() {
  return (
    <Router>
            <Switch>
              <Route path="*" exact>
                <AnimatedRoutes/>
              </Route>
              {/* <Route path="/forms/:name"  component={FormBase} /> */}
              {/* <Redirect from="/" to="/landing" /> */}
            </Switch>
       
 
  </Router>
  );
}

const AuthenRoute=(props)=>{
 return cookie.load('token')?<Route {...props} />:<Redirect to="/login"/>
}

function AnimatedRoutes(){
  let location = useLocation();

  return(
    // <TransitionGroup>
    //       {/*
    //         This is no different than other usage of
    //         <CSSTransition>, just make sure to pass
    //         `location` to `Switch` so it can match
    //         the old location as it animates out.
    //       */}
    //       <CSSTransition
    //         key={location.key}
    //         classNames="fade"
    //         timeout={350}
    //       >
            <Suspense fallback={<div className="loadScreen"><img src={require('./assets/img/loader.gif')} /></div>}>
               <Switch >
              <Route path="/" exact component={Landing} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={Signup} />

              <AuthenRoute path="/form" exact component={FormBase} />
              <AuthenRoute path="/form/:id" exact component={FormBase} />
              <Route path="/view/:id" exact component={LiveForm}/>
              <Route path="/v2/:id" exact component={Container} />
              <Route path="/fb-admin/login" exact component={ADLogin} />

              <Route path="/fb-admin/form" exact component={ADFormBase} />
              <Route path="/fb-admin/form/:id" exact component={ADFormBase} />


              {/* <Route path="/forms/:name"  component={FormBase} /> */}
              {/* <Redirect from="/" to="/landing" /> */}
            </Switch>
            </Suspense>
           
    //       </CSSTransition>
    // </TransitionGroup>
  );
}

export default App;
