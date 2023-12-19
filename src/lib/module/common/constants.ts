
import { DateTime } from 'luxon';


import {product_modal_state} from '$lib/store/product/state';

import {table_state} from '$lib/store/common/state';



import {productModalOpen} from '$lib/store/product/function';
import {shipModalOpen} from '$lib/store/ship/function';
import { phoneNumber,businessNumber } from './function';

import { userModalOpen} from '$lib/store/user/function';


let table_data : any;
table_state.subscribe((data : any) => {
    table_data = data;
  })
  

const LOGIN_ALERT = {
    type : 'success',
    title : '로그인',
    content : '로그인에 실패했습니다. 계정 및 비밀번호를 확인해주십시오,',
    
}

const DATA_SUCCESS_ALERT = {
    color : 'blue',
    data : [{
        title : '저장', 
        content : '데이터 저장에 성공했습니다.',
    },
    {
        title : '수정', 
        content : '데이터 수정에 성공했습니다.',
    },
    {
        title : '삭제', 
        content : '데이터 삭제에 성공했습니다.',
    }]
}


const DATA_FAIL_ALERT = {
    color : 'red',
    add : {title : '추가', content : '데이터 저장에 실패했습니다.'},

    update : {title : '수정', content : '데이터 수정에 실패했습니다.'},
    delete : {title : '삭제', content : '데이터 삭제에 실패했습니다.'},
    check_delete : {title : '선택 삭제', content : '데이터 선택 삭제에 실패했습니다.'},
    
}

const DATA_SELECT_ALERT = {
    color : 'red',
    select : {title : '실패', content : '데이터를 1개 이상 선택해주세요.'},
}

const MENU = {
    info : [
        {id : 'product',name: '품목 관리', help: " 품목관리란, 상품 및 제품의 박스수량 및 제원을 통일화하여 관리하기 위한 기능입니다."},
    
        {id : 'ship',name: '물류센터 관리', help: "물류센터 관리란, 해당 물류센터 정보를 관리하여 엑셀에 연동하기 위해 구성합니다."},

      ],
      customer : [
        {id : 'user',name: '회원 관리', help: " 회원관리란, 회원 정보를 관리하기 위한기능을 뜻합니다."},
    
      ],

}


const TOAST_SAMPLE = {
   
    success : {type : 'success', value : false, counter : 2},
    fail : {type : 'fail', value : false, counter : 2}
    
}


const TABLE_FILTER : any = {
    product : [
    {value : "all",name : "전체"},
    {value : "sk_uid", name : "SKU ID"},
    {value : "ship_name", name : "SKU NAME"},
    {value : "origin_name", name : "마감명"},
    {value : "inbox", name : "인박스"},
    {value : "outbox", name : "아웃박스"},
    ],

    user : [
        {value : "all",name : "전체"},
        {value : "id", name : "ID"},
        {value : "name", name : "이름"},
        {value : "email", name : "이메일"},
        {value : "phone", name : "연락처"},
    ],
    ship : [
        {value : "all",name : "전체"},
        {value : "area", name : "지역"},
        {value : "receive_user", name : "수령인"},
        {value : "phone1", name : "연락처1"},
        {value : "phone2", name : "연락처2"},
        {value : "address", name : "주소"},
        ],
}

const EXCEL_CONFIG : any = {
    product : [
    {header: '번호코드', key: 'uid', width: 30},
    {header: 'SKU ID', key: 'sk_uid', width: 30},
    {header: 'SKU NAME', key: "ship_name", width: 30},
    {header: 'ORIGIN_NAME', key: 'origin_name', width: 30},
    {header: '인박스', key: 'inbox', width: 30},
    {header: '아웃박스', key: 'outbox', width: 30},
    {header: '수량', key: 'qty', width: 30},
    {header: '공급가', key: 'price', width: 30},
    
    ],
  
    user : [
        {header: 'ID', key: 'id', width: 30},
        {header: '대표자명', key: 'name', width: 30},
        {header: '연락처', key: 'phone', width: 30},
        {header: '이메일', key: 'email', width: 30},
        {header: '등록일', key: 'created', width: 30},
    ],

    ship : [
        {header: '번호코드', key: 'uid', width: 30},
        {header: '지역', key: 'area', width: 30},
        {header: '수령인', key: "receive_user", width: 30},
        {header: '연락처1', key: 'phone1', width: 30},
        {header: '연락처2', key: 'phone2', width: 30},
        {header: '주소', key: 'address', width: 30},
       
        ],
  
}; 


const TABLE_HEADER_CONFIG : any = {
    product : [
        {formatter:"rowSelection",width : 60, field: "selected", titleFormatter:"rowSelection", hozAlign:"center", headerSort:false, 
        cellClick:function(e : any, cell:any){
            cell.getRow().toggleSelect()
        }},
        {title:"SKU ID", field:"sk_uid", width:150, headerFilter:"input"},
        {title:"SKU NAME", field:"ship_name", width:250, headerFilter:"input", 
        formatter:function(cell : any){
            var value = cell.getValue();
        return "<span style='color:#3FB449; font-weight:bold;'>" + value + "</span>";
         },

        cellClick:function(e : any, cell:any){
            let row = cell.getRow();
           if(row){
            productModalOpen(row.getData(),"update");
           }else{
          
           }
        }
    },
        {title:"마감명", field:"origin_name", width:250, headerFilter:"input"},
        
        {title:"인박스", field:"inbox", width:150, headerFilter:"input"},
        {title:"아웃박스", field:"outbox", width:150, headerFilter:"input"},
        {title:"박스수량", field:"qty", width:150},
        
        {title:"등록일", field:"created", hozAlign:"center", sorter:"date",  headerFilter:"input", 
        formatter: function(cell : any, formatterParams: any, onRendered: any) {
            // Luxon을 사용하여 datetime 값을 date로 변환
            const datetimeValue = cell.getValue();
            const date = DateTime.fromISO(datetimeValue).toFormat("yyyy-MM-dd");
            return date;
        },

    }],

    user : [
        {formatter:"rowSelection",width : 60, field: "selected", titleFormatter:"rowSelection", hozAlign:"center", headerSort:false, 
        cellClick:function(e : any, cell:any){
            cell.getRow().toggleSelect()
        }},
        {title:"ID", field:"id", width:150, headerFilter:"input"},
        {title:"이름", field:"name", width:150, headerFilter:"input", 
        formatter:function(cell : any){
            var value = cell.getValue();
            
        return "<span style='color:#3FB449; font-weight:bold;'>" + value + "</span>";
         },

        cellClick:function(e : any, cell:any){
            let row = cell.getRow();
           if(row){
            userModalOpen(row.getData(),"update");
           }else{
          
           }
        }
        },
        {title:"연락처", field:"phone", width:150, headerFilter:"input", formatter:function(cell : any){
            var value = cell.getValue();
        return phoneNumber(value);
         },},
  
        {title:"이메일", field:"email", width:150, headerFilter:"input"},
        
        {title:"등록일", field:"created", hozAlign:"center", sorter:"date",  headerFilter:"input", 
        formatter: function(cell : any, formatterParams: any, onRendered: any) {
            // Luxon을 사용하여 datetime 값을 date로 변환
            const datetimeValue = cell.getValue();
            const date = DateTime.fromISO(datetimeValue).toFormat("yyyy-MM-dd");
            return date;
        }},     
    
   ],

   ship : [
    {formatter:"rowSelection",width : 60, field: "selected", titleFormatter:"rowSelection", hozAlign:"center", headerSort:false, 
    cellClick:function(e : any, cell:any){
        cell.getRow().toggleSelect()
    }},
    {title:"지역", field:"area", width:150, headerFilter:"input"},
    {title:"수령인", field:"receive_user", width:150, headerFilter:"input", 
    formatter:function(cell : any){
        var value = cell.getValue();
    return "<span style='color:#3FB449; font-weight:bold;'>" + value + "</span>";
     },

    cellClick:function(e : any, cell:any){
        let row = cell.getRow();
       if(row){
        shipModalOpen(row.getData(),"update");
       }else{
      
       }
    }
},
    {title:"연락처1", field:"phone1", width:150, headerFilter:"input"},
    
    {title:"연락처2", field:"phone2", width:150, headerFilter:"input"},
    {title:"주소", field:"address", width:300, headerFilter:"input"},

    
    {title:"등록일", field:"created", hozAlign:"center", sorter:"date",  headerFilter:"input", 
    formatter: function(cell : any, formatterParams: any, onRendered: any) {
        // Luxon을 사용하여 datetime 값을 date로 변환
        const datetimeValue = cell.getValue();
        const date = DateTime.fromISO(datetimeValue).toFormat("yyyy-MM-dd");
        return date;
    },

}],



}


let TABLE_COMPONENT : any = "example-table-theme";


const TABLE_TOTAL_CONFIG : any = {
    layout: "fitDataTable",
    pagination:"local",
  
    paginationSize:10,
    paginationSizeSelector:[10, 50, 100,5000],

    movableColumns:true,
    paginationCounter:"rows",
    paginationAddRow:"table", //add rows relative to the table
    height : "50vh",
    locale: "ko-kr",
    langs:{
        "ko-kr":{
            "columns":{
                // "name":"Name",
                 //replace the title of column name with the value "Name"
            
            },
            "data":{
                "loading":"Loading", //data loader text
                "error":"Error", //data error text
            },
            "groups":{ //copy for the auto generated item count in group header
                "item":"item", //the singular  for item
                "items":"items", //the plural for items
            },
            "pagination":{
            	"page_size":"행 개수", //label for the page size select element
                "page_title":"Show Page",//tooltip text for the numeric page button, appears in front of the page number (eg. "Show Page" will result in a tool tip of "Show Page 1" on the page 1 button)
                "first":"처음", //text for the first page button
                "first_title":"첫 페이지", //tooltip text for the first page button
                "last":"뒤 페이지",
                "last_title":"뒤 페이지",
                "prev":"이전",
                "prev_title":"이전 페이지",
                "next":"다음",
                "next_title":"다음 페이지",
                "all":"전체",
                "counter":{
                    "showing": "보여지기",
                    "of": "중",
                    "rows": "행",
                    "pages": "pages",
                }
            },
            
        }
    },
    rowFormatter:function(row : any){
        row.getElement().classList.add("table-primary"); //mark rows with age greater than or equal to 18 as successful;
     
  },

   
  
  
    
}






export {
    LOGIN_ALERT,
    DATA_SELECT_ALERT,
    DATA_SUCCESS_ALERT,
    DATA_FAIL_ALERT,
    MENU,
    TOAST_SAMPLE,
    TABLE_TOTAL_CONFIG,
    TABLE_HEADER_CONFIG,
    TABLE_COMPONENT,
    TABLE_FILTER,
    EXCEL_CONFIG
}


