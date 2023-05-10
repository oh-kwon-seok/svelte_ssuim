

//@ts-nocheck

import { writable } from 'svelte/store';
import {info_item_modal_state,info_item_form_state,info_item_data} from './state';

import {v4 as uuid} from 'uuid';

import {common_alert_state, common_search_state} from '$lib/store/common/state';
import { listen } from 'svelte/internal';

let update_modal : any;
let update_form : any;
let list_data : any;
let alert : any;
let search_state : any;

let init_form_data = {
  id : 0,
  maker : '한스텍',
  code : '',
  name : '',
  unit : 'BOX',
  type : '완제품',
  expand : false,
  check : false,

}


info_item_modal_state.subscribe((data) => {
    update_modal = data;
})

info_item_form_state.subscribe((data) => {
    update_form = data;
})

info_item_data.subscribe((data) => {
    list_data = data;
 
})
common_alert_state.subscribe((data) => {
  alert = data;
})

common_search_state.subscribe((data) => {
  search_state = data;
})
 


const modalOpen = (data : any, title : any) => {
 

  common_alert_state.update(() => false);
    update_modal['title'] = title;
    update_modal[title]['use'] = !update_modal[title]['use'];
    info_item_modal_state.update(() => update_modal);

    if(title === 'add'){
    
      info_item_modal_state.update(() => update_modal);
    }else if(title === 'update' || title === 'delete'){
       
   
        Object.keys(update_form).map((item)=> {    
            update_form[item] = data[item];
        }); 

            info_item_form_state.update(() => update_form);
            info_item_modal_state.update(() => update_modal);

    }
    else if(title === 'check_delete'){

      let check_data = [];
      for(let i= 0; i< data.length; i++){
        if(data[i].check === true){
          check_data.push(data[i]);

        }
      }

      if(check_data.length === 0){
        common_alert_state.update(() => true);

      }else{
       

      }
  }
}

const save = (param,title) => {
    console.log('list_data : ',list_data);
 
    if(title === 'add'){
      
      param['id'] = uuid();
  
      let empty_array = [];
      Object.keys(param).map((item)=>{
        if(param[item] === '' || param[item] === undefined){
          empty_array.push(item);
        
        }
      });
      if(empty_array.length === 0){
        
        info_item_data.update(
          datas => {
          
              
              const setData = [...datas, param];
              datas = setData;
              search_state['filteredItems'] = datas;
              common_search_state.update(() => search_state);
              return datas

             

          }
      )

        update_modal[title]['use'] = !update_modal[title]['use'];
        info_item_modal_state.update(() => update_modal);

       
        

        common_alert_state.update(() => false);
        info_item_form_state.update(()=> init_form_data);

      }else{
        common_alert_state.update(() => !alert);

      }

     
    }
    
    else if(title === 'update'){
    
      info_item_data.update(
        datas => {
            let setData = datas.map(data => {
                if(data.code === param.code){
                    data = param
                }
                return data
            })
            datas = setData
           
            return datas
        }
    )

    let setData = search_state['filteredItems'].map(data=> {
      if(data.code === param.code){
        data = param
      }
      return data
    })

    search_state['filteredItems'] = setData
    common_search_state.update(()=> search_state)


    
    update_modal[title]['use'] = !update_modal[title]['use'];
        info_item_modal_state.update(() => update_modal);
        info_item_form_state.update(()=> init_form_data);




    }else if(title === 'delete'){
     
      info_item_data.update(
        datas => {
            let setData = datas.filter(data => data.code !== param['code']) 
                
       
            
            datas = setData

            search_state['filteredItems'] = datas;
            common_search_state.update(() => search_state);
            
            return datas
        }
    )
        

        update_modal[title]['use'] = !update_modal[title]['use'];
        info_item_modal_state.update(() => update_modal);
        info_item_form_state.update(()=> init_form_data);
    }

    else if(title === 'check_delete'){
     
      info_item_data.update(
        datas => {
            let setData = datas.filter(data => data.check === false) 
                
       
            
            datas = setData

            search_state['filteredItems'] = datas;
            common_search_state.update(() => search_state);
            
            return datas
        }
    )
        

        update_modal[title]['use'] = !update_modal[title]['use'];
        info_item_modal_state.update(() => update_modal);
        info_item_form_state.update(()=> init_form_data);
    }


  
  }





export {modalOpen,save}