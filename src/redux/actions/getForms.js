import ApiCall from "../../services/APICall";
import Cookies from 'react-cookies';


// function for fetch customers list

export function getForms(data){
    const token=Cookies.load('token');
    const uri=Cookies.load('isAdmin')==="true"?'templates/all':'forms/all';
    return(dispatch)=>{
        return ApiCall.get(uri,token)
        .then(res=>{
            dispatch({type:'getAllForms',payload:{forms:res.data.result}})
        })
        .catch(err=>console.log(err));
    }
    
}