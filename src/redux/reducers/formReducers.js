
import { message } from 'antd';



export const formReducer=(state={tempState:[],loading:true},action)=>{

    switch(action.type){
        case 'create_form':
            let forms=localStorage.getItem('forms')!==null?JSON.parse(localStorage.getItem('forms')):[];
            const activeFormId=forms.length+1;
            forms.push({_id:activeFormId,name:action.payload.name,fields:[]});
            localStorage.setItem('forms',JSON.stringify(forms));
            setTimeout(()=>{
                action.payload.history.push("/form/"+activeFormId)
            },800);
            return Object.assign({},state,{});
            break;
        
        case 'getForm':
            return Object.assign({},state,{form:action.payload});
            break;
        
       {/* case 'getForm': 
            return Object.assign({},state,{form:action.payload});
            break;
        
        */}
        
        case 'addItem':
            
            return Object.assign({},state,{form:action.payload,});
            break;
        
        case 'getAllForms':
            let fms=action.payload.forms;
            localStorage.setItem('forms',JSON.stringify(fms));
            return Object.assign({},state,{all:fms,loading:false})

        
        {/*
        
            case 'getAllForms':
            let tms=action.payload.forms;
            localStorage.setItem('forms',JSON.stringify(tms));
            return Object.assign({},state,{all:tms,loading:false})   

        */}
           
        default:
        return state;
        break;

        
    }
}