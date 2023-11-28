

import { writable } from 'svelte/store';
import {v4 as uuid} from 'uuid';



  const product_modal_state : any = writable( {
    title : 'add',
    add : { use : false, title: ''},
    update : { use : false, title: ''},
    delete : { use : false, title: ''},
    check_delete : { use : false, title: ''},
    
     
   });

  const product_form_state : any = writable({
    uid : 0,
    sk_uid : 0,
    ship_name : '',
    origin_name : '',
    inbox : '',
    outbox : '',
    qty : 0,
    price : 0,
    used : 1,

  })
  

  export {product_modal_state,product_form_state};