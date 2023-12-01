

import { writable } from 'svelte/store';
import {v4 as uuid} from 'uuid';



  const ship_modal_state : any = writable( {
    title : 'add',
    add : { use : false, title: ''},
    update : { use : false, title: ''},
    delete : { use : false, title: ''},
    check_delete : { use : false, title: ''},
    
     
   });

  const ship_form_state : any = writable({
    uid : 0,
    area : '',
    receive_user : '',
    phone1 : '',
    phone2 : '',
    address : '',
    used : 1,

  })
  

  export {ship_modal_state,ship_form_state};