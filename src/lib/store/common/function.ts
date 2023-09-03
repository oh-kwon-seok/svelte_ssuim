// @ts-nocheck


import { writable } from 'svelte/store';
import {common_alert_state,common_toast_state, menu_state,url_state,load_state,common_search_state,login_state,common_maker_state, common_type_state, common_unit_state } from './state';
import {item_data,item_form_state} from '$lib/store/info/item/state';
import axios from 'axios';
import {v4 as uuid} from 'uuid';
import Excel from 'exceljs';
import moment from 'moment';


import {TabulatorFull as Tabulator} from 'tabulator-tables';

    
import 'tabulator-tables-css'; // CSS 파일이 import됩니다.


const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

let alert_data : any;
let toast_data : any;
let item_form_data : any;
let load_data : any;
let menu_data : any;
let search_data : any;
let list_data : any;
let login_data : any;
let url_data : any;

let maker_data : any;
let type_data : any;
let unit_data : any;


const workbook = new Excel.Workbook();



common_alert_state.subscribe((data : any) => {
  alert_data = data;
})

common_toast_state.subscribe((data : any) => {
  toast_data = data;
})

load_state.subscribe((data : any) => {
  load_data = data;
})

menu_state.subscribe((data : any) => {
  menu_data = data;
})

url_state.subscribe((data : any) => {
  url_data = data;
})


common_search_state.subscribe((data : any) => {
    search_data = data;
})

item_data.subscribe((data) => {
  list_data = data;

})

item_form_state.subscribe((data) => {
  item_form_data = data;

})


login_state.subscribe((data) => {
  login_data = data;

})

common_maker_state.subscribe((data : any) => {
  maker_data = data;
})

common_type_state.subscribe((data : any) => {
  type_data = data;
})

common_unit_state.subscribe((data : any) => {
  unit_data = data;
})


const infoCallApi = (title) => {
  
  const url = `/api/${title}/select`; 
  try {
    axios.get(url).then(res=>{
      if(res.data.length > 0){
        if(title === 'maker'){
          maker_data = res.data;
          common_maker_state.update(()=> maker_data);
          item_form_data['maker'] = maker_data[0]['maker_code'];
        }else if(title === 'unit'){
          unit_data = res.data;
          common_unit_state.update(()=> unit_data);
          item_form_data['unit'] = maker_data[0]['unit_code'];
        }else if(title === 'type'){
          type_data = res.data;
          common_type_state.update(()=> type_data);
          item_form_data['type'] = maker_data[0]['type_code'];
        }
        item_form_state.update(()=> item_form_data);

      }else {
      
      }
   })
  }catch(e){
    console.log('e',e);
  } finally {
    console.log('final : ');
  }
  }




const changeUrl = (obj) => {
  
  
  
  url_data['path'] =obj['path'];
  url_data['query'] =obj['query'];

  console.log('url_data',url_data);
  
  url_state.update(()=> url_data);


  }



  const commonCloseAlert = (state) => {
   
    alert_data = {type : state, value : false} 

    
    common_alert_state.update(()=> alert_data);
  
    }

    const commonCloseToast = (state) => {
   
      toast_data = {type : state, value : false, counter : 4} 
  
      
      common_toast_state.update(()=> toast_data);
    
      }




const onChangeHandler = (e) => {
  let title = e.target.name;
  
  
  login_data[title] = e.target.value;
  login_state.update(()=> login_data);

  console.log(login_data);
  }


  const handleToggle = (title) => {
   
    console.log('title', title);
    
    menu_data[title] = !menu_data[title];
    menu_state.update(()=> menu_data);
  
    
    }


    const loadChange = (param) => {
      load_data = param;
      load_state.update(()=> load_data);
      
    }
const onSearchHandler = (e : any) => { 

    search_data['search_text'] = e.target.value;
    
    console.log('e.target.value',e.target.value);
    if(search_data['type'] === 'all'){
      search_data['filteredItems'] = list_data.filter((item) => item['maker'].indexOf(search_data['search_text'].toLowerCase()) !== -1 || item['name'].indexOf(search_data['search_text'].toLowerCase()) !== -1)
    }else {
      search_data['filteredItems'] = list_data.filter((item) => item[search_data['type']].indexOf(search_data['search_text'].toLowerCase()) !== -1);
    }
    
    
    common_search_state.update(()=> search_data);
   
}


const cellClick = (data, key,value) => {
      
  if(key === 'expand' || key === 'check' ){
    for(let i =0; i<data.length; i++){
      if(value === data[i].code){
        
        data[i][key] = !data[i][key];
        break;
      }
    }

  }
  
  search_data['filteredItems'] = data;
  common_search_state.update(()=> search_data);
}

const rowClick = (data, key,value) => {
      
  if(key === 'select' ){
    for(let i =0; i<data.length; i++){
      if(data[i]['select'] === true){
        data[i][key] = !data[i][key];

      }
      if(value === data[i].code){
        
        data[i][key] = !data[i][key];
       
      }
    }

  }
  
  search_data['filteredItems'] = data;
  common_search_state.update(()=> search_data);
}

const allCheckClick = (data, key,value) => {
      
  if(key === 'check'){
    for(let i =0; i<data.length; i++){
        data[i][key] = !value;
    }
  }
  
  search_data['all_check'] = !value;
  search_data['filteredItems'] = data;
  common_search_state.update(()=> search_data);
}

const check_delete = (data, key,value) => {
      
  let setData = data.filter(item => item.check === false);


  search_data['filteredItems'] = setData;
   search_data['all_check'] = false;
  common_search_state.update(()=> search_data);
}




const excelDownload = (data,title,config) => {
    
    try {
      // 엑셀 생성

      // 생성자
      workbook.creator = '작성자';
     
      // 최종 수정자
      workbook.lastModifiedBy = '최종 수정자';
     
      // 생성일(현재 일자로 처리)
      workbook.created = new Date();
     
      // 수정일(현재 일자로 처리)
      workbook.modified = new Date();
   
   
      // addWorksheet() 함수를 사용하여 엑셀 시트를 추가한다.
      // 엑셀 시트는 순차적으로 생성된다.
      workbook.addWorksheet('Sheet One');
      workbook.addWorksheet('Sheet Two');
      workbook.addWorksheet('Sheet Three');
     
      // 엑셀 시트를 접근하는 방법은 세 가지 방법이 존재한다.
      // 1. getWorksheet() 함수에서 시트 명칭 전달
      const sheetOne = workbook.getWorksheet('Sheet One');
     
      // 2. getWorksheet() 함수에서 시트 인덱스 전달
      const sheetTwo = workbook.getWorksheet(1);
     
      // 3. 대괄호 표기법
      const sheetThree = workbook.worksheets[2];
     
      // removeWorksheet() 함수를 사용하여 엑셀 시트를 제거한다.
      workbook.removeWorksheet(sheetThree.id);
   
      // 컬럼 설정
      // header: 엑셀에 표기되는 이름
      // key: 컬럼을 접근하기 위한 key
      // hidden: 숨김 여부
      // width: 컬럼 넓이
      sheetOne.columns = config;
   
      const sampleData = data;
      const borderStyle = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
     
      sampleData.map((item, index) => {
        sheetOne.addRow(item);
     
        // 추가된 행의 컬럼 설정(헤더와 style이 다를 경우)
        
        for(let loop = 1; loop <= 6; loop++) {
          const col = sheetOne.getRow(index + 2).getCell(loop);
          col.border = borderStyle;
          col.font = {name: 'Arial Black', size: 10};
        }
      
    });
    let text_title : any= '';
    switch(title){
        case 'info_item': 
            text_title = '품목 관리';
        break;
        
        default:
            text_title = '제목 없음';
        break;
  }

        
   
      workbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = text_title + moment().format('YYYY-MM-DD') + '.xlsx';
        anchor.click();
        window.URL.revokeObjectURL(url);
      })
    } catch(error) {
      console.error(error);
    }
  }

  const fileButtonClick = (id) => {

    try {
      let myInput : any = document.getElementById(id);
      myInput.click();
    } catch(error) {
      console.error(error);
    }
  }

  const excelUpload = (e,config) => {
    
    const wb = new Excel.Workbook();
    const reader = new FileReader()

    let file = e.target.files[0];


    

  
    reader.readAsArrayBuffer(file)
    reader.onload = () => {
      let change_data = [];
      const buffer = reader.result;
      wb.xlsx.load(buffer).then(workbook => {
        console.log(workbook, 'workbook instance')
        workbook.eachSheet((sheet, id) => {
          sheet.eachRow((row, rowIndex) => {
            console.log(row.values, rowIndex);
            if(rowIndex > 1){
            let obj = {

            };
            for(let i=0; i<config.length; i++){
              obj[config[i].key] = row.values[i+1];

            }
            obj['expand'] = false;
            obj['check'] = false;
            change_data.push(obj);

            list_data = change_data;
          }else {

          }
           

           

          
          });
          item_data.update(() => list_data);
          search_data['filteredItems'] = list_data;
          common_search_state.update(() => search_data);
          
          console.log('change Data  :' , change_data);

        })
      })
     
    }
   
  }

  const minMaxFilterFunction = (headerValue, rowValue, rowData, filterParams) => {
    //headerValue - the value of the header filter element
    //rowValue - the value of the column in this row
    //rowData - the data for the row being filtered
    //filterParams - params object passed to the headerFilterFuncParams property
    
        if(rowValue){
            if(headerValue.start != ""){
                if(headerValue.end != ""){
                    return rowValue >= headerValue.start && rowValue <= headerValue.end;
                }else{
                    return rowValue >= headerValue.start;
                }
            }else{
                if(headerValue.end != ""){
                    return rowValue <= headerValue.end;
                }
            }
        }
    
    return true; //must return a boolean, true if it passes the filter.
    }


      const minMaxFilterEditor = (cell, onRendered, success, cancel, editorParams) =>{

      var end;
      
      var container = document.createElement("span");
      
      //create and style inputs
      var start = document.createElement("input");
      start.setAttribute("type", "number");
      start.setAttribute("placeholder", "Min");
      start.setAttribute("min", 0);
      start.setAttribute("max", 100);
      start.style.padding = "4px";
      start.style.width = "50%";
      start.style.boxSizing = "border-box";
      
      start.value = cell.getValue();
      
      function buildValues(){
          success({
              start:start.value,
              end:end.value,
          });
      }
      
      function keypress(e){
          if(e.keyCode == 13){
              buildValues();
          }
      
          if(e.keyCode == 27){
              cancel();
          }
      }
      
      end = start.cloneNode();
      end.setAttribute("placeholder", "Max");
      
      start.addEventListener("change", buildValues);
      start.addEventListener("blur", buildValues);
      start.addEventListener("keydown", keypress);
      
      end.addEventListener("change", buildValues);
      end.addEventListener("blur", buildValues);
      end.addEventListener("keydown", keypress);
      
      
      container.appendChild(start);
      container.appendChild(end);
      
      return container;
      }



      const makeTable = (tableComponent,data) => {
        let table;

        table =   new Tabulator(tableComponent, {
        // height:"311px",
       
        layout:"fitColumns",
        pagination:"local",
      
        paginationSize:10,
        paginationSizeSelector:[10, 50, 100,5000],

        movableColumns:true,
        paginationCounter:"rows",

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
            "headerFilters":{
                "default":"filter column...", //default header filter placeholder text
                "columns":{
                    "name":"filter name...", //replace default header filter text for column name
                }
            }
        }
    },

    rowFormatter:function(row){
          row.getElement().classList.add("table-primary"); //mark rows with age greater than or equal to 18 as successful;
      
    },

        paginationAddRow:"table", //add rows relative to the table
   
    
        data : data,
        columns:[
            {formatter:"rowSelection",width : 60, titleFormatter:"rowSelection", hozAlign:"center", headerSort:false, cellClick:function(e, cell){
                cell.getRow().toggleSelect();
            }},

            {title:"상품명", field:"name", width:150, headerFilter:"input",editor:true},
            {title:"단위", field:"standard", editor:"list", editorParams:{values:{"1바구니":"1바구니", "1단":"1단", clearable:true}}, headerFilter:true, headerFilterParams:{values:{"1바구니":"1바구니", "1단":"1단", "":""}, clearable:true}},
            {title:"등록일", field:"created_at", hozAlign:"center", sorter:"date",  headerFilter:"input"}],
    });

    
    }







   


export {handleToggle, 
  onChangeHandler, 
  onSearchHandler,
  excelDownload,
  excelUpload,
  fileButtonClick, 
  allCheckClick, 
  cellClick, 
  rowClick, 
  check_delete, 
  changeUrl,
  loadChange,
  commonCloseAlert,
  commonCloseToast,
  infoCallApi,
  minMaxFilterFunction,
  minMaxFilterEditor,
  makeTable,

}