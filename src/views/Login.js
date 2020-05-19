import React from "react";
import cookie from 'react-cookies'
import Navbar from "../components/Navbar.js";
import FooterSmall from "../components/FooterSmall.js";
import { withRouter } from "react-router";
import APICall from '../services/APICall';
import {message} from 'antd';
import {setPageTitle} from '../services/utils'
import {LoadingOutlined} from '@ant-design/icons';

import {Link} from 'react-router-dom';

 class Login extends React.Component{
  constructor(props){
    super(props);

    this.state={
      loading:false,
      email:"",
      password:""
    }
  }

  componentDidMount(){
    setPageTitle("FormBux | Login Page")
  }


  submitLogin(){
    // alert("all
    this.setState({loading:true})
    APICall.post('login',{email:this.state.email,password:this.state.password}).then(res=>{
      this.setState({loading:false});
      if(res.data.status){
        let {name,email,_id}=res.data.user;
        cookie.save('user',{name,email,_id});
        cookie.save('token',res.data.token)
        this.props.history.push("/form");
      }
      else{
        message.error(res.data.message)
      }
    }).catch(err=>{
      this.setState({loading:false});
      message.error("Sign in failed!")
    })
    // this.props.history.push("/form")
  }

 render(){
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full bg-gray-900"
            style={{
              backgroundImage:
                "url(" + require("../assets/img/register_bg_2.png") + ")",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat"
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    {/* <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-sm font-bold">
                        Sign in with
                      </h6>
                    </div>
                    <div className="btn-wrapper text-center">
                      <button
                        className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        <img
                          alt="..."
                          className="w-5 mr-1"
                          src={require("../assets/img/github.svg")}
                        />
                        Github
                      </button>
                      <button
                        className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        <img
                          alt="..."
                          className="w-5 mr-1"
                          src={require("../assets/img/google.svg")}
                        />
                        Google
                      </button>
                    </div> */}
                    <span style={{display:'block',textAlign:'center',fontWeight:'500'}}>Please login to continue</span>
                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    {/* <div className="text-gray-500 text-center mb-3 font-bold">
                      <small>Or sign in with credentials</small>
                    </div> */}
                    <form onSubmit={(e)=>{e.preventDefault();this.submitLogin()}}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                        disabled={this.state.loading}
                        required
                          onChange={(e)=>{this.setState({email:e.target.value})}}
                          type="email"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                          placeholder="Email"
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          onChange={(e)=>{this.setState({password:e.target.value})}}
                          required
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                          placeholder="Password"
                          disabled={this.state.loading}
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox text-gray-800 ml-1 w-5 h-5"
                            style={{ transition: "all .15s ease" }}
                          />
                          <span className="ml-2 text-sm font-semibold text-gray-700">
                            Remember me
                          </span>
                        </label>
                      </div>

                      <div className="text-center mt-6">
                        <button
                        disabled={this.state.loading}
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: "all .15s ease" }}
                          
                        >
                          {this.state.loading?<LoadingOutlined />:"Sign In"}
                        </button>
                      </div><br />

<span className="ml-2 text-sm font-semibold text-gray-700">
New user?
                          </span>
                      <Link to="/signup">&nbsp;Create an account  </Link>
                    </form>


                  </div>
                </div>
                <div className="flex flex-wrap mt-6">
                  <div className="w-1/2">
                    <a
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      className="text-gray-300"
                    >
                      <small>Forgot password?</small>
                    </a>
                  </div>
                  <div className="w-1/2 text-right">
                    <a
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      className="text-gray-300"
                    >
                      <small>Create new account</small>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
 }
}

export default withRouter(Login);