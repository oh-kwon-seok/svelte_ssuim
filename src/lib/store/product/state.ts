

import { writable } from 'svelte/store';
import {v4 as uuid} from 'uuid';



  const product_modal_state : any = writable( {
    title : '',
    add : { use : false, title: ''},
    update : { use : false, title: ''},
    delete : { use : false, title: ''},
    check_delete : { use : false, title: ''},
    
     
   });

  const product_form_state : any = writable({
    id : 0,
    code : '',
    name : '',
    unit : 'BOX',
    expand : false,
    check : false,
    select : false,
  })

  


  export {product_modal_state,product_form_state};