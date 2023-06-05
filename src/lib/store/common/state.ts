

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

  const common_toast_state : any = writable({type : 'success', value : false });

  
  const common_search_state : any = writable({

    start_date : moment().format('YYYY-MM-DD'),
    end_date : moment().add(30, "day").format('YYYY-MM-DD'),
    type : 'all',
    search_text : '',
    all_check : false,
    filteredItems : [],
    
    current_page : 0,
    change_page : 0,
    total_page : 0,
  });


  const login_state : any = writable({
    user_idx : '',
    user_id : '',
    user_name : '',
    user_password : '',
    status : false,
    
  });


  const common_maker_state : any = writable([]);
  
  const common_type_state : any = writable([]);

  const common_unit_state : any = writable([]);
  
  
  export {menu_state,cookie_state,load_state,common_alert_state,common_search_state,login_state,url_state,common_maker_state, common_type_state,common_unit_state,common_toast_state};
