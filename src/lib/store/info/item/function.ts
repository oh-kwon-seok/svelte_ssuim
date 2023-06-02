

//@ts-nocheck

import { writable } from 'svelte/store';
import {info_item_modal_state,info_item_form_state,info_item_data} from './state';

import {v4 as uuid} from 'uuid';
import axios from 'axios'
import {common_alert_state, common_search_state} from '$lib/store/common/state';


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
  child : [],
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
  alert['type'] = 'save';
  common_alert_state.update(() => alert);
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
        alert['value'] = true;
        common_alert_state.update(() => alert);

      }else{
       

      }
  }
}

const save = (param,title) => {
    if(title === 'add'){

      const url = '/api/item/save'
      try {
  
        let params = {
          item_code : param.code,
          item_name : param.name,
          item_maker : param.maker,
          item_type : param.type,
          item_unit : param.unit,
          
          item_bom : JSON.stringify(param.child),    
        };
      axios.post(url,
        params,
      ).then(res => {
        console.log(res);
        if(res.data.length === 0){
          return console.log('데이터등록실패',res.data);
        }else{
          return console.log('데이터등록성공',res.data);
        }
        
  
      })
    }catch (e:any){
      return console.log('에러 : ',e);
    };



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
        alert = {type : 'save', value : true}
        common_alert_state.update(() => alert);

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
  const bomRowUtil = (title) => {
    if(title === 'add'){
      let new_id = update_form['child'].length + 1;
      let new_bom_data = {
       
        id : new_id,
        maker : update_form['maker'],
        code : '',
        name : '',
        unit : 'BOX',
        type : '완제품',
        check : false,
        use_qty : 0,

      };
  
      update_form['child'].push(new_bom_data);
    }else if(title === 'check_delete'){
      alert = {type : 'select', value : false}
      
      console.log('alert : ', alert);

 
      let delete_count = update_form['child'].filter(data => data.check === true).length;
      update_form['child'] = update_form['child'].filter(data => data.check === false) 



      console.log('child : ',delete_count);
      if(delete_count === 0 || delete_count === undefined){
        alert = {type : 'select', value : true}

        common_alert_state.update(() => alert);
       

      }

      
      

    }else {
      update_form['child'].pop();
    }
  
    info_item_form_state.update(() => update_form);
    
  }


  const bomRowCellClick = (title,id) => {
    if(title === 'check' ){
      for(let i =0; i<update_form['child'].length; i++){
        if(id === update_form['child'][i]['id']){
          
          update_form['child'][i][title] = !update_form['child'][i][title];
          break;
        }
      }
  
    }
    
    info_item_form_state.update(() => update_form);
    


  }






export {modalOpen,save,bomRowUtil,bomRowCellClick}