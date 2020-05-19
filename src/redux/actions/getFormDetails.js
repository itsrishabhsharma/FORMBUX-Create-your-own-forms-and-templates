import ApiCall from "../../services/APICall";
import Cookies from 'react-cookies';


// function for fetch customers list

export function getFormDetails(id){
    const token=Cookies.load('token');
    
    const uri=Cookies.load('isAdmin')==="true"?'templates/'+id:'forms/'+id;


    

    return(dispatch)=>{
        return ApiCall.get(uri,token)
        .then(res=>{
            dispatch({type:'getForm',payload:res.data.result})
        })
        .catch(err=>console.log(err));
    }
    
}   