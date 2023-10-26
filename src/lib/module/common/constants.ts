
import { DateTime } from 'luxon';


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
        {name: '품목 관리', help: " 품목관리란, 원자재,부자재,반제품,부분품,완제품 등 제품생산 및 출하에 필요한 모든 재료를 말합니다."},
    
        {name: 'BOM 관리', help: "BOM 관리란, 제품 생산 및 출하에 필요한 모든 원자재/부자재/반제품/부분품 등을 리스트로 관리하여 필요시 생산 및 출하메뉴에서 불러오는 메뉴입니다."},
        {name: '거래처 관리', help: "업체에서 거래하는 거래처 관리 메뉴입니다. 영업처 또는 제조사가 될 수도 있습니다."},
        {name: '회원 관리', help: "MES 프로그램을 사용하는 사용자를 관리하는 메뉴입니다."},
        {name: '창고 관리', help: "원자재,부자재,반제품,부분품,완제품 등을 관리하는 메뉴입니다."},
        {name: 'Excel 관리', help: "기준정보를 Excel에 작성하여 업로드하기 위한 메뉴입니다."},
      ],
    project : [
        {name : '거래처 원장', help : "내용을 채워주세요",},
        {name : '수주 관리', help : "내용을 채워주세요",},
        {name : '생산지시 현황', help : "내용을 채워주세요",},
        {name : '납기 일정', help : "내용을 채워주세요",},
    ],
    process_equipment : [
        {name: '공정 관리', help: "생산에 필요한 공정을 관리하는 메뉴입니다."},
        {name: '설비 관리', help: "생산에 필요한 설비를 관리하는 메뉴입니다."},
    ],
    product : [
        {name : '작업지시 관리', help: "생산에 필요한 공정을 관리하는 메뉴입니다."},
        {name : '작업일보 현황', help: "생산에 필요한 공정을 관리하는 메뉴입니다."},
    ],
    shipment : [
        {name : '출하지시 관리', help: "출하에 필요한 출하지시를 관리하는 메뉴입니다."},
        {name : '출하 현황', help: "출하에 필요한 현황을 관리하는 메뉴입니다."},

    ],
}


const TOAST_SAMPLE = {
   
    success : {type : 'success', value : false, counter : 2},
    fail : {type : 'fail', value : false, counter : 2}
    
}



const TABLE_HEADER_CONFIG : any = {
    product : [
        {formatter:"rowSelection",width : 60, titleFormatter:"rowSelection", hozAlign:"center", headerSort:false, cellClick:function(e : any, cell:any){cell.getRow().toggleSelect();}},
        {title:"ID", field:"uid", width:150, headerFilter:"input",editor:true},
        {title:"상품명", field:"name", width:150, headerFilter:"input",editor:true},


        {title:"단위명", field:"unit.name", width:150, headerFilter:"input",editor:true},

        {title:"등록일", field:"created", hozAlign:"center", sorter:"date",  headerFilter:"input", 
        formatter: function(cell : any, formatterParams: any, onRendered: any) {
            // Luxon을 사용하여 datetime 값을 date로 변환
            const datetimeValue = cell.getValue();
            const date = DateTime.fromISO(datetimeValue).toFormat("yyyy-MM-dd");
            return date;
        },
       

        
    
    
    }],
}


const TABLE_TOTAL_CONFIG : any = {
    layout: "fitData",
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
                "name":"Name", //replace the title of column name with the value "Name"
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
                    "showing": "Showing",
                    "of": "of",
                    "rows": "rows",
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
    TABLE_HEADER_CONFIG
   

}