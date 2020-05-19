import ApiCall from "../../services/APICall";
import Cookies from 'react-cookies';
import { message } from 'antd';


// function for fetch customers list


export function updateFormDetails(id){
    const token=Cookies.load('token');
    
    const uri=Cookies.load('isAdmin')==="true"?'templates/all':'forms/all';


    

    return(dispatch)=>{
        return ApiCall.get(uri,token)
        .then(res=>{
            dispatch({type:'getForm',payload:res.data.result})
        })
        .catch(err=>console.log(err));
    }
    
}

export function updateForm(data){
    const token=Cookies.load('token');
    return(dispatch)=>{
        let allform=localStorage.getItem('forms')!==null?JSON.parse(localStorage.getItem('forms')):[];
        let currentForm=Object.assign({},data.form);
        currentForm.fields.push(data.item);
        return ApiCall.post('forms/update',{
            formId:data.form._id,
            fields: currentForm.fields
        },token)
        .then(res=>{
            if(res.data.status)
            {
      
            allform[allform.findIndex(x=>x._id.toString()===currentForm._id.toString())]=currentForm;
            localStorage.setItem("forms",JSON.stringify(allform));
                message.info("Auto saved",0.6);
                dispatch({type:'addItem',payload:currentForm})
            }
            else{
                message.error('Error while adding item!',0.7);
                return;
            }
        })
        .catch(err=>console.log(err));
    }
    
}