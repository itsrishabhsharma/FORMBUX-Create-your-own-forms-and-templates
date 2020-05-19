import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {PrimaryButton} from '../../components/Button';
import './createForm.css';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import {Popover,Input,Popconfirm, Skeleton,message, Spin,Drawer,Select} from 'antd'
import Formitems from './formitems';
import {DeleteOutlined} from '@ant-design/icons';
import FormPreview from './formPreview';
// import TextArea from 'antd/lib/input/TextArea';
import { getFormDetails } from './../../redux/actions/getFormDetails';
import { updateForm } from './../../redux/actions/updateForm';
import APICall from '../../services/APICall';
import cookie from 'react-cookies';
import FileBase64 from 'react-file-base64';


const SortableItem = SortableElement(({value,deleteItem,getTitles,saveItemValues,getFiles,addOpt,getOptions}) => <li style={{margin:'8% auto',fontWeight:'400',fontSize:'1.2em',listStyle:'none'}}>{value.type==="welcome_screen"|| value.type==="thank_you_screen"?(<div>
  <span style={{fontWeight:'500'}}>{value.name}</span>
  {value.fields.map(itms=>{
  if(itms.type==="text"){
    return <Input onChange={(e)=>{getTitles(e.target.value)}} onBlur={(x)=>saveItemValues(x)} value={itms.value} onClick={()=>{getTitles(null)}}  placeholder={itms.label} style={{marginTop:'8px'}} />
  }
  else{
    return   <div  onClick={()=>{getTitles(null)}} ><FileBase64
    multiple={ false }
    onDone={ (e)=>getFiles(e.base64,"") } /></div>
    //  <input onChange={(e)=>{imageToUri('./example.jpg')(e.target.value)}} onBlur={(x)=>saveItemValues(x)} value={itms.value} onClick={()=>{getTitles("")}} type="file" style={{marginTop:'8px'}} />
  }

})}
<span style={{cursor:'pointer',float:'right',color:'red'}} onClick={()=>deleteItem(value.id)} title="Delete item"> <DeleteOutlined /></span>
</div>):value.type==="short_text"?(<div>
  <span style={{fontWeight:'500'}}>{value.name}</span>
  {value.fields.map(itms=>{
    if(itms.type==="text"){
      return <Input onChange={(e)=>{getTitles(e.target.value)}} onBlur={(x)=>saveItemValues(x)} value={itms.value} onClick={()=>{getTitles(null)}} placeholder={itms.label} style={{marginTop:'8px'}} />
    }
  })}
  <span style={{cursor:'pointer',float:'right',color:'red'}} onClick={()=>deleteItem(value.id)} title="Delete item"> <DeleteOutlined /></span>
  </div>):value.type==="long_text"?(<div>
    <span style={{fontWeight:'500'}}>{value.name}</span>
    {value.fields.map(itms=>{
      if(itms.type==="text"){
        return <textarea  onChange={(e)=>{getTitles(e.target.value)}} onBlur={(x)=>saveItemValues(x)} value={itms.value} onClick={()=>{getTitles(null)}} placeholder={itms.label} style={{marginTop:'8px',width:'100%'}} />
      }
    })}
    <span style={{cursor:'pointer',float:'right',color:'red'}} onClick={()=>deleteItem(value.id)} title="Delete item"> <DeleteOutlined /></span>
    </div>):value.type==="statement"?(<div>
      <span style={{fontWeight:'500'}}>{value.name}</span>
      {value.fields.map(itms=>{
        if(itms.type==="text"){
          return <Input placeholder={itms.label}  value={itms.value} onBlur={(x)=>saveItemValues(x)} onChange={(e)=>{getTitles(e.target.value)}} onClick={()=>{getTitles(null)}} style={{marginTop:'8px'}} />
        }
      })}
      <span style={{cursor:'pointer',float:'right',color:'red'}} onClick={()=>deleteItem(value.id)} title="Delete item"> <DeleteOutlined /></span>
      </div>):
      value.type==="mcq"?(<div>
      <span style={{fontWeight:'500'}}>{value.name}</span>
      {value.fields.map(itms=>{
        if(itms.type==="text"){
          return <Input placeholder={itms.label}  value={itms.value} onBlur={(x)=>saveItemValues(x)} onChange={(e)=>{getTitles(e.target.value)}} onClick={()=>{getTitles(null)}} style={{marginTop:'8px'}} />
        }
        else{
        
        return itms.options?<>{
        itms.options.map((opt,ids)=><><span className="optText"><input onChange={(e)=>getOptions(e.target.value,ids)} value={opt.name} type="text" /></span><br/></>)}
        <span className="addOptBtn" onClick={()=>addOpt()}><span> + </span> option</span></>:null
        }
      })}
      <span style={{cursor:'pointer',float:'right',color:'red'}} onClick={()=>deleteItem(value.id)} title="Delete item"> <DeleteOutlined /></span>
      </div>):
      value.type==="number"?(<div>
      <span style={{fontWeight:'500'}}>{value.name}</span>
      {value.fields.map(itms=>{
        if(itms.type==="text"){
          return <Input placeholder={itms.label}  value={itms.value} onBlur={(x)=>saveItemValues(x)} onChange={(e)=>{getTitles(e.target.value)}} onClick={()=>{getTitles(null)}} style={{marginTop:'8px'}} />
        }
        
      })}
      <span style={{cursor:'pointer',float:'right',color:'red'}} onClick={()=>deleteItem(value.id)} title="Delete item"> <DeleteOutlined /></span>
      </div>):
      value.type==="email"?
      (<div>
        <span style={{fontWeight:'500'}}>{value.name}</span>
        {value.fields.map(itms=>{
          if(itms.type==="text"){
            return <Input placeholder={itms.label}  value={itms.value} onBlur={(x)=>saveItemValues(x)} onChange={(e)=>{getTitles(e.target.value)}} onClick={()=>{getTitles(null)}} style={{marginTop:'8px'}} />
          }
          
        })}
        <span style={{cursor:'pointer',float:'right',color:'red'}} onClick={()=>deleteItem(value.id)} title="Delete item"> <DeleteOutlined /></span>
        </div>)
      :value.type==="yesno"?(<div>
        <span style={{fontWeight:'500'}}>{value.name}</span>
        {value.fields.map(itms=>{
          if(itms.type==="text"){
            return <Input placeholder={itms.label}  value={itms.value} onBlur={(x)=>saveItemValues(x)} onChange={(e)=>{getTitles(e.target.value)}} onClick={()=>{getTitles(null)}} style={{marginTop:'8px'}} />
          }
         
        })}
        <span style={{cursor:'pointer',float:'right',color:'red'}} onClick={()=>deleteItem(value.id)} title="Delete item"> <DeleteOutlined /></span>
        </div>):
        value.type==="opinion"?(<div>
          <span style={{fontWeight:'500'}}>{value.name}</span>
          {value.fields.map(itms=>{
            if(itms.type==="text"){
              return <Input placeholder={itms.label}  value={itms.value} onBlur={(x)=>saveItemValues(x)} onChange={(e)=>{getTitles(e.target.value)}} onClick={()=>{getTitles(null)}} style={{marginTop:'8px'}} />
            }
           
          })}
          <span style={{cursor:'pointer',float:'right',color:'red'}} onClick={()=>deleteItem(value.id)} title="Delete item"> <DeleteOutlined /></span>
          </div>):
          value.type==="rating"?(<div>
            <span style={{fontWeight:'500'}}>{value.name}</span>
            {value.fields.map(itms=>{
              if(itms.type==="text"){
                return <Input placeholder={itms.label}  value={itms.value} onBlur={(x)=>saveItemValues(x)} onChange={(e)=>{getTitles(e.target.value)}} onClick={()=>{getTitles(null)}} style={{marginTop:'8px'}} />
              }
             
            })}
            <span style={{cursor:'pointer',float:'right',color:'red'}} onClick={()=>deleteItem(value.id)} title="Delete item"> <DeleteOutlined /></span>
            </div>):
            value.type==="numbers"?(<div>
              <span style={{fontWeight:'500'}}>{value.name}</span>
              {value.fields.map(itms=>{
                if(itms.type==="text"){
                  return <Input placeholder={itms.label}  value={itms.value} onBlur={(x)=>saveItemValues(x)} onChange={(e)=>{getTitles(e.target.value)}} onClick={()=>{getTitles(null)}} style={{marginTop:'8px'}} />
                }
               
              })}
              <span style={{cursor:'pointer',float:'right',color:'red'}} onClick={()=>deleteItem(value.id)} title="Delete item"> <DeleteOutlined /></span>
              </div>):
            value.type==="dropdown"?(<div>
                <span style={{fontWeight:'500'}}>{value.name}</span>
                {value.fields.map(itms=>{
                  if(itms.type==="text"){
                    return <Input placeholder={itms.label}  value={itms.value} onBlur={(x)=>saveItemValues(x)} onChange={(e)=>{getTitles(e.target.value)}} onClick={()=>{getTitles(null)}} style={{marginTop:'8px'}} />
                  }
                  else{
                    return itms.options?<>{
                      itms.options.map((opt,ids)=><><span className="optText"><input onChange={(e)=>getOptions(e.target.value,ids)} value={opt.name} type="text" /></span><br/></>)}
                      <span className="addOptBtn" onClick={()=>addOpt()}><span> + </span> option</span></>:null
                  }
                 
                })}
                <span style={{cursor:'pointer',float:'right',color:'red'}} onClick={()=>deleteItem(value.id)} title="Delete item"> <DeleteOutlined /></span>
             </div>):
             value.type==="legal"?(<div>
              <span style={{fontWeight:'500'}}>{value.name}</span>
              {value.fields.map(itms=>{
                if(itms.type==="text"){
                  return <Input placeholder={itms.label}  value={itms.value} onBlur={(x)=>saveItemValues(x)} onChange={(e)=>{getTitles(e.target.value)}} onClick={()=>{getTitles(null)}} style={{marginTop:'8px'}} />
                }
              })}
              <span style={{cursor:'pointer',float:'right',color:'red'}} onClick={()=>deleteItem(value.id)} title="Delete item"> <DeleteOutlined /></span>
           </div>):
           value.type==="payment"?(<div>
            <span style={{fontWeight:'500'}}>{value.name}</span>
            {value.fields.map(itms=>{
              if(itms.type==="text"){
                return <Input placeholder={itms.label}  value={itms.value} onBlur={(x)=>saveItemValues(x)} onChange={(e)=>{getTitles(e.target.value)}} onClick={()=>{getTitles(null)}} style={{marginTop:'8px'}} />
              }
            })}
            <span style={{cursor:'pointer',float:'right',color:'red'}} onClick={()=>deleteItem(value.id)} title="Delete item"> <DeleteOutlined /></span>
         </div>):
         value.type==="website"?(<div>
          <span style={{fontWeight:'500'}}>{value.name}</span>
          {value.fields.map(itms=>{
            if(itms.type==="text"){
              return <Input placeholder={itms.label}  value={itms.value} onBlur={(x)=>saveItemValues(x)} onChange={(e)=>{getTitles(e.target.value)}} onClick={()=>{getTitles(null)}} style={{marginTop:'8px'}} />
            }
          })}
          <span style={{cursor:'pointer',float:'right',color:'red'}} onClick={()=>deleteItem(value.id)} title="Delete item"> <DeleteOutlined /></span>
       </div>):
        null}</li>);

const SortableList = SortableContainer(({items,deleteItem,getTitles,saveItemValues,getFiles,addOpt,getOptions}) => {
  return (
    <ul style={{listStyle:'none',padding:'1em'}}>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} addOpt={()=>addOpt(index)} getOptions={(val,ids)=>getOptions(val,index,ids)} getFiles={(x)=>getFiles(x,index)} saveItemValues={()=>saveItemValues(index)} getTitles={(val)=>getTitles(val,index)} deleteItem={(id)=>deleteItem(id)} index={index} value={value} />
      ))}
    </ul>
  );
});

class SortableComponent extends Component {
  constructor(props){
    super(props);
      this.state = {
        items: this.props.items,
      };
  }
 
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };
  static getDerivedStateFromProps(props, state) {
    if (props.items && props.items.length !== state.items.length) {
      return {
        items: props.items
      };
    }
    return null;
  } 
  render() {

    return <SortableList getFiles={(x,y)=>this.props.getFiles(x,y)} getOptions={(val,k,i)=>this.props.getOptions(val,k,i)} addOpt={(idx)=>this.props.addOpt(idx)} useDragHandle={true} saveItemValues={(x)=>this.props.saveItemValues(x)} getTitles={(val,idx)=>this.props.getTitles(val,idx)} deleteItem={(id)=>this.props.deleteItem(id)} items={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}

class CreateForm extends Component {
    constructor(props){
        super(props);

        this.state={
          fields:this.props.state.formReducer.form?this.props.state.formReducer.form.fields:[],
          visible:false,
          activeFieldViewIndex:0,
          loading:false,
          lJump:false
        }
    }

    componentDidMount(){
        document.title="Create a new Template";
        this.props.getFormInfo(this.props.activeId)
    }

    addItem(itm){

      this.props.addItem({item:itm,form:this.props.state.formReducer.form})
    }

    componentWillReceiveProps(nextProps){
      // console.log(nextProps)
      if(parseInt(nextProps.activeId)!==nextProps.state.formReducer.form._id)
      nextProps.getFormInfo(nextProps.activeId)
    }

  
    deleteItem(id){
      let templates=localStorage.getItem('forms')!==null?JSON.parse(localStorage.getItem('forms')):[];
      let activeIndex=templates.findIndex(x=>parseInt(x._id)===parseInt(this.props.state.formReducer.form._id));
      templates[activeIndex].fields.splice( templates[activeIndex].fields.findIndex(x=>x.id===id),1);
      
      console.log(templates[activeIndex])

      APICall.post('templates/update',{
        formId:templates[activeIndex]._id,
        fields:templates[activeIndex].fields
      },cookie.load('token')).then(res=>{
        if(res.data.status){
          localStorage.setItem('forms',JSON.stringify(templates));
          this.props.getFormInfo(this.props.activeId);
          message.success("item deleted",0.7);
        }
        else{
          message.error("Error while deleting item",0.8)
        }
      })
    
    }
  






   




    static getDerivedStateFromProps(props, state) {
      if (props.state.formReducer.form && props.state.formReducer.form.fields.length !== state.fields.length) {
        return {
          fields: props.state.formReducer.form.fields,
          visible:false
        };
      }
      return null;
    }    

    saveItemValues(idx){
      let {fields}=this.state
      // console.log(fields[idx].fields[0].value,this.props.state.formReducer.form.fields[idx].fields[0].value)
      // if(fields[idx].fields[0].value.length!==this.props.state.formReducer.form.fields[idx].fields[0].value.length){
        APICall.post('templates/update',{
          formId:this.props.state.formReducer.form._id,
          fields:fields
        },cookie.load('token')).then(res=>{
          if(res.data.status){
            // message.info("Saved",0.5)
          }
          else{
            message.error("Error while saving form",0.7)
          }
        }).catch(err=>message.error("Error while saving form",0.7))
      // }
    }
    getOptionName(val,idx,optionInd){
      let {activeFieldViewIndex,fields}=this.state;
      fields[idx].fields[1].options[optionInd].name=val;
      activeFieldViewIndex=idx;
      this.setState({fields,activeFieldViewIndex},()=>this.saveItemValues())
    }
    addOption(idx){
      let {activeFieldViewIndex,fields}=this.state
      fields[idx].fields[1].options.push({name:"",selected:false});
      activeFieldViewIndex=idx;
      this.setState({fields,activeFieldViewIndex})
    }

    getTitles(val,idx){
      // console.log
      let {activeFieldViewIndex,fields}=this.state
      if(val!==null)
      fields[idx].fields[0].value=val;
      activeFieldViewIndex=idx;
      this.setState({activeFieldViewIndex,fields})
    }

    getFiles(val,idx){
      let {activeFieldViewIndex,fields}=this.state
      if(val.length>0)
      fields[idx].fields[1].value=val;
      activeFieldViewIndex=idx;
      this.setState({activeFieldViewIndex,fields},()=>this.saveItemValues())
    }

    publishform(){
      this.setState({loading:true});
      APICall.post('templates/publish',{formId:this.props.state.formReducer.form._id,fields:this.state.fields},cookie.load('token')).then(res=>{
        this.setState({loading:false})
        if(res.data.status){
          message.success('Form Published');
          this.props.history.push("/fb-admin/form");
        }
        else{
          message.success('Error Occured While Publishing Form')
        }
      }).catch(err=>{
        this.setState({loading:false});
        message.success('Error Occured While Publishing Form');
      })
    }

    render() {
      const content=(<div className="itemsListContainer">
        <Formitems addItem={(item)=>{this.addItem(item);this.setState({visible:false})}} />
      </div>)

      const {fields,visible}=this.state;
        return (
            <>
           
            <div className="flex flex-wrap mt-4" id="createPanel">
            <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3 className="font-semibold text-base text-gray-800">
                        {this.props.state.formReducer.form?this.props.state.formReducer.form.name:<Skeleton title="name" paragraph={{rows:0,width:'20px'}} active={true} size="small" />}
                      </h3>
                    </div>
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <PrimaryButton onClick={()=>this.setState({lJump:true})}>
                    logic jump
                  </PrimaryButton>
                    <Popconfirm  title="Are you sure you want to publish?"  okText="Yes"
                    cancelText="No" onConfirm={()=>this.publishform()} placement="bottomLeft">
                    <PrimaryButton onClick={()=>this.setState({openAdd:true})}>
                    publish
                  </PrimaryButton>
                    </Popconfirm>
                     
                    </div>
                  </div>
                </div>
                <div className="block w-full overflow-x-auto">
                  {/* Projects table */}
                  <hr/>
                  <Spin spinning={this.state.loading} tip="Publishing Form..">
                  <div className='itemBoard'>
                      <div className="itemLeft">
                      {fields.length>0?<div className="allItemsContainer">
                         <SortableComponent getOptions={(val,k,j)=>this.getOptionName(val,k,j)} addOpt={(idx)=>this.addOption(idx)} deleteItem={(id)=>this.deleteItem(id)} getFiles={(val,idx)=>this.getFiles(val,idx)} saveItemValues={(dx)=>this.saveItemValues(dx)} getTitles={(val,idx)=>this.getTitles(val,idx)} items={fields} />
                      </div>:<div></div>}
                      <Popover trigger="click" visible={visible}  onVisibleChange={(visible )=>{this.setState({visible:visible})}} content={content} title="">
                        <div className="addBtn">ADD ITEM</div>
                      </Popover>
                      </div>
                      <div className="itemRight">
                        {fields.length>0?<FormPreview activeKey={this.state.activeFieldViewIndex} activeFieldView={this.props.state.formReducer.form.fields[this.state.activeFieldViewIndex]} />:<div style={{textAlign:'center'}}>
                          <img src={require("../../assets/img/empty.png")} style={{width:'340px',display:'block',margin:'0 auto'}} />
                          <span style={{fontWeight:'400',fontSize:'1.5em'}}>Your form preview will appear here</span>
                        </div>}
                      </div>
                  </div>
                  </Spin>
                </div>
              </div>
            </div>
            
        
          </div>
          
          <Drawer
          title="Logic Jump"
          placement="left"
          closable={false}
          onClose={()=>{this.setState({lJump:false})}}
          visible={this.state.lJump}
          width="400"
        >
          <div>
            <span style={{fontSize:'12px'}}>Always jump to</span>
            <Select style={{ width: 250,marginLeft:'5px' }} value={this.state.activeFieldViewIndex} onChange={(val)=>this.setState({activeFieldViewIndex:val})}>
            {
              fields.map((itm,ind)=>{
                console.log(itm)
                return <Select.Option value={ind}>{itm.fields[0].value}</Select.Option>})
            }
            </Select><br/>
            <span style={{fontSize:'12px'}}>Show different questions based on people’s answers</span>
            <PrimaryButton>Add a logic jump</PrimaryButton>
          </div>
        </Drawer>
            
          </>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        state
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
      getFormInfo:(id)=>{dispatch(getFormDetails(id))},
      addItem:(item)=>{dispatch(updateForm(item))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(CreateForm));