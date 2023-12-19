

import { writable } from 'svelte/store';
import moment from 'moment';
import { setCookie, getCookie, removeCookie } from '$lib/cookies';




const menu_state = writable({
  home : false,
  info : false,
  project : false,
  process_equipment : false,
  product : false,
  shipment : false,

});






const cookie_state = getCookie('my-cookie');
const load_state = writable(false);

const url_state : any = writable({ path : '', query : ''});


  const common_alert_state : any = writable({type : 'save', value : false });

  const common_toast_state : any = writable({type : 'success', value : false, counter : 4 });

  const common_search_state : any = writable({
    start_date : moment().subtract(1, "year").format('YYYY-MM-DD'),
    end_date : moment().add(1, "day").format('YYYY-MM-DD'),
    search_text : '',
    filter : [],
    filter_title : "all",
  });


  const login_state : any = writable({
    user_idx : "",
    id : "",
    name : "",
    password : "",
    token :"",

    status : false,
    
  });


  const table_state : any = writable({
    product : "",
    user : "",
    ship : "",
  });

  const common_product_state : any = writable([]);


  const common_user_state : any = writable([]);
  
  
  const common_selected_state : any = writable([]); // 삭제용 데이터

  const common_ship_state : any = writable([]);

  const coopang_upload_state : any =  writable([]);


  const coopang_upload_result_state : any =  writable([]);

  
  const coopang_shipment_state : any =  writable([]);

  const hanjin_transport_upload_state : any =  writable([]);
  const hanjin_upload_state : any =  writable([]);
  
  const milkrun_qty_state : any = writable(0);
  const box_qty_state : any = writable(0);
  
  

  export {menu_state,cookie_state,load_state,common_alert_state,common_search_state,login_state,url_state,common_product_state,common_ship_state,common_toast_state,table_state,common_selected_state,common_user_state,coopang_upload_state,coopang_upload_result_state,coopang_shipment_state,hanjin_upload_state,hanjin_transport_upload_state,milkrun_qty_state,box_qty_state};
