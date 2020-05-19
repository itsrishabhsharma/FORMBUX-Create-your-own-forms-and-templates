import React from "react";
import {withRouter} from 'react-router-dom';
import {Modal, Input,Popconfirm,message,Spin, Table} from 'antd';
import { connect} from 'react-redux'
import { PrimaryButton } from "../components/Button.jsx";
import {EditOutlined,DeleteOutlined,EyeOutlined,CodeOutlined} from '@ant-design/icons'
import {LoadingOutlined} from '@ant-design/icons';
import {getForms} from '../redux/actions/getForms';
import APICall from "../services/APICall.js";
import Cookies from 'react-cookies';
import * as moment from 'moment';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isNew:0,
      openAdd:false,
      name:"",
      loading:false,
      activeForm:{},
      activeResponse:[],
      responseCols:[],
      responseData:[]
    }
    this.closeAddModal=this.closeAddModal.bind(this)
  }

  closeAddModal(){
    this.setState({openAdd:false})
  }
  componentDidMount(){
    this.props.getForms()
    document.title="ADMIN DASHBOARD | FORMBUX"
  }
  ViewForm(arr){
    if(arr.length>0)
    this.props.history.push("/view/"+arr[arr.length-1]._id);
    else{
      message.info('Form not published yet',0.7)
    }
  }

  copy(syt){
    var copyText = document.getElementById("actlCode");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  }

  deleteForm(id){
    let forms=localStorage.getItem('forms')!==null?JSON.parse(localStorage.getItem('forms')):[];
    forms.splice(forms.findIndex(x=>x._id===id),1);
    localStorage.setItem('forms',JSON.stringify(forms));
    this.props.getForms()
  }
  ceateForm(){
    this.setState({loading:true});
    APICall.post('templates/add',{name:this.state.name,fields:[]},Cookies.load('token')).then(res=>{
      this.setState({loading:false})
      if(res.data.status){
          this.props.getForms();
          this.props.history.push("/fb-admin/form/"+res.data.result)
      }
      else{
        message.error("Form creation failed!",0.7)
      }
    }).catch(err=>{
      this.setState({loading:false},()=>message.error("Form creation failed!",0.7))
    })
  }

  loadResponse(items,name){
    if(items){
      let {activeResponse,responseCols,responseData}=this.state;
        items[0].fields.map((itm)=>{
          if(itm.type!=="statement" || itm.type!=="welcome_screen" || itm.type!=="thank_you_screen"){
            responseCols.push({
              title:itm.fields[0].value,
              dataIndex:itm.fields[0].value?itm.fields[0].value.toLowerCase():null,
              key:itm.fields[0].value?itm.fields[0].value.toLowerCase():null,
              render:(data)=>data?data:"-"
            });
          }
        })
        items.map((jk,idx)=>{
          let temp={};
          if(temp.date===undefined)
              temp["date"]=moment(jk.date._d).fromNow();
          jk.fields.map(itm=>{
            if(itm.type!=="statement" || itm.type!=="welcome_screen" || itm.type!=="thank_you_screen"){
              temp[itm.fields[0].value?itm.fields[0].value.toLowerCase():null]=itm.fields[0].response; 
            }
          });
          
        responseData.push(temp);
        if(idx===items.length-1){
          responseCols.push({
            title:"Date",
            dataIndex:"date",
            key:"date"
          });
        }
      });
      console.log(items)
      this.setState({activeResponse:name,responseCols,responseData});

    }
  }
  
 render(){
  return (
    <>
    <Modal
      title="CREATE TEMPLATE"
      visible={this.state.openAdd}
      footer={[]}
      onCancel={()=>this.closeAddModal()}

    >


    
    <form  onSubmit={(e)=>{e.preventDefault();this.ceateForm()}} >
      <Input placeholder="Enter name" required value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}} size="large" style={{textAlign:'center'}} />
      <br/><br/>
      <PrimaryButton style={{width:'100%' }} onClick={()=>this.ceateForm()} size="xl">{this.state.loading?<LoadingOutlined/>:"save"}</PrimaryButton>
      </form>
      
    </Modal>
    {/* <div className="px-4 md:px-10 mx-auto w-full -m-24"> */}
          {/* <div className="flex flex-wrap">
            <LineChart />
            <BarChart />
          </div> */}
          <div className="flex flex-wrap mt-4">
            <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3 className="font-semibold text-base text-gray-800">
                        List
                      </h3>
                    </div>
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                      <PrimaryButton onClick={()=>this.setState({openAdd:true})}>
                        create template
                      </PrimaryButton>
                    </div>
                  </div>
                </div>
                <div className="block w-full overflow-x-auto">
                  {/* Projects table */}
                  <Spin spinning={this.props.loading}>
               
                  { this.props.all && this.props.all.length>0?<table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                      <tr>
                        <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          template name
                        </th>
                        <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          Responses
                        </th>
                        <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          Fields
                        </th>
                        <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      this.props.all?this.props.all.map((itms,key)=>{
                          return <tr key={key}>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                            {itms.name}
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            {itms.response?itms.response.length>0?<a href="#" onClick={(e)=>{e.preventDefault();this.loadResponse(itms.response,itms.name);}}>{itms.response.length}</a>:0:0}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          {itms.fields?itms.fields.length:0}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            <EditOutlined onClick={()=>{this.props.history.push('/fb-admin/form/'+itms._id)}} style={{fontSize:'1.7em',cursor:'pointer'}} />
                            <Popconfirm
    title="Are you sure delete this form?"
    onConfirm={()=>{this.deleteForm(itms._id)}}
    // onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
                  <DeleteOutlined style={{fontSize:'1.5em',marginLeft:'8px',color:'red',cursor:'pointer'}} />
                  </Popconfirm>
                  <EyeOutlined onClick={()=>this.ViewForm(itms.published)} style={{fontSize:'1.6em',marginLeft:'8px',color:'blue',cursor:'pointer'}} />
                  <CodeOutlined style={{fontSize:'1.5em',marginLeft:'8px',color:'grey',cursor:'pointer'}} onClick={()=>{itms.published.length>0?this.setState({activeForm:itms}):message.info('not published',0.6)}} />
                  
                          </td>
                        </tr>
                      }):<span>Your templates will appear here</span>
                    }
                      
                    </tbody>
                  </table>:<div style={{textAlign:'center',paddingBottom:'2em'}}> <img src={require('../assets/img/empty.png')} style={{width:'340px',display:'block',margin:'0 auto'}} />
                  <span style={{fontWeight:'400',fontSize:'1.5em'}}>Your templates will appear here</span>
                  </div>}
               
                  </Spin>
               
                  </div>
              </div>
            </div>
            
        
          </div>
       
        {/* </div> */}
     <Modal
     visible={this.state.activeForm._id}
     title="Embed This Form"
     onCancel={()=>{this.setState({activeForm:{}})}}
     footer={[]}
     ><>
     <CopyToClipboard text={this.state.activeForm.published?'<script src="https://formbux.herokuapp.com/static/widget.js"> </script><script>callChatUI("https://formbux.herokuapp.com/v2/'+this.state.activeForm.published[this.state.activeForm.published.length-1]._id+'");</script>':null}
          onCopy={() => message.info("Copied",0.5)}>
          <span style={{cursor:'pointer',color:'pink',fontWeight:'bold'}}>COPY</span>
        </CopyToClipboard>
      <div className="codeS">
        {/* <span className="Copies" onClick={()=>this.copy('http://localhost:3000/static/widget.js"> </script><script>callChatUI("http://localhost:3000/v2/'+this.state.activeForm._id)}>COPY</span> */}
        {this.state.activeForm.published?<em style={{userSelect:"text"}} id="actlCode">{'<script src="https://formbux.herokuapp.com/static/widget.js"> </script><script>callChatUI("https://formbux.herokuapp.com/v2/'+this.state.activeForm.published[this.state.activeForm.published.length-1]._id+'");</script>'.toString()}</em>:null}
      </div>
      </>
     </Modal>

     <Modal
     onCancel={()=>{this.setState({activeResponse:[],responseCols:[],responseData:[]})}}
      visible={this.state.activeResponse.length>0}
      footer={[]}
      title={this.state.activeResponse}
      style={{width:'auto'}}
      className="responseTable"
     >
        <>
        <Table
          columns={this.state.responseCols}
          dataSource={this.state.responseData}
        />
        </>
     </Modal>
                  <style jsx>{`
                  .codeS{
                     background-color: grey;
                     color: white;
                     padding: 2em;
                     border-radius: 9px;
                  }
                  .Copies{
                    padding: 1em;
                    top: 67px;
                    right: 19px;
                    position: absolute;
                    cursor: pointer;
                  }

                  .ant-modal.responseTable {
                    width: auto !important;
                }
                  
                  `}</style>
    </>
  );
 }
}


const mapStateToProps=(state)=>{
  return state.formReducer;
}


const mapDispatchToProps=(dispatch)=>{
  return{
    ceateForm:(name,history)=>{dispatch({type:'create_form',payload:{name,history}})},
    getForms:()=>{dispatch(getForms())},
    // deleteForm:(id)=>{dispatch({type:'deletForm',payload:id})}
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Dashboard));