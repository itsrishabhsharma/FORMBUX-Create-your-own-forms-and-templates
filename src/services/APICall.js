import axios from 'axios';
const environment=process.env.NODE_ENV;


let api_url=environment==="development"?'http://localhost:5000/api/':'https://formbux.herokuapp.com/api/';
api_url="https://formbux.herokuapp.com/api/";
class APICall{
    


    post = (url,data,token=null) => new Promise((resolve,reject)=>{

        var headers = {
            'Authorization': "Bearer "+token
        };
       
        axios.post(api_url+url,data,token!==null?{headers}:undefined)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });

    get=(url,token)=>new Promise((resolve,reject)=>{
        var headers = {
            'Authorization': "Bearer "+token
        };

        axios.get(api_url+url,{headers})
            .then(function(response){
                resolve(response);
            })
            .catch(function(error){
                reject(error);
            })
    })

    delete = (url,data,token=null) => new Promise((resolve,reject)=>{

        var headers = {
            'Authorization': "Bearer "+token
        };
       
        axios.delete(api_url+url,data,token!==null?{headers}:undefined)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });


}


export default new APICall();