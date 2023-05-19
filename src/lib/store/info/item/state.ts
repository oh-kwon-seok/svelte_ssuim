

import { writable } from 'svelte/store';
import {v4 as uuid} from 'uuid';


const info_item_data : any = writable([
    { id: uuid(), code: '1133286', name : '09케라시스비누실크모이 100g(EX)', maker: '애경', unit : 'BOX', type: '완제품', 
    check : false,
    expand : false,
    select : false,
    child : [{
      id: uuid(), code: '1133287', name : '09케라시스비누미네랄발 100g(EX)', maker: '애경', unit : 'BOX', type: '부자재',
      expand : false,
      select : false,
    },{

      id: uuid(), code: '1133288', name : '09케라시스비누미네랄발 100g(EX)', maker: '애경', unit : 'BOX', type: '원자재',
      expand : false,
      select : false,
    }]
  }
  ,
    { id: uuid(), code: '1133287', name : '09케라시스비누미네랄발 100g(EX)', maker: '애경', unit : 'BOX', type: '완제품', check : false,
    expand : false,
    select : false,
    child : [{

      id: uuid(), code: '1133287', name : '09케라시스비누미네랄발 100g(EX)', maker: '애경', unit : 'BOX', type: '부자재',
      expand : false,
      select : false,

    },{

      id: uuid(), code: '1133288', name : '09케라시스비누미네랄발 100g(EX)', maker: '애경', unit : 'BOX', type: '원자재',
      expand : false,
      select : false,

    },
    
    {

      id: uuid(), code: '1133289', name : '09케라시스비누미네랄발 100g(EX)', maker: '애경', unit : 'BOX', type: '원자재',
      expand : false,
      select : false,

    },

    {

      id: uuid(), code: '1133290', name : '09케라시스비누미네랄발 100g(EX)', maker: '애경', unit : 'BOX', type: '원자재',
      expand : false,
      select : false,

    }


  
  
    ]
  
  },
    { id: uuid(), code: '1133288', name : '10바디앤비비타민B 100g비누 중국용', maker: '애경', unit : 'BOX', type: '완제품', check : false,
    expand : false, select : false,},
    { id: uuid(), code: '1133289', name : '18블루칩비누 100g헬스케어(특판용)', maker: '애경', unit : 'BOX', type: '완제품', check : false,
    expand : false,select : false, },
    { id: uuid(), code: '1133290', name : '18카라이스비누에너지 100g(EX/중국)', maker: '애경', unit : 'BOX', type: '완제품', check : false,
    expand : false, select : false,},
    { id: uuid(), code: '1133291', name : '18세트IDT 베리요거비누80G(정)', maker: '애경', unit : 'BOX', type: '완제품', check : false,
    expand : false, select : false,},
    { id: uuid(), code: '1133292', name : '18세트IDT 베리요거비누80G_헵CL', maker: '애경', unit : 'BOX', type: '완제품',  check : false,
    expand : false,select : false,},
    { id: uuid(), code: '1133293', name : '19리앙뜨C (EX) 100미네랄 발란스 비누', maker: '애경', unit : 'BOX', type: '완제품',  check : false,
    expand : false,select : false,},
    { id: uuid(), code: '1133294', name : '19Age20s (중국)다이아팩트 W21호', maker: '애경', unit : 'BOX', type: '완제품',  check : false,
    expand : false,select : false,},
   
    { id: uuid(), code: '1133298', name : '청정매직 훼이셜폼 비누 100G*720', maker: '한스텍', unit : 'EA', type: '완제품',  check : false,
    expand : false,select : false,},
    { id: uuid(), code: '1133299', name : '청정밸리 골드비누 100g O/B', maker: '한스텍', unit : 'EA', type: '완제품', check : false,
    expand : false, select : false,},


    { id: uuid(), code: '1133288', name : '10바디앤비비타민B 100g비누 중국용', maker: '애경', unit : 'BOX', type: '완제품', check : false,
    expand : false, select : false,},

  ]);

  const info_item_header : any = ['','번호','제조사','품번', '품명','단위','구분','기능'];
 
 
  const info_item_sub_header : any = ['','순서','제조사','품번', '품명','단위','구분','기능'];
  


  const info_item_maker_array : any = ['한스텍','애경'];
  const info_item_type_array : any = ['완제품','원자재','부자재','부분품'];
 

  const info_item_unit_array : any = ['EA','BOX']
  



  const info_item_modal_state : any = writable( {
    title : '',
    add : { use : false, title: ''},
    update : { use : false, title: ''},
    delete : { use : false, title: ''},
    check_delete : { use : false, title: ''},
    
     
   });

  const info_item_form_state : any = writable({
    id : 0,
    maker : '한스텍',
    code : '',
    name : '',
    unit : 'BOX',
    type : '완제품',
    child : [],
    expand : false,
    check : false,
    select : false,
  })

  


  export {info_item_data,info_item_header,info_item_sub_header,info_item_modal_state,info_item_form_state, info_item_type_array,info_item_unit_array,info_item_maker_array};