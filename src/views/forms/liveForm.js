import React, { Component } from 'react'
import APICall from '../../services/APICall'
import './liveView.css';
import { withRouter } from 'react-router';
import {Spin,message} from 'antd';
import cookie from 'react-cookies';
import FormPreview from './formPreview';


const FormHeader=(props)=>{return <div className="frmHead"><span>{props.name}</span></div>}

class LiveForm extends Component {
    constructor(props){
        super(props);
        this.state={
            loading:true,
            form:{fields:[]},
            activeItemIndex:0
        }
    }
     logKey=(e)=>{
        if(e.code==="Enter"){
            this.submitItem()
        }
      }
    componentDidMount(){
        const log = document.getElementById('root');

        document.addEventListener('keypress', (e)=>this.logKey(e));



        APICall.get('forms/live/'+this.props.match.params.id).then(res=>{
            this.setState({loading:false});
            if(res.data.status){
                this.setState({form:res.data.result})
            }
            else{
                message.error('Invalid form');
            }
        }).catch(err=>{
            this.setState({loading:false});
            message.error('Invalid form');
        })
    }
    submitItem(){
        if(this.state.form.fields.length-1>this.state.activeItemIndex)
        this.setState({activeItemIndex:this.state.activeItemIndex+1})
        else{
            message.loading('submitting form...',0.2)

            APICall.post('forms/submit',{formId:this.state.form._id,fields:this.state.form.fields}).then(res=>{
                if(res.data.status){
                    message.success('FORM SUBMITTED',0.7);
                    this.props.history.push("/");
                }
                else{
                    message.error(res.data.message,0.7)
                }
            }).catch(err=>{
                message.error("Error occured while submitting form",0.7)
            })
        }
    }

    mapItm(val){
        let {activeItemIndex,form}=this.state;
        form.fields[activeItemIndex].fields[0].response=val;
        this.setState({form})
    }
    render() {
       
        return (
            <>
            <Spin spinning={this.state.loading} tip="Loading Form ...
            ">
             <FormHeader name={this.state.form.name} />
             {this.state.form.fields.length>0?<FormPreview takeiput={(val)=>{this.mapItm(val)}} activeFieldView={this.state.form.fields[this.state.activeItemIndex]} activeKey={this.state.activeItemIndex} />:null}
                <div className="keyGuide">
                    {this.state.activeItemIndex===this.state.form.fields.length-1?<span>Press Enter to submit</span>:<span>Press Enter to continue</span>}
                </div>
             </Spin>
            
            </>
        )
    }
}


export default withRouter(LiveForm)