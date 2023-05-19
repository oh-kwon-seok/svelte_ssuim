// @ts-nocheck


import { writable } from 'svelte/store';
import {menu_state,url_state,load_state,common_search_state,login_state} from './state';
import {info_item_data} from '$lib/store/info/item/state';

import {v4 as uuid} from 'uuid';
import Excel from 'exceljs';
import moment from 'moment';

let load_data : any;
let menu_data : any;
let search_data : any;
let list_data : any;
let login_data : any;

let url_data : any;



const workbook = new Excel.Workbook();


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

info_item_data.subscribe((data) => {
  list_data = data;

})

login_state.subscribe((data) => {
  login_data = data;

})


const changeUrl = (obj) => {
  
  
  
  url_data['path'] =obj['path'];
  url_data['query'] =obj['query'];

  console.log('url_data',url_data);
  
  url_state.update(()=> url_data);


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
          info_item_data.update(() => list_data);
          search_data['filteredItems'] = list_data;
          common_search_state.update(() => search_data);
          
          console.log('change Data  :' , change_data);

        })
      })
     
    }
   
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
  loadChange}