

//@ts-nocheck

import { writable } from 'svelte/store';
import {standard_modal_state,standard_form_state} from './state';

import {v4 as uuid} from 'uuid';
import axios from 'axios'
import {common_alert_state, common_toast_state,common_search_state,login_state,table_state,common_selected_state, common_standard_state} from '$lib/store/common/state';
import moment from 'moment';

import {TOAST_SAMPLE} from '$lib/module/common/constants';
import { infoCallApi } from '../common/function';

const api = import.meta.env.VITE_API_BASE_URL;




let update_modal : any;
let update_form : any;
let list_data : any;
let alert : any;
let toast : any;
let search_state : any;
let login_data : any;
let table_data : any;
let standard_data : any;
let selected_data : any;


let init_form_data = {
  uid : 0,
  milkrun_qty : 0,
  order_limit_qty : 0,

}


standard_modal_state.subscribe((data) => {
    update_modal = data;
})

standard_form_state.subscribe((data) => {
    update_form = data;
})


common_alert_state.subscribe((data) => {
  alert = data;
})
common_toast_state.subscribe((data) => {
  toast = data;
})

common_search_state.subscribe((data) => {
  search_state = data;
})

login_state.subscribe((data) => {
  login_data = data;
})
table_state.subscribe((data) => {
  table_data = data;
})

common_selected_state.subscribe((data) => {
  selected_data = data;
})
common_standard_state.subscribe((data) => {
  standard_data = data;
})
 



const standardModalOpen = () => {
 
    console.log('누름');
    alert['type'] = 'save';
    alert['value'] = false;
    common_alert_state.update(() => alert);
    
    update_modal['title'] = 'update';
    update_modal['update']['use'] = true;
    standard_modal_state.update(() => update_modal);

    console.log('update_modal : ', update_modal);

   
       
   
        Object.keys(update_form).map((item)=> {    
         
              update_form[item] = standard_data[0][item];
           
           
        }); 

            standard_form_state.update(() => update_form);
            standard_modal_state.update(() => update_modal);
            console.log('update_modal : ', update_modal);
            console.log('update_form : ', update_form);
            console.log('standard_data : ', standard_data);
            

    

}



const select_query = (type) => {
   
  const url = `${api}/${type}/select`; 
        
  let basic_date = moment().subtract(90,'days');
  

  
  let start_date = basic_date.format('YYYY-MM-DDTHH:mm:ss');
  let end_date = basic_date.add(150,'days').format('YYYY-MM-DDTHH:mm:ss');


  let params = 
  {
    start_date : start_date,
    end_date  : end_date
  };
  const config = {
    params : params,
    headers:{
      "Content-Type": "application/json",
      
    }
  }
    axios.get(url,config).then(res=>{
      console.log('table_state : ', table_state['standard']);
      table_data[type].setData(res.data);
      table_state.update(() => table_data);
      console.log('table_data : ', table_data);
   })

}

const save = (param,title) => {


  update_modal['title'] = 'add';
  update_modal['add']['use'] = true;
 
  
    if(title === 'update'){
      const url = `${api}/standard/update`
      try {

        let params = {
          uid : param.uid,
          milkrun_qty : parseInt(param.milkrun_qty),
          order_limit_qty : parseInt(param.order_limit_qty),
          used : 1,
          token : login_data['token'],
        };
      axios.post(url,
        params,
      ).then(res => {
        console.log('res',res);
        if(res.data !== undefined && res.data !== null && res.data !== '' ){
          console.log('실행');
          console.log('res:data', res.data);
          
          toast['type'] = 'success';
          toast['value'] = true;
          update_modal['title'] = '';
          update_modal['update']['use'] = false;
          standard_modal_state.update(() => update_modal);
          standard_form_state.update(()=> init_form_data);
          infoCallApi('standard');
          return common_toast_state.update(() => toast);

        }else{
        
          return common_toast_state.update(() => TOAST_SAMPLE['fail']);
        }
      })
      }catch (e:any){
        return console.log('에러 : ',e);
      };
        update_modal[title]['use'] = !update_modal[title]['use'];
        standard_modal_state.update(() => update_modal);
        standard_form_state.update(()=> init_form_data);
    }




  
  }
  



export {standardModalOpen,save}