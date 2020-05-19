import React, { Component } from 'react'
import {Input,Select, InputNumber} from 'antd';
import {countries} from './items';
import Rating from 'react-rating';
import './formPreview.css'
const {Option}=Select;
export default class FormPreview extends Component {
    constructor(props){
        super(props);
        this.state={
            activeFieldView:{},
            activeKey:-1,
            activeMCQ:"",
            ccode:0
        }
    }

    static getDerivedStateFromProps(props,state){
        if(props.activeKey!==state.activeKey)
        return {
            activeFieldView:props.activeFieldView,
            activeKey:props.activeKey
        }
        return null;
    }



    render() {
        let {activeFieldView,activeKey,ccode}=this.state;
        const takeiput=(inp)=>this.props.takeiput?this.props.takeiput(inp):()=>{};
        return (
            <div className={activeKey!==-1?activeFieldView.type==="long_text"?"formPrvWL animated fadeIn":"formPrvW animated fadeIn":"formPrvW"}>
                {  
     activeFieldView.type==="short_text" || activeFieldView.type==="long_text"?
                <div className={"frmPvwItem"}>
                    {activeFieldView.fields[0].value?<span className="prvwItemTitle">{activeKey+1+". "+activeFieldView.fields[0].value}</span>:<span className="prvwItemTitle">{this.state.activeKey+1+". "+"..."}</span>}
                    <br/><Input placeholder="Type your answer here..." onChange={(e)=>{takeiput(e.target.value)}} autoFocus className="prvwItemField" />
                </div>:
   activeFieldView.type==="welcome_screen" || activeFieldView.type==="thank_you_screen"?<div className="frmPvwItem">
            <img src={activeFieldView.fields[1].value.length===0?require("../../assets/img/imageDefault.jpg"):activeFieldView.fields[1].value} className="imageFromPreview"  />
            {activeFieldView.fields[0].value?
                <span className="prvwItemTitle" style={{textAlign:'center',display:'block'}}>{activeFieldView.fields[0].value}</span>:<span className="prvwItemTitle" style={{textAlign:'center',display:'block'}}>
                {"..."}</span>}
        </div>:
        activeFieldView.type==="statement"?
        <div className="frmPvwItem">
        {activeFieldView.fields[0].value?<span className="prvwItemTitle">{activeFieldView.fields[0].value}</span>:<span className="prvwItemTitle">{"..."}</span>}
    </div>:
    activeFieldView.type==="mcq"?<div className="frmPvwItem">
        {activeFieldView.fields[0].value?<span className="prvwItemTitle">{activeKey+1+". "+activeFieldView.fields[0].value}</span>:<span className="prvwItemTitle">{this.state.activeKey+1+". "+"..."}</span>}
            {activeFieldView.fields[1].options?<ol type="A" className="previewOpts">{activeFieldView.fields[1].options.map((opt,key)=>{
                return opt.name.length>0?
             <li style={this.state.activeMCQ===opt.name?{color:'#f21070',borderColor:'#f21070'}:null} onClick={()=>{takeiput(opt.name);this.setState({activeMCQ:opt.name})}} key={key}>{opt.name}</li>:null
        })}</ol>:null}
    </div>:
     activeFieldView.type==="number"?
     <div className="frmPvwItem">
        {activeFieldView.fields[0].value?<span className="prvwItemTitle">{this.state.activeKey+1+". "+activeFieldView.fields[0].value}</span>:<span className="prvwItemTitle">{this.state.activeKey+1+"..."}</span>}
        <div className="prvWCode">
            <select style={{width:'98px'}} onChange={(e)=>this.setState({ccode:e.target.value})} placeholder="+91">{
            countries.countries.map(itm=>{
            return <option value={itm.code}>{itm.code}</option>
            })
          }</select>
          <input className="inp" autoFocus type="number" maxLength={10} onChange={(e)=>{e.target.value.length<=10?takeiput(ccode+e.target.value):console.log("")}} /></div>
    </div>
     : activeFieldView.type==="email"?
     <div className="frmPvwItem">
     {activeFieldView.fields[0].value?<span className="prvwItemTitle">{this.state.activeKey+1+". "+activeFieldView.fields[0].value}</span>:<span className="prvwItemTitle">{this.state.activeKey+1+"..."}</span>}<br/>
     <input placeholder="youremail@example.com" autoFocus className="inp" onChange={(e)=>{takeiput(e.target.value)}} style={{fontSize:'1.7em',width:'30vw'}} type="email" />
     </div>:
       activeFieldView.type==="yesno"?<div className="frmPvwItem">
       {activeFieldView.fields[0].value?<span className="prvwItemTitle">{activeKey+1+". "+activeFieldView.fields[0].value}</span>:<span className="prvwItemTitle">{this.state.activeKey+1+". "+"..."}</span>}
           {activeFieldView.fields[1].options?<ol type="A" className="previewOpts">{activeFieldView.fields[1].options.map((opt,key)=>{
               return opt.name.length>0?
            <li style={this.state.activeMCQ===opt.name?{color:'#f21070',borderColor:'#f21070',width:'6em'}:{width:'6em'}} onClick={()=>{takeiput(opt.name);this.setState({activeMCQ:opt.name})}} key={key}>{opt.name}</li>:null
       })}</ol>:null}
   </div>:
   activeFieldView.type==="opinion"?<div className="frmPvwItem">
   {activeFieldView.fields[0].value?<span className="prvwItemTitle">{activeKey+1+". "+activeFieldView.fields[0].value}</span>:<span className="prvwItemTitle">{this.state.activeKey+1+". "+"..."}</span>}
   <br/>    
   <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'39vw'}}>{[1,2,3,4,5,6,7,8,9,10].map((num,key)=><span className="opinionS" key={key}>{num}</span>)}</div>
</div>:
activeFieldView.type==="rating"?<div className="frmPvwItem">
   {activeFieldView.fields[0].value?<span className="prvwItemTitle">{activeKey+1+". "+activeFieldView.fields[0].value}</span>:<span className="prvwItemTitle">{this.state.activeKey+1+". "+"..."}</span>}
   <br/>    
   <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'39vw',marginLeft:'25px'}}>
       <Rating  />
   </div>
</div>
:
activeFieldView.type==="dropdown"?<div className="frmPvwItem">
   {activeFieldView.fields[0].value?<span className="prvwItemTitle">{activeKey+1+". "+activeFieldView.fields[0].value}</span>:<span className="prvwItemTitle">{this.state.activeKey+1+". "+"..."}</span>}
   <br/>    
   <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'39vw',marginLeft:'25px'}}>
   {activeFieldView.fields[1].options?<Select onChange={(val)=>{takeiput(val);}} className="previewOpts">{activeFieldView.fields[1].options.map((opt,key)=>{
    return opt.name.length>0?
 <Option style={this.state.activeMCQ===opt.name?{color:'#f21070',borderColor:'#f21070'}:null} value={opt.name} key={key}>{opt.name}</Option>:null
})}</Select>:null}
   </div>
</div>
:
activeFieldView.type==="numbers"?<div className="frmPvwItem">
   {activeFieldView.fields[0].value?<span className="prvwItemTitle">{activeKey+1+". "+activeFieldView.fields[0].value}</span>:<span className="prvwItemTitle">{this.state.activeKey+1+". "+"..."}</span>}
   <br/>    
   <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'39vw',marginLeft:'25px'}}>
       <input type="number" placeholder="Type your answer here" autoFocus className="inp" onChange={(e)=>{takeiput(e.target.value)}} style={{fontSize:'1.7em',width:'30vw'}}  />
   </div>
</div>:
activeFieldView.type==="payment"?<div className="frmPvwItem">
   {activeFieldView.fields[0].value?<span className="prvwItemTitle">{activeKey+1+". "+activeFieldView.fields[0].value}</span>:<span className="prvwItemTitle">{this.state.activeKey+1+". "+"..."}</span>}
   <br/>    
   <p>
    Your credit card will be charged: $ 1.00 <br/>
    We never store your card number or CVC number<br/><br/>
    <span style={{    color: 'deeppink',fontSize: '15px'}}>Secured by <b>stripe</b></span>
    </p>
   <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',width:'39vw',marginTop:'5px'}}>
   <div className="cardimg"><img src={require('../../assets/img/paycard.png')} style={{width:'160px'}} /></div>
    <div className="payWrapper">
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width: '30vw'}}>
            <input type="number" placeholder="Number"  autoFocus className="inp" onChange={(e)=>{takeiput(e.target.value)}} style={{fontSize:'1.7em',width:'15vw',backgroundColor:'transparent'}} />
            <input type="number" placeholder="MM" maxLength="2" className="inp" style={{fontSize:'1.7em',width:'3vw',backgroundColor:'transparent'}} />
            <input type="number" placeholder="YYYY" maxLength="3" className="inp" style={{fontSize:'1.7em',width:'4vw',backgroundColor:'transparent'}} />
            <input type="number" placeholder="CVV" maxLength="3" className="inp" style={{fontSize:'1.7em',width:'3.5vw',backgroundColor:'transparent'}} />
        </div> 
        <div>
            <input type="text" placeholder="Name on card"  className="inp" onChange={(e)=>{takeiput(e.target.value)}} style={{fontSize:'1.7em',width:'30vw',backgroundColor:'transparent',marginTop:'1.5em'}} />
        </div>
    </div>
   </div>
</div>:
activeFieldView.type==="website"?<div className="frmPvwItem">
   {activeFieldView.fields[0].value?<span className="prvwItemTitle">{activeKey+1+". "+activeFieldView.fields[0].value}</span>:<span className="prvwItemTitle">{this.state.activeKey+1+". "+"..."}</span>}
   <br/>    
   <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'39vw',marginLeft:'25px'}}>
       <input type="text" defaultValue="http://" autoFocus className="inp" onChange={(e)=>{takeiput(e.target.value)}} style={{fontSize:'1.7em',width:'30vw'}}  />
   </div>
</div>:
activeFieldView.type==="legal"?<div className="frmPvwItem">
{activeFieldView.fields[0].value?<span className="prvwItemTitle">{activeKey+1+". "+activeFieldView.fields[0].value}</span>:<span className="prvwItemTitle">{this.state.activeKey+1+". "+"..."}</span>}
    {activeFieldView.fields[1].options?<ol type="A" className="previewOpts">{activeFieldView.fields[1].options.map((opt,key)=>{
        return opt.name.length>0?
     <li style={this.state.activeMCQ===opt.name?{color:'#f21070',borderColor:'#f21070',width:'8em'}:{width:'8em'}} onClick={()=>{takeiput(opt.name);this.setState({activeMCQ:opt.name})}} key={key}>{opt.name}</li>:null
})}</ol>:null}
</div>:
    <div className="frmPvwItem">
                 <span className="prvwItemTitle">Under Development</span>
            </div>
                }
            </div>
        )
    }
}
