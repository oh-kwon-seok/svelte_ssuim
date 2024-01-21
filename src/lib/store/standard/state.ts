

import { writable } from 'svelte/store';
import {v4 as uuid} from 'uuid';



  const standard_modal_state : any = writable( {
    title : 'add',
    add : { use : false, title: ''},
    update : { use : false, title: ''},
    delete : { use : false, title: ''},
    check_delete : { use : false, title: ''},
    
     
   });

  const standard_form_state : any = writable({
    uid : 0,
    milkrun_qty : 0,
    order_limit_qty : 0,

  })
  

  export {standard_modal_state,standard_form_state};