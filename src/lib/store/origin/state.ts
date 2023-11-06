

import { writable } from 'svelte/store';
import {v4 as uuid} from 'uuid';



  const origin_modal_state : any = writable( {
    title : 'add',
    add : { use : false, title: ''},
    update : { use : false, title: ''},
    delete : { use : false, title: ''},
    check_delete : { use : false, title: ''},
    
     
   });

  const origin_form_state : any = writable({
    uid : 0,
    code : '',
    name : '',
    used : 1,


  })
  

  export {origin_modal_state,origin_form_state};