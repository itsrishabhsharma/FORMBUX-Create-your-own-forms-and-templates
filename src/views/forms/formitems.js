import React, { Component } from 'react';
import {items} from './items';
import {connect} from 'react-redux';
import { formReducer } from './../../redux/reducers/formReducers';
import { message } from 'antd';

class Formitems extends Component {
    constructor(props){
        super(props);
        this.state={
            activeMenuIndex:-1
        }
    }

    componentDidMount(){
        // console.log(items)

    }
    render() {
        let {activeMenuIndex}=this.state
        let forms=this.props.form.fields;
        return (
            <div className="itemsIndRow">

                <div className="itemsIndLeft">
                {
                    items.map((item,idx)=>{
                        let welcomeExists=forms.findIndex(x=>x.id===1)!==-1;
                        let thanksExists=forms.findIndex(x=>x.id===2)!==-1;
                        const disabled=welcomeExists===true && item.id===1 || thanksExists===true && item.id===2;
                        return <div key={idx} onClick={()=>{disabled?message.warning('Already added!',0.7):this.props.addItem(item)}} onMouseLeave={()=>this.setState({activeMenuIndex:-1})} onMouseEnter={()=>this.setState({activeMenuIndex:idx})}>
                            <span style={disabled?{color:'grey'}:{color:'black'}}>{item.name}</span>
                        </div>
                    })
                }
                </div>
                <div style={{width:'60%',padding:'3%',display:'flex',justifyContent:'center'}} className={activeMenuIndex!==-1?"animated fadeInDown slow":"animated fadeIn"}>{items[activeMenuIndex]?items[activeMenuIndex].description:"Select an item"}</div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return state.formReducer;
}

const mapDispatchToProps=(dispatch)=>{
    return{

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Formitems);