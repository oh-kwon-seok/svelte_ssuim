// @ts-nocheck


import { writable } from 'svelte/store';
import {common_alert_state,common_toast_state, menu_state,url_state,load_state,common_search_state,login_state,common_product_state,common_ship_state,common_user_state,table_state,coopang_upload_state,coopang_upload_result_state,coopang_shipment_state,hanjin_upload_state,hanjin_transport_upload_state, box_qty_state, milkrun_qty_state } from './state';

// import {item_data,item_form_state} from '$lib/store/info/item/state';

import {TABLE_TOTAL_CONFIG,TABLE_HEADER_CONFIG,TABLE_FILTER} from '$lib/module/common/constants';

import axios from 'axios';
import {v4 as uuid} from 'uuid';
import Excel from 'exceljs';
import moment from 'moment';


import {TabulatorFull as Tabulator} from 'tabulator-tables';
import type { an } from 'vitest/dist/types-71ccd11d';


const api = import.meta.env.VITE_API_BASE_URL;




    
let alert_data : any;
let toast_data : any;
// let item_form_data : any;
let load_data : any;
let menu_data : any;
let search_data : any;
let list_data : any;
let login_data : any;
let url_data : any;

let table_data : any;

let product_data : any;
let ship_data : any;
let coopang_upload_data : any;

let coopang_upload_result_data : any;

let coopang_shipment_data : any;

let hanjin_upload_data : any;

let hanjin_transport_upload_data : any;

let user_data : any;

let milkrun_qty_data : any;
let box_qty_data : any;




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

login_state.subscribe((data) => {
  login_data = data;

})

table_state.subscribe((data : any) => {
  table_data = data;
})


common_product_state.subscribe((data : any) => {
  product_data = data;
})
common_ship_state.subscribe((data : any) => {
  ship_data = data;
})

common_user_state.subscribe((data) => {
  user_data = data;

})

coopang_upload_state.subscribe((data) => {
  coopang_upload_data = data;

})

coopang_upload_result_state.subscribe((data) => {
  coopang_upload_result_data = data;

})

hanjin_upload_state.subscribe((data) => {
  hanjin_upload_data = data;

})
hanjin_transport_upload_state.subscribe((data) => {
  hanjin_transport_upload_data = data;

})

milkrun_qty_state.subscribe((data) => {
  milkrun_qty_data = data;

})


box_qty_state.subscribe((data) => {
  milkrun_qty_data = data;

})


const infoCallApi = (title) => {


 
  const url = `${api}/${title}/info_select`; 

  const config = {
    headers:{
      "Content-Type": "application/json",
      
    }
  }

  try {
    axios.get(url,config).then(res=>{
   
  
      if(res.data.length > 0){
        if(title === 'product'){
          product_data = res.data;
          common_product_state.update(()=> product_data);
        } else if(title === 'ship'){
          ship_data = res.data;
          common_ship_state.update(()=> ship_data);
        }
      

      }else {
      
      }
   })
  }catch(e){
  
  } finally {
  
  }
  }



 





const changeUrl = (obj) => {
  
  
  
  url_data['path'] =obj['path'];
  url_data['query'] =obj['query'];

  
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

  }
  const tokenChange = (token) => {
    
    login_data['token'] = token;
    login_state.update(()=> login_data);
  
    }


  const handleToggle = (title) => {
   
    
    menu_data[title] = !menu_data[title];
    menu_state.update(()=> menu_data);
  
    
    }


    const loadChange = (param) => {
      load_data = param;
      load_state.update(()=> load_data);
      
    }
const onSearchHandler = (e : any) => { 

    search_data['search_text'] = e.target.value;
    
    // if(search_data['type'] === 'all'){
    //   search_data['filteredItems'] = list_data.filter((item) => item['maker'].indexOf(search_data['search_text'].toLowerCase()) !== -1 || item['name'].indexOf(search_data['search_text'].toLowerCase()) !== -1)
    // }else {
    //   search_data['filteredItems'] = list_data.filter((item) => item[search_data['type']].indexOf(search_data['search_text'].toLowerCase()) !== -1);
    // }
    
    
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




const productSendDownload = () => {
  const product_send_config : any = [
    {header: '구분', key: '구분', width: 5},
    {header: '제품명', key: '제품명', width: 30},
    {header: '수량(여유공간)', key: '수량', width: 5},
    {header: '박스(최대수량)', key: '박스', width: 5},
    {header: '발주처', key: '발주처', width: 10},
    {header: '발주번호', key: '발주번호', width: 10},
    {header: '유통기한', key: '유통기한', width: 5},
    {header: '비고', key: '비고', width: 5},
  ]; 

  const coopang_download_config : any = [
    {header: '구분', key: '구분', width: 5},
    {header: '제품명', key: '제품명', width:60},
    {header: '바코드', key: '상품바코드', width: 20},
    {header: '수량', key: '확정수량', width: 5},
    {header: '유통기한', key: '유통기한', width: 10},
  ]; 

  const coopang_milk_run_download_config : any = [
    {header: '구분', key: '구분', width: 30},
    {header: '제품명', key: '제품명', width: 30},
    {header: '바코드', key: '상품바코드', width: 30},
    {header: '수량', key: '확정수량', width: 30},
    {header: '유통기한', key: '유통기한', width: 30},
  ]; 


  try {

    let product_title : any= '총괄수량';
    let product_title2 : any= '택배수량';
    let product_title3 : any= '밀크런';
    let product_title4 : any= '보류_밀크런';
    
    
    
    
  const workbook = new Excel.Workbook();
    // 엑셀 생성

    // 생성자
    workbook.creator = '작성자';
   
    // 최종 수정자
    workbook.lastModifiedBy = '최종 수정자';
   
    // 생성일(현재 일자로 처리)
    workbook.created = new Date();
   
    // 수정일(현재 일자로 처리)
    workbook.modified = new Date();

    let file_name = '생산부 전달용' + moment().format('YYYY-MM-DD HH:mm:ss') + '.xlsx';
    

  
    workbook.addWorksheet(product_title);
    workbook.addWorksheet(product_title2);
    workbook.addWorksheet(product_title3);
    workbook.addWorksheet(product_title4);
    
    

    const sheetOne = workbook.getWorksheet(product_title);
    const sheetTwo = workbook.getWorksheet(product_title2);
    const sheetThree = workbook.getWorksheet(product_title3);
    const sheetFour = workbook.getWorksheet(product_title4);
    
         
         
          
    // 컬럼 설정
    // header: 엑셀에 표기되는 이름
    // key: 컬럼을 접근하기 위한 key
    // hidden: 숨김 여부
    // width: 컬럼 넓이
    sheetOne.columns = coopang_download_config;
    sheetTwo.columns = product_send_config;
    sheetThree.columns = coopang_download_config;
    sheetFour.columns = coopang_download_config;
    

    const borderStyle = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    

    sheetOne.getRow(1).eachCell((cell) => {
      cell.alignment = { horizontal: 'center',vertical: 'middle' };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });
    sheetTwo.getRow(1).eachCell((cell) => {
      cell.alignment = { horizontal: 'center',vertical: 'middle' };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });
    sheetThree.getRow(1).eachCell((cell) => {
      cell.alignment = { horizontal: 'center',vertical: 'middle' };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });
    sheetFour.getRow(1).eachCell((cell) => {
      cell.alignment = { horizontal: 'center',vertical: 'middle' };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });
    

console.log('coopang_', coopang_upload_result_data);
console.log('coopang_', coopang_upload_data);

let filtered_coopang_data = coopang_upload_data.filter((item)=> {
  return typeof item.발주번호 === 'number';
});









// id를 기준으로 그룹화하고 qty를 더하는 함수
const totalCoopangData = (accumulator, currentValue) => {
  const updatedAccumulator = accumulator.map(item => ({ ...item })); // 새로운 배열을 만들어서 복사

  const existingItem = updatedAccumulator.find(item => item['상품번호'] === currentValue['상품번호']);

  if (existingItem) {
    // 이미 있는 경우, 기존 상품의 수량을 더함
    existingItem['확정수량'] += currentValue['확정수량'];
  } else {
    // 없는 경우, 새로운 아이템을 추가
    updatedAccumulator.push({ ...currentValue }); // 새로운 아이템 추가 시 복사
  }

  return updatedAccumulator;
};




// reduce 함수를 사용하여 배열을 처리
const product_total_data = filtered_coopang_data.reduce(totalCoopangData, []);





product_total_data.map((item, index) => {
  item['구분'] = index+1;
  item['상품바코드'] = item['상품바코드'].toString(); 

  sheetOne.addRow(item);
  for(let loop = 1; loop <= 5; loop++) {
    const col = sheetOne.getRow(index + 2).getCell(loop);
    if(loop === 1 || loop === 3 || loop === 4){
      col.alignment = { horizontal: 'center',vertical: 'middle' };

    }else{
      col.alignment = { vertical: 'middle' };
    }
    col.border = borderStyle;
    col.font = {name: 'Arial Black', size: 8};
  }
});

sheetOne.properties.defaultRowHeight = 30;
sheetTwo.properties.defaultRowHeight = 30;
sheetThree.properties.defaultRowHeight = 30;
sheetFour.properties.defaultRowHeight = 30;






const milk_run_result = [];
const milk_run_temp_result = [];

const box_result = [];

// 물류센터별 수량을 더하고, 10 이상인 경우 별도의 배열로 분류
const result_centerSums = {};
const centerSums = {};

coopang_upload_result_data.forEach(item => {
  const center = item["물류센터"];
  const quantity = 1;
  // 중복된 물류센터가 나올 경우 합산
  result_centerSums[center] = (result_centerSums[center] || 0) + quantity;

  });
  coopang_upload_result_data.forEach(item => {
    const center = item["물류센터"];
     if (result_centerSums[center] < 10) {
      if (!box_result.includes(center)) {
        box_result.push(item);
      }
 
  }else{
  }

  });



  filtered_coopang_data.forEach(item => {
      const center = item["물류센터"];
      const quantity = item["실제박스수량"];
      // 중복된 물류센터가 나올 경우 합산
      centerSums[center] = (centerSums[center] || 0) + quantity;
    
      });
      filtered_coopang_data.forEach(item => {
        const center = item["물류센터"];
      
         if (centerSums[center] >= 13) {
        // 이미 결과 배열에 해당 물류센터가 없으면 추가
        if (!milk_run_result.includes(center)) {
          milk_run_result.push(item);
        }
      }else if(centerSums[center] > 9 && centerSums[center] < 13 ){
        if (!milk_run_temp_result.includes(center)) {
          milk_run_temp_result.push(item);
        }
    
      }
    
        });

   







const sortedBoxData = box_result.sort((a, b) => {
  const centerA = a["물류센터"];
  const centerB = b["물류센터"];

  if (centerA < centerB) return -1;
  if (centerA > centerB) return 1;
  return 0;
});




sortedBoxData.map((item, index) => {
  item['구분'] = index+1;
  sheetTwo.addRow(item);

  // 추가된 행의 컬럼 설정(헤더와 style이 다를 경우)

  for(let loop = 1; loop <= 6; loop++) {
    const col = sheetTwo.getRow(index + 2).getCell(loop);
    col.border = borderStyle;
    col.font = {name: 'Arial Black', size: 10};
  }

});


const sortedMilkrunData = milk_run_result.sort((a, b) => {
  const centerA = a["물류센터"];
  const centerB = b["물류센터"];

  if (centerA < centerB) return -1;
  if (centerA > centerB) return 1;
  return 0;
});

  
sortedMilkrunData.map((item, index) => {
  item['구분'] = index+1;
  item['상품바코드'] = item['상품바코드'].toString(); 
  sheetThree.addRow(item);

  // 추가된 행의 컬럼 설정(헤더와 style이 다를 경우)

  for(let loop = 1; loop <= 5; loop++) {
    const col = sheetThree.getRow(index + 2).getCell(loop);
    if(loop === 1 || loop === 3 || loop === 4){
      col.alignment = { horizontal: 'center',vertical: 'middle' };

    }else{
      col.alignment = { vertical: 'middle' };
    }
    col.border = borderStyle;
    col.font = {name: 'Arial Black', size: 8};
  }

});

const sortedMilkrunTempData = milk_run_temp_result.sort((a, b) => {
  const centerA = a["물류센터"];
  const centerB = b["물류센터"];

  if (centerA < centerB) return -1;
  if (centerA > centerB) return 1;
  return 0;
});


sortedMilkrunTempData.map((item, index) => {
  item['구분'] = index+1;
  item['상품바코드'] = item['상품바코드'].toString(); 
  sheetFour.addRow(item);

  // 추가된 행의 컬럼 설정(헤더와 style이 다를 경우)

  for(let loop = 1; loop <= 5; loop++) {
    const col = sheetFour.getRow(index + 2).getCell(loop);
    if(loop === 1 || loop === 3 || loop === 4){
      col.alignment = { horizontal: 'center',vertical: 'middle' };

    }else{
      col.alignment = { vertical: 'middle' };
    }
    col.border = borderStyle;
    col.font = {name: 'Arial Black', size: 8};
  }

});








const uniqueCenters = [...new Set(milk_run_result.map(item => item["물류센터"]))];

// 물류센터 별로 데이터를 모으기
const centerDataMap = {};
uniqueCenters.forEach(center => {
centerDataMap[center] = milk_run_result.filter(item => item["물류센터"] === center);
});





Object.keys(centerDataMap).forEach(center => {
  let sheetName = '밀크런_' + center;
  let worksheet = workbook.addWorksheet(sheetName);
  worksheet.columns = product_send_config;
  let centerData = centerDataMap[center];
  
  let box_qty = 0;
  centerData.forEach(item => {
    box_qty += item["실제박스수량"];
  });




  worksheet.getCell(`A1`).value = '1파렛트 ' + box_qty + 'BOX';
              
              
  worksheet.mergeCells('A1:H1'); // Extend cell over all column headers
  
  worksheet.getCell(`A1`).alignment = { horizontal: 'center' }; // Horizontally center your text
  worksheet.getCell('H1').fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'FFFFFF'},
      bgColor:{argb:'FFFFFF'}
    };
    worksheet.getCell('A1').font = {
      color: {argb:'blue'},
      family: 4,
      size: 20,
      underline: false,
      bold: true
    };
    worksheet.getCell('A1').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };


    worksheet.getCell(`A2`).value = '구분';
    worksheet.getCell(`B2`).value = '제품명';
    worksheet.getCell(`C2`).value = '수량';
    worksheet.getCell(`D2`).value = '박스';
    worksheet.getCell(`E2`).value = '발주처';
    worksheet.getCell(`F2`).value = '발주번호';
    worksheet.getCell(`G2`).value = '유통기한';
    worksheet.getCell(`H2`).value = '비고';
    
    
    
    
    
  


  centerData.forEach((item, index) => {

    item['수량'] = item['확정수량'];
    item['박스'] = item['실제박스수량'] + '박스('+item['박스수량']+'개입)';

    worksheet.addRow(item);
    for(let loop = 1; loop <= 8; loop++) {
      const col = worksheet.getRow(index + 3).getCell(loop);
      col.border = borderStyle;
      col.font = {name: 'Arial Black', size: 10};
    }
  });
});

 
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = file_name;
      anchor.click();
      window.URL.revokeObjectURL(url);
    })
  } catch(error) {
    console.error(error);
  }






}


const productSendPriceDownload = () => {
  const product_send_config : any = [
    {header: '구분', key: '구분', width: 5},
    {header: '제품명', key: '제품명', width: 30},
    {header: '수량(여유공간)', key: '수량', width: 5},
    {header: '박스(최대수량)', key: '박스', width: 5},
    {header: '발주처', key: '발주처', width: 10},
    {header: '발주번호', key: '발주번호', width: 10},
    {header: '유통기한', key: '유통기한', width: 5},
    {header: '비고', key: '비고', width: 5},
    {header: '단가', key: '공급가', width: 10},
    {header: '공급가액', key: '매출금액', width: 10},
    
  ]; 

  const coopang_download_config : any = [
    {header: '구분', key: '구분', width: 5},
    {header: '제품명', key: '제품명', width:60},
    {header: '바코드', key: '상품바코드', width: 20},
    {header: '수량', key: '확정수량', width: 5},
    {header: '유통기한', key: '유통기한', width: 10},
    {header: '단가', key: '공급가', width: 10},
    {header: '공급가액', key: '매출금액', width: 10},
  ]; 

  const coopang_milk_run_download_config : any = [
    {header: '구분', key: '구분', width: 30},
    {header: '제품명', key: '제품명', width: 30},
    {header: '바코드', key: '상품바코드', width: 30},
    {header: '수량', key: '확정수량', width: 30},
    {header: '유통기한', key: '유통기한', width: 30},
  ]; 


  try {

    let product_title : any= '총괄수량';
    let product_title2 : any= '택배수량';
    let product_title3 : any= '밀크런';
    let product_title4 : any= '보류_밀크런';
    
    
    
    
  const workbook = new Excel.Workbook();
    // 엑셀 생성

    // 생성자
    workbook.creator = '작성자';
   
    // 최종 수정자
    workbook.lastModifiedBy = '최종 수정자';
   
    // 생성일(현재 일자로 처리)
    workbook.created = new Date();
   
    // 수정일(현재 일자로 처리)
    workbook.modified = new Date();

    let file_name = '제품 매출표' + moment().format('YYYY-MM-DD HH:mm:ss') + '.xlsx';
    

  
    workbook.addWorksheet(product_title);
    workbook.addWorksheet(product_title2);
    workbook.addWorksheet(product_title3);
    workbook.addWorksheet(product_title4);
    
    

    const sheetOne = workbook.getWorksheet(product_title);
    const sheetTwo = workbook.getWorksheet(product_title2);
    const sheetThree = workbook.getWorksheet(product_title3);
    const sheetFour = workbook.getWorksheet(product_title4);
    
         
         
          
    // 컬럼 설정
    // header: 엑셀에 표기되는 이름
    // key: 컬럼을 접근하기 위한 key
    // hidden: 숨김 여부
    // width: 컬럼 넓이
    sheetOne.columns = coopang_download_config;
    sheetTwo.columns = product_send_config;
    sheetThree.columns = coopang_download_config;
    sheetFour.columns = coopang_download_config;
    

   

    sheetOne.getRow(1).eachCell((cell) => {
      cell.alignment = { horizontal: 'center',vertical: 'middle' };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });
    sheetTwo.getRow(1).eachCell((cell) => {
      cell.alignment = { horizontal: 'center',vertical: 'middle' };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });
    sheetThree.getRow(1).eachCell((cell) => {
      cell.alignment = { horizontal: 'center',vertical: 'middle' };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });
    sheetFour.getRow(1).eachCell((cell) => {
      cell.alignment = { horizontal: 'center',vertical: 'middle' };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });
    



let filtered_coopang_data = coopang_upload_data.filter((item)=> {
  return typeof item.발주번호 === 'number';
});


const milk_run_result = [];
const milk_run_temp_result = [];

const box_result = [];

// 물류센터별 수량을 더하고, 13개 이상인 경우 밀크런,10~12개인 경우에는 보류, 9개 이하인 경우에는 택배로 분류
const centerSums = {};
filtered_coopang_data.forEach(item => {
  const center = item["물류센터"];
  const quantity = item["실제박스수량"];
  // 중복된 물류센터가 나올 경우 합산
  centerSums[center] = (centerSums[center] || 0) + quantity;

  });


  filtered_coopang_data.forEach(item => {
    const center = item["물류센터"];
  
     if (centerSums[center] >= 13) {
    // 이미 결과 배열에 해당 물류센터가 없으면 추가
    if (!milk_run_result.includes(center)) {
      milk_run_result.push(item);
    }
  }else if(centerSums[center] > 9 && centerSums[center] < 13 ){
    if (!milk_run_temp_result.includes(center)) {
      milk_run_temp_result.push(item);
    }

  }else{
    if (!box_result.includes(center)) {
      box_result.push(item);
    }
  }

    });


const borderStyle = {
  top: { style: 'thin' },
  left: { style: 'thin' },
  bottom: { style: 'thin' },
  right: { style: 'thin' }
};



const sortedBoxData = box_result.sort((a, b) => {
  const centerA = a["물류센터"];
  const centerB = b["물류센터"];

  if (centerA < centerB) return -1;
  if (centerA > centerB) return 1;
  return 0;
});







// id를 기준으로 그룹화하고 qty를 더하는 함수
const totalCoopangData = (accumulator, currentValue) => {
  const updatedAccumulator = accumulator.map(item => ({ ...item })); // 새로운 배열을 만들어서 복사

  const existingItem = updatedAccumulator.find(item => item['상품번호'] === currentValue['상품번호']);

  if (existingItem) {
    // 이미 있는 경우, 기존 상품의 수량을 더함
    existingItem['확정수량'] += currentValue['확정수량'];
  } else {
    // 없는 경우, 새로운 아이템을 추가
    updatedAccumulator.push({ ...currentValue }); // 새로운 아이템 추가 시 복사
  }

  return updatedAccumulator;
};




// reduce 함수를 사용하여 배열을 처리
const product_total_data = filtered_coopang_data.reduce(totalCoopangData, []);







product_total_data.map((item, index) => {
  item['구분'] = index+1;
  item['상품바코드'] = item['상품바코드'].toString(); 
  item['매출금액'] = parseInt(item['공급가']) * parseInt(item['확정수량']); 
  

  sheetOne.addRow(item);
  for(let loop = 1; loop <= 7; loop++) {
    const col = sheetOne.getRow(index + 2).getCell(loop);
    if(loop === 1 || loop === 3 || loop === 4){
      col.alignment = { horizontal: 'center',vertical: 'middle' };

    }else{
      col.alignment = { vertical: 'middle' };
    }
    col.border = borderStyle;
    col.font = {name: 'Arial Black', size: 8};
  }
});


const totalPrice = product_total_data.reduce((accumulator, currentValue) => {
  return accumulator + currentValue['공급가'];
}, 0);
const totalQty = product_total_data.reduce((accumulator, currentValue) => {
  return accumulator + currentValue['확정수량'];
}, 0);

const totalSupplyPrice = product_total_data.reduce((accumulator, currentValue) => {
  return accumulator + currentValue['매출금액'];
}, 0);


let total_obj = {
  
  '확정수량' : totalQty,
  '공급가' : totalPrice,
  '매출금액' : totalSupplyPrice,
  
}

sheetOne.addRow(total_obj);

sheetOne.properties.defaultRowHeight = 30;
sheetTwo.properties.defaultRowHeight = 30;
sheetThree.properties.defaultRowHeight = 30;
sheetFour.properties.defaultRowHeight = 30;




sortedBoxData.map((item, index) => {
  item['구분'] = index+1;
  
  item['매출금액'] = parseInt(item['공급가']) * parseInt(item['한진_수량']); 

  console.log('item : ', item);
  sheetTwo.addRow(item);

  // 추가된 행의 컬럼 설정(헤더와 style이 다를 경우)

  for(let loop = 1; loop <= 6; loop++) {
    const col = sheetTwo.getRow(index + 2).getCell(loop);
    col.border = borderStyle;
    col.font = {name: 'Arial Black', size: 10};
  }

});



const boxTotalPrice = sortedBoxData.reduce((accumulator, currentValue) => {
  return accumulator + currentValue['공급가'];
}, 0);
const boxTotalQty = sortedBoxData.reduce((accumulator, currentValue) => {
  return accumulator + currentValue['한진_수량'];
}, 0);

const boxRealTotalQty = sortedBoxData.reduce((accumulator, currentValue) => {
  return accumulator + currentValue['실제박스수량'];
}, 0);

const boxTotalSupplyPrice = sortedBoxData.reduce((accumulator, currentValue) => {
  return accumulator + currentValue['매출금액'];
}, 0);


let box_total_obj = {
  
  '수량' : boxTotalQty,
  '박스' : boxRealTotalQty,
  '공급가' : boxTotalPrice,
  '매출금액' : boxTotalSupplyPrice,
  
}

sheetTwo.addRow(box_total_obj);




const sortedMilkrunData = milk_run_result.sort((a, b) => {
  const centerA = a["물류센터"];
  const centerB = b["물류센터"];

  if (centerA < centerB) return -1;
  if (centerA > centerB) return 1;
  return 0;
});

  
sortedMilkrunData.map((item, index) => {
  item['구분'] = index+1;
  item['상품바코드'] = item['상품바코드'].toString(); 
  item['매출금액'] = parseInt(item['공급가']) * parseInt(item['확정수량']); 

  sheetThree.addRow(item);

  // 추가된 행의 컬럼 설정(헤더와 style이 다를 경우)

  for(let loop = 1; loop <= 7; loop++) {
    const col = sheetThree.getRow(index + 2).getCell(loop);
    if(loop === 1 || loop === 3 || loop === 4){
      col.alignment = { horizontal: 'center',vertical: 'middle' };

    }else{
      col.alignment = { vertical: 'middle' };
    }
    col.border = borderStyle;
    col.font = {name: 'Arial Black', size: 8};
  }

});



const milkrunTotalPrice = sortedMilkrunData.reduce((accumulator, currentValue) => {
  return accumulator + currentValue['공급가'];
}, 0);
const milkrunTotalQty = sortedMilkrunData.reduce((accumulator, currentValue) => {
  return accumulator + currentValue['확정수량'];
}, 0);

const milkrunTotalSupplyPrice = sortedMilkrunData.reduce((accumulator, currentValue) => {
  return accumulator + currentValue['매출금액'];
}, 0);


let milkrun_total_obj = {
  
  '확정수량' : milkrunTotalQty,
  '공급가' : milkrunTotalPrice,
  '매출금액' : milkrunTotalSupplyPrice,
  
}



sheetThree.addRow(milkrun_total_obj);



const sortedMilkrunTempData = milk_run_temp_result.sort((a, b) => {
  const centerA = a["물류센터"];
  const centerB = b["물류센터"];

  if (centerA < centerB) return -1;
  if (centerA > centerB) return 1;
  return 0;
});


sortedMilkrunTempData.map((item, index) => {
  item['구분'] = index+1;
  item['상품바코드'] = item['상품바코드'].toString(); 
  sheetFour.addRow(item);

  // 추가된 행의 컬럼 설정(헤더와 style이 다를 경우)

  for(let loop = 1; loop <= 7; loop++) {
    const col = sheetFour.getRow(index + 2).getCell(loop);
    if(loop === 1 || loop === 3 || loop === 4){
      col.alignment = { horizontal: 'center',vertical: 'middle' };

    }else{
      col.alignment = { vertical: 'middle' };
    }
    col.border = borderStyle;
    col.font = {name: 'Arial Black', size: 8};
  }

});








const uniqueCenters = [...new Set(milk_run_result.map(item => item["물류센터"]))];

// 물류센터 별로 데이터를 모으기
const centerDataMap = {};
uniqueCenters.forEach(center => {
centerDataMap[center] = milk_run_result.filter(item => item["물류센터"] === center);
});

console.log('centerDataMap',centerDataMap);




Object.keys(centerDataMap).forEach(center => {
  let sheetName = '밀크런_' + center;
  let worksheet = workbook.addWorksheet(sheetName);
  worksheet.columns = product_send_config;
  let centerData = centerDataMap[center];
  
  let box_qty = 0;
  centerData.forEach(item => {
    box_qty += item['실제박스수량'];
  });




  worksheet.getCell(`A1`).value = '1파렛트 ' + box_qty + 'BOX';
              
              
  worksheet.mergeCells('A1:H1'); // Extend cell over all column headers
  
  worksheet.getCell(`A1`).alignment = { horizontal: 'center' }; // Horizontally center your text
  worksheet.getCell('H1').fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'FFFFFF'},
      bgColor:{argb:'FFFFFF'}
    };
    worksheet.getCell('A1').font = {
      color: {argb:'blue'},
      family: 4,
      size: 20,
      underline: false,
      bold: true
    };
    worksheet.getCell('A1').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };


    worksheet.getCell(`A2`).value = '구분';
    worksheet.getCell(`B2`).value = '제품명';
    worksheet.getCell(`C2`).value = '수량';
    worksheet.getCell(`D2`).value = '박스';
    worksheet.getCell(`E2`).value = '발주처';
    worksheet.getCell(`F2`).value = '발주번호';
    worksheet.getCell(`G2`).value = '유통기한';
    worksheet.getCell(`H2`).value = '비고';
    
    
    
    
    
  


  centerData.forEach((item, index) => {

    item['수량'] = item['확정수량'];
    item['박스'] = item['실제박스수량'] + '박스('+item['박스수량']+'개입)';

    worksheet.addRow(item);
    for(let loop = 1; loop <= 8; loop++) {
      const col = worksheet.getRow(index + 3).getCell(loop);
      col.border = borderStyle;
      col.font = {name: 'Arial Black', size: 10};
    }
  });
});

 
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = file_name;
      anchor.click();
      window.URL.revokeObjectURL(url);
    })
  } catch(error) {
    console.error(error);
  }






}










const palletDownload = () => {
  const pallet_config : any = [
    {header: 'No', key: 'no', width: 15},
    {header: '상품명', key: '제품명', width: 40},
    {header: '수량', key: '수량', width: 20},
 
  ]; 

  try {
  const workbook = new Excel.Workbook();
    // 엑셀 생성

    // 생성자
    workbook.creator = '작성자';
   
    // 최종 수정자
    workbook.lastModifiedBy = '최종 수정자';
   
    // 생성일(현재 일자로 처리)
    workbook.created = new Date();
   
    // 수정일(현재 일자로 처리)
    workbook.modified = new Date();

    let file_name = '파렛트 리스트' + moment().format('YYYY-MM-DD HH:mm:ss') + '.xlsx';
    

    // 컬럼 설정
    // header: 엑셀에 표기되는 이름
    // key: 컬럼을 접근하기 위한 key
    // hidden: 숨김 여부
    // width: 컬럼 넓이
   
let filtered_coopang_data = coopang_upload_data.filter((item)=> {
  return typeof item.발주번호 === 'number';
});


const milk_run_result = [];


// 물류센터별 수량을 더하고, 10 이상인 경우 별도의 배열로 분류
const centerSums = {};

filtered_coopang_data.forEach(item => {
  const center = item["물류센터"];
  const quantity = item["실제박스수량"];
  // 중복된 물류센터가 나올 경우 합산
  centerSums[center] = (centerSums[center] || 0) + quantity;

  });


  filtered_coopang_data.forEach(item => {
    const center = item["물류센터"];
  
    if (centerSums[center] >= 13) {
      // 이미 결과 배열에 해당 물류센터가 없으면 추가
      if (!milk_run_result.includes(center)) {
        milk_run_result.push(item);
      }
    }

    });

// 각 물류센터별로 발주번호를 겹치지 않게 추출
const uniqueOrderNumbersByCenter = {};

milk_run_result.forEach(item => {
  const orderNumber = item["발주번호"];
  const center = item["물류센터"];

  // 중복 체크 후 물류센터별로 발주번호 저장
  if (!uniqueOrderNumbersByCenter[center]) {
    uniqueOrderNumbersByCenter[center] = [orderNumber];
  } else {
    if (!uniqueOrderNumbersByCenter[center].includes(orderNumber)) {
      uniqueOrderNumbersByCenter[center].push(orderNumber);
    }
  }
});

console.log('발주번호 : ',milk_run_result);


const resultArray = [];

let currentOrderNumber = null;

const orderNumbersByCenter = {};

let no = 0;

milk_run_result.forEach((item, index) => {
  const center = item["물류센터"];

  const orderNumber = item["발주번호"];
  
  // 발주번호가 바뀌는 시점에 빈 객체 추가
  
  if ( currentOrderNumber !== orderNumber) {
    no = 0;
    let new_obj = {
      "no" : no ,
      "제품명" : orderNumber,
      "물류센터" : item["물류센터"],
      "수량" : "",
      "실제박스수량" : 0,
      
      
    };
    resultArray.push(new_obj);
  }
  no = no + 1;
  item['no'] = no;
  // 데이터 추가
  resultArray.push(item);

  // 현재 발주번호 업데이트
  currentOrderNumber = orderNumber;

  if (!orderNumbersByCenter[center]) {
    orderNumbersByCenter[center] = [];
  }

  orderNumbersByCenter[center].push(orderNumber);

});

console.log('resul : ',resultArray);
console.log('orderNumbersByCenter : ',orderNumbersByCenter);



const borderStyle = {
  top: { style: 'thin' },
  left: { style: 'thin' },
  bottom: { style: 'thin' },
  right: { style: 'thin' }
};



const uniqueCenters = [...new Set(resultArray.map(item => item["물류센터"]))];

// 물류센터 별로 데이터를 모으기
const centerDataMap = {};
uniqueCenters.forEach(center => {
centerDataMap[center] = resultArray.filter(item => item["물류센터"] === center);
});

console.log('centerDataMap',centerDataMap);




Object.keys(centerDataMap).forEach(center => {
  let sheetName = center;
  let worksheet = workbook.addWorksheet(sheetName);
  worksheet.columns = pallet_config;
  let centerData = centerDataMap[center];
  
  let box_qty = 0;
  
  console.log('centerDataMap : ',centerData);
  centerData.forEach(item => {
    box_qty += item['실제박스수량'];
  });


  orderNumbersByCenter[center] = [...new Set(orderNumbersByCenter[center])]


  // A1부터 C8까지의 셀에 공통된 스타일 적용
const startRow = 1;
const endRow = 7;
const startCol = 1;
const endCol = 3;

for (let row = startRow; row <= endRow; row++) {
  for (let col = startCol; col <= endCol; col++) {
    const cell = worksheet.getCell(row, col);
    cell.font = 
    
    
    {
      color: {argb:'blue'},
      family: 4,
      size: 15,
      underline: false,
      bold: true
    };


    cell.alignment = { horizontal: 'center' }; // Horizontally center your text
    cell.fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'FFFFFF'},
      bgColor:{argb:'FFFFFF'}
    };
   
    
    cell.border ={
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
  }
}


  worksheet.getCell(`A1`).value = '총 파렛트수';
  worksheet.getCell(`B1`).value = '1';
  worksheet.getCell(`C1`).value = box_qty + "BOX";

  worksheet.getCell(`A2`).value = '입고예정일자 : ' ;
  worksheet.mergeCells('A2:B2');

  
  
  worksheet.getCell(`C2`).value = center + " 센터";

  
worksheet.getCell(`A3`).value = '업체명' ;
worksheet.getCell(`B3`).value = '(주)쓰임받는사람들' ;

worksheet.getCell(`C3`).value = '1P' ;

worksheet.getCell(`A4`).value = '발주번호 : ' + orderNumbersByCenter[center].toString();
worksheet.mergeCells('A4:C4');

    worksheet.getCell(`A7`).value = 'No';
    worksheet.getCell(`B7`).value = '상품명';
    worksheet.getCell(`C7`).value = '수량';

  centerData.forEach((item, index) => {

    item['수량'] = item['확정수량'];
    item['박스'] = item['실제박스수량'] + '박스('+item['박스수량']+'개입)';
    item['no'] = item['no'] === 0 ? '':item['no'];
    worksheet.addRow(item);
    for(let loop = 1; loop <= 3; loop++) {
      const col = worksheet.getRow(index + 8).getCell(loop);
      col.border = borderStyle;
      col.font = {name: 'Arial Black', size: 10};
    }
  });
});




 
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = file_name;
      anchor.click();
      window.URL.revokeObjectURL(url);
    })
  } catch(error) {
    console.error(error);
  }
}


const milkrunBoxDownload = () => {


  try {
  const workbook = new Excel.Workbook();
    // 엑셀 생성

    // 생성자
    workbook.creator = '작성자';
   
    // 최종 수정자
    workbook.lastModifiedBy = '최종 수정자';
   
    // 생성일(현재 일자로 처리)
    workbook.created = new Date();
   
    // 수정일(현재 일자로 처리)
    workbook.modified = new Date();

    let file_name = '밀크런 박스 리스트' + moment().format('YYYY-MM-DD HH:mm:ss') + '.xlsx';
    

    // 컬럼 설정
    // header: 엑셀에 표기되는 이름
    // key: 컬럼을 접근하기 위한 key
    // hidden: 숨김 여부
    // width: 컬럼 넓이
   
let filtered_coopang_data = coopang_upload_data.filter((item)=> {
  return typeof item.발주번호 === 'number';
});


const milk_run_result = [];


// 물류센터별 수량을 더하고, 13 이상인 경우 별도의 배열로 분류
const centerSums = {};

filtered_coopang_data.forEach(item => {
  const center = item["물류센터"];
  const quantity = item["실제박스수량"];
  // 중복된 물류센터가 나올 경우 합산
  centerSums[center] = (centerSums[center] || 0) + quantity;

  });


  filtered_coopang_data.forEach(item => {
    const center = item["물류센터"];
  
     if (centerSums[center] >= 13) {
    // 이미 결과 배열에 해당 물류센터가 없으면 추가
    if (!milk_run_result.includes(center)) {
      milk_run_result.push(item);
    }
  }

    });







// 각 물류센터별로 발주번호를 겹치지 않게 추출
const uniqueOrderNumbersByCenter = {};

milk_run_result.forEach(item => {
  const orderNumber = item["발주번호"];
  const center = item["물류센터"];

  // 중복 체크 후 물류센터별로 발주번호 저장
  if (!uniqueOrderNumbersByCenter[center]) {
    uniqueOrderNumbersByCenter[center] = [orderNumber];
  } else {
    if (!uniqueOrderNumbersByCenter[center].includes(orderNumber)) {
      uniqueOrderNumbersByCenter[center].push(orderNumber);
    }
  }
});




const resultArray = [];

let currentOrderNumber = null;

const orderNumbersByCenter = {};

milk_run_result.forEach((item, index) => {
  const center = item["물류센터"];

  const orderNumber = item["발주번호"];
  let no = 0;
  // 발주번호가 바뀌는 시점에 빈 객체 추가

  item['no'] = no + 1;
  // 데이터 추가
  resultArray.push(item);

  // 현재 발주번호 업데이트
  currentOrderNumber = orderNumber;

  if (!orderNumbersByCenter[center]) {
    orderNumbersByCenter[center] = [];
  }

  orderNumbersByCenter[center].push(orderNumber);

});





const uniqueCenters = [...new Set(resultArray.map(item => item["물류센터"]))];

// 물류센터 별로 데이터를 모으기
const centerDataMap = {};
uniqueCenters.forEach(center => {
centerDataMap[center] = resultArray.filter(item => item["물류센터"] === center);
});






Object.keys(centerDataMap).forEach(center => {
  let sheetName = center;
  let worksheet = workbook.addWorksheet(sheetName);


  worksheet.getColumn('A').width = 60;
  worksheet.getColumn('B').width = 15;
  



  let centerData = centerDataMap[center];
  
  let box_qty = 0;
  

  centerData.forEach(item => {
    box_qty += item['실제박스수량'];
  });





  console.log('centerData : ', centerData);
  
  

  let total_index = 0;


  let a_index = 0; 
  let b_index = 0;
  let c_index = 0;
  let d_index = 0;
  let e_index = 0;
  centerData.forEach((data,index) => {
    
    let total_box_qty = data['확정수량'];

    // console.log('total_box_qty', total_box_qty);

   
 

    for(let i =0; i< data['실제박스수량']; i++){
      console.log('total : ',total_index);
      
      
      if(a_index ===0){
        a_index = i + 1; 
        b_index = i + 2;
        c_index = i + 3;
        d_index = i + 4;
        e_index = i + 5;
      }else{
        a_index = a_index + 4;
        b_index = a_index+1;
        c_index = a_index+2;
        d_index = a_index+3;
        e_index = a_index+4;
      }
     
     
      worksheet.getCell(`A${a_index}`).value = "박스 상품 리스트";
      worksheet.getCell(`B${a_index}`).value = "";


      worksheet.getCell(`A${a_index}`).font = { name: 'Arial Black', size: 30,bold: true};

      worksheet.getCell(`A${b_index}`).value = "업체명 : (주)쓰임받는 사람들";
      worksheet.getCell(`B${b_index}`).value = "";

      worksheet.getCell(`A${b_index}`).font = { name: 'Arial Black', size: 20,bold: true};
      

      worksheet.getCell(`A${c_index}`).value = "발주번호 : " + data['발주번호'] + "(" + data['물류센터'] + ")";
      worksheet.getCell(`B${c_index}`).value = "";

      worksheet.getCell(`A${c_index}`).font = { name: 'Arial Black', size: 16,bold: true};


      worksheet.getCell(`A${d_index}`).value = data['제품명'];
      if(total_box_qty >= data['박스수량']){
        worksheet.getCell(`B${d_index}`).value = data['박스수량'];

      }else{
        worksheet.getCell(`B${d_index}`).value = total_box_qty;
      }

      worksheet.getCell(`A${d_index}`).font = { name: 'Arial Black', size: 20,bold: true};

      worksheet.getCell(`A${d_index}`).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };

      worksheet.getCell(`B${d_index}`).font = { name: 'Arial Black', size: 20,bold: true};
      worksheet.getCell(`B${d_index}`).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };

     
  


      total_box_qty -= data['박스수량'];
      
      
      total_index +=1;
    }

    

    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {

      if(rowNumber % 4 === 0){

        worksheet.getRow(rowNumber).height = 4.5 * 28.35;
      }else{
        worksheet.getRow(rowNumber).height = 2.5 * 28.35;
      }
   
    
    
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        // 스타일 설정 예시 (원하는 스타일로 변경 가능)
        cell.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true };
        // cell.font = { name: 'Arial Black', size: 12,bold: true};
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFFFFF' } // 흰색 배경
        };
        

        console.log(row[cell]);

        
      });
    });

    
  });



});




 
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = file_name;
      anchor.click();
      window.URL.revokeObjectURL(url);
    })
  } catch(error) {
    console.error(error);
  }
}

const shipDownload = () => {
  const ship_config : any = [
    {header: '상품명', key: '상품명', width: 30},
    {header: '수령인', key: '수령인', width: 30},
    {header: '연락처1', key: '연락처1', width: 30},
    {header: '연락처2', key: '연락처2', width: 30},
    {header: '우편번호', key: '우편번호', width: 30},
    {header: '주소', key: '주소', width: 100},
    {header: '확인사항', key: '확인사항', width: 30},
    {header: '체결번호', key: '체결번호', width: 30},


  ]; 


    try {
      
         
            let ship_title : any= '한진택배 업로드양식';




         
      
        
            const box_result = [];
            
            // 물류센터별 수량을 더하고, 10 이상인 경우 별도의 배열로 분류
            const centerSums = {};
            coopang_upload_result_data.forEach(item => {
              const center = item["물류센터"];
              const quantity = 1;
              // 중복된 물류센터가 나올 경우 합산
              centerSums[center] = (centerSums[center] || 0) + quantity;
            
              });
              coopang_upload_result_data.forEach(item => {
                const center = item["물류센터"];
                 if (centerSums[center] < 10) {
                  if (!box_result.includes(center)) {
                    box_result.push(item);
                  }
             
              }else{
              }
            
              });
          
      
          const workbook = new Excel.Workbook();
            // 엑셀 생성
      
            // 생성자
            workbook.creator = '작성자';
           
            // 최종 수정자
            workbook.lastModifiedBy = '최종 수정자';
           
            // 생성일(현재 일자로 처리)
            workbook.created = new Date();
           
            // 수정일(현재 일자로 처리)
            workbook.modified = new Date();
      
            let file_name = ship_title + moment().format('YYYY-MM-DD HH:mm:ss') + '.xlsx';
          
          
            workbook.addWorksheet(ship_title);
            const sheetOne = workbook.getWorksheet(ship_title);
                 
                 
                  
            // 컬럼 설정
            // header: 엑셀에 표기되는 이름
            // key: 컬럼을 접근하기 위한 key
            // hidden: 숨김 여부
            // width: 컬럼 넓이
            sheetOne.columns = ship_config;
         
            const sampleData = box_result;

           

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
      
      
              
         
            workbook.xlsx.writeBuffer().then((data) => {
              const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
              const url = window.URL.createObjectURL(blob);
              const anchor = document.createElement('a');
              anchor.href = url;
              anchor.download = file_name;
              anchor.click();
              window.URL.revokeObjectURL(url);
            })
          } catch(error) {
            console.error(error);
          }
}



const coopangShipmentDownload = () => {
  console.log('coopang_shipment_data : ', coopang_shipment_data);


  const sortedCoopangShipData = coopang_shipment_data.sort((a, b) => {
    const centerA = a["물류센터"];
    const centerB = b["물류센터"];
  
    if (centerA < centerB) return -1;
    if (centerA > centerB) return 1;
    return 0;
  });



  const coopang_shipment_config : any = [
    {header: '발주번호(PO ID)', key: '발주번호(PO ID)', width: 30},
    {header: '물류센터(FC)', key: '물류센터(FC)', width: 30},
    {header: '입고유형(Transport Type)', key: '입고유형(Transport Type)', width: 30},
    {header: '입고예정일(EDD)', key: '입고예정일(EDD)', width: 30},
    {header: '상품번호(SKU ID)', key: '상품번호(SKU ID)', width: 30},
    {header: '상품바코드(SKU Barcode)', key: '상품바코드(SKU Barcode)', width: 30},
    {header: '상품이름(SKU Name)', key: '상품이름(SKU Name)', width: 30},
    {header: '확정수량(Confirmed Qty)', key: '확정수량(Confirmed Qty)', width: 30},
    {header: '송장번호(Invoice Number)', key: '송장번호(Invoice Number)', width: 30},
    {header: '납품수량(Shipped Qty)', key: '납품수량(Shipped Qty)', width: 30},
   
  ]; 


    try {
      
         
            let ship_title : any= '쿠팡 쉽먼트 업로드 양식';
            
          
      
          const workbook = new Excel.Workbook();
            // 엑셀 생성
      
            // 생성자
            workbook.creator = '작성자';
           
            // 최종 수정자
            workbook.lastModifiedBy = '최종 수정자';
           
            // 생성일(현재 일자로 처리)
            workbook.created = new Date();
           
            // 수정일(현재 일자로 처리)
            workbook.modified = new Date();
      
            let file_name = ship_title + moment().format('YYYY-MM-DD HH:mm:ss') + '.xlsx';
          
          
            workbook.addWorksheet(ship_title);
            const sheetOne = workbook.getWorksheet(ship_title);
                 
                 
                  
            // 컬럼 설정
            // header: 엑셀에 표기되는 이름
            // key: 컬럼을 접근하기 위한 key
            // hidden: 숨김 여부
            // width: 컬럼 넓이
            sheetOne.columns = coopang_shipment_config;
         
            const sampleData = sortedCoopangShipData;
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
      
      
              
         
            workbook.xlsx.writeBuffer().then((data) => {
              const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
              const url = window.URL.createObjectURL(blob);
              const anchor = document.createElement('a');
              anchor.href = url;
              anchor.download = file_name;
              anchor.click();
              window.URL.revokeObjectURL(url);
            })
          } catch(error) {
            console.error(error);
          }
}


const excelDownload = (type,config) => {
  
      let data =  table_data[type].getSelectedData();
      
      if(data.length > 0){
        // 모든 객체에서 공통된 키(key) 이름을 찾기 위한 반복문
        for (let i = 0; i <  data.length; i++) {
          let currentObject =  data[i];

          Object.keys(currentObject).map((key)=> {    
          
            if(typeof currentObject[key] === "object"){
              data[i][key] = data[i][key]['name'];
            }
          
          }); 
        }

        try {

          let text_title : any= '';
          switch(type){
              case 'product': 
                  text_title = '품목 관리';
              break;
              
              default:
                  text_title = '제목 없음';
              break;
        }

        const workbook = new Excel.Workbook();
          // 엑셀 생성
    
          // 생성자
          workbook.creator = '작성자';
         
          // 최종 수정자
          workbook.lastModifiedBy = '최종 수정자';
         
          // 생성일(현재 일자로 처리)
          workbook.created = new Date();
         
          // 수정일(현재 일자로 처리)
          workbook.modified = new Date();

          let file_name = text_title + moment().format('YYYY-MM-DD HH:mm:ss') + '.xlsx';
          let sheet_name = moment().format('YYYYMMDDHH:mm:ss');
       
        
          workbook.addWorksheet(text_title);
             
  
          const sheetOne = workbook.getWorksheet(text_title);
               
               
                
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
    
    
            
       
          workbook.xlsx.writeBuffer().then((data) => {
            const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = file_name;
            anchor.click();
            window.URL.revokeObjectURL(url);
          })
        } catch(error) {
          console.error(error);
        }

      }else{
        alert('데이터를 선택해주세요');
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

 
  const excelUpload = (e) => {
  
    const coopang_upload_config : any = [
      {header: '발주번호', key: '발주번호', width: 30},
      {header: '물류센터', key: '물류센터', width: 30},
      {header: '입고유형', key: '입고유형', width: 30},
      {header: '발주상태', key: '발주상태', width: 30},
      {header: '상품번호', key: '상품번호', width: 30},
      {header: '상품바코드', key: '상품바코드', width: 30},
      {header: '상품이름', key: '상품이름', width: 30},
      {header: '발주수량', key: '발주수량', width: 30},
      {header: '확정수량', key: '확정수량', width: 30},
      {header: '유통기한', key: '유통기한', width: 30},
      {header: '제조일자', key: '제조일자', width: 30},
      {header: '생산년도', key: '생산년도', width: 30},
      {header: '납품부족사유', key: '납품부족사유', width: 30},
      {header: '회송담당자', key: '회송담당자', width: 30},
      {header: '회송담당자연락처', key: '회송담당자연락처', width: 30},
      {header: '회송지주소', key: '회송지주소', width: 30},
      {header: '매입가', key: '매입가', width: 30},
      {header: '공급가', key: '공급가', width: 30},
      {header: '부가세', key: '부가세', width: 30},
      {header: '매입금', key: '매입금', width: 30},
      {header: '입고예정일', key: '입고예정일', width: 30},
      {header: '발주등록일시', key: '발주등록일시', width: 30},
    ]; 


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
          
            if(rowIndex > 1){
            let obj = {

            };
            for(let i=0; i<coopang_upload_config.length; i++){
              obj[coopang_upload_config[i].key] = row.values[i+1] !== '' ?  row.values[i+1] : "";

            }
            change_data.push(obj);
         
            coopang_upload_data = change_data;
            

          
          }else {

          }
          });
          coopang_upload_state.update(() => coopang_upload_data);
          
        
          let filtered_coopang_data = change_data.filter((item)=> {
            return typeof item.발주번호 === 'number';
          });



        

          
          let standard_coopang_data = [];
          for(let i =0; i<filtered_coopang_data.length; i++){
              for(let j=0; j<ship_data.length; j++){
                if(filtered_coopang_data[i]['물류센터'] === ship_data[j]['area']){
                   // 한진택배용
                  filtered_coopang_data[i]['수령인'] = ship_data[j]['receive_user'];
                  filtered_coopang_data[i]['연락처1'] = ship_data[j]['phone1'];
                  filtered_coopang_data[i]['연락처2'] = ship_data[j]['phone2'];
                  filtered_coopang_data[i]['주소'] = ship_data[j]['address'];

                  // 생산전달용
                  filtered_coopang_data[i]['발주처'] = ship_data[j]['area'];
                }
              }

              for(let z=0; z<product_data.length; z++){
                if(filtered_coopang_data[i]['상품번호'] === product_data[z]['sk_uid']){
                   // 생산전달용
                  filtered_coopang_data[i]['제품명'] = product_data[z]['origin_name'];
                  
                  filtered_coopang_data[i]['확인사항체크용'] = "[" + product_data[z]['origin_name'] + "]";
                  
                  
                  filtered_coopang_data[i]['인박스'] = product_data[z]['inbox'];
                  filtered_coopang_data[i]['아웃박스'] = product_data[z]['outbox'];
                  filtered_coopang_data[i]['박스수량'] = product_data[z]['qty'];
                  filtered_coopang_data[i]['단가'] = product_data[z]['price'];
                }
              }
              let box_qty = 0;
              box_qty = Math.ceil(filtered_coopang_data[i]['확정수량'] / filtered_coopang_data[i]['박스수량']);
              filtered_coopang_data[i]['실제박스수량'] = box_qty;
             
              // if(box_qty > 0 && box_qty < 10){
                let box_in_qty = filtered_coopang_data[i]['확정수량'];
                
                for(let a=0; a<box_qty; a++){
                 
               
                  if(box_in_qty > 0){
                   
    
                    if(box_in_qty > filtered_coopang_data[i]['박스수량']){
                      filtered_coopang_data[i]['수량'] = filtered_coopang_data[i]['박스수량'];
                    
                    }else{
                      let qty = filtered_coopang_data[i]['박스수량'] -  box_in_qty;
                      if(qty === 0){
                        filtered_coopang_data[i]['수량'] = box_in_qty ;
                        filtered_coopang_data[i]['한진_수량'] = box_in_qty ;
                  
                        
                      }else{
                        filtered_coopang_data[i]['수량'] = box_in_qty + "(" + (filtered_coopang_data[i]['박스수량'] - box_in_qty) + ")";
                        filtered_coopang_data[i]['한진_수량'] = box_in_qty ;
                      
                      }
                     
                    }

                  }else{
                    filtered_coopang_data[i]['수량'] = filtered_coopang_data[i]['확정수량'];

                  }
                  filtered_coopang_data[i]['확인사항'] =  filtered_coopang_data[i]['확인사항체크용'] + '-' + filtered_coopang_data[i]['한진_수량'] + '개';

                  box_in_qty -= filtered_coopang_data[i]['박스수량'];

                  filtered_coopang_data[i]['박스'] = "1박스(" + filtered_coopang_data[i]['박스수량'] + ")";

                  filtered_coopang_data[i]['상품명'] = "쿠팡로켓배송C";
                 
                  
                  
                  standard_coopang_data.push(filtered_coopang_data[i]);
                  coopang_upload_result_data = standard_coopang_data;
                }
              // }
              

              filtered_coopang_data[i]['발주번호(PO ID)'] = filtered_coopang_data[i]['발주번호'];
              filtered_coopang_data[i]['물류센터(FC)'] = filtered_coopang_data[i]['물류센터'];
              filtered_coopang_data[i]['입고유형(Transport Type)'] = filtered_coopang_data[i]['입고유형'];
              filtered_coopang_data[i]['입고예정일(EDD)'] = filtered_coopang_data[i]['입고예정일'];
              filtered_coopang_data[i]['상품번호(SKU ID)'] = filtered_coopang_data[i]['상품번호'];
              filtered_coopang_data[i]['상품바코드(SKU Barcode)'] = filtered_coopang_data[i]['상품바코드'].toString();
              filtered_coopang_data[i]['상품이름(SKU Name)'] = filtered_coopang_data[i]['상품이름'];
             
              
              filtered_coopang_data[i]['송장번호(Invoice Number)'] = '';

              filtered_coopang_data[i]['확정수량(Confirmed Qty)'] = filtered_coopang_data[i]['한진_수량'];
              
              
              filtered_coopang_data[i]['납품수량(Shipped Qty)'] = filtered_coopang_data[i]['한진_수량'];
              
              
          }




         coopang_upload_result_state.update(() => coopang_upload_result_data);

         
          
     
        



         

         const milk_run_result = [];
         const milk_run_temp_result = [];
         
         const box_result = [];
         
         // 물류센터별 수량을 더하고, 10 이상인 경우 별도의 배열로 분류
         const result_centerSums = {};
         const centerSums = {};
         
         coopang_upload_result_data.forEach(item => {
           const center = item["물류센터"];
           const quantity = 1;
           // 중복된 물류센터가 나올 경우 합산
           result_centerSums[center] = (result_centerSums[center] || 0) + quantity;
         
           });
           coopang_upload_result_data.forEach(item => {
             const center = item["물류센터"];
              if (result_centerSums[center] < 10) {
               if (!box_result.includes(center)) {
                 box_result.push(item);
               }
          
           }else{
           }
         
           });
         
         
         
           filtered_coopang_data.forEach(item => {
               const center = item["물류센터"];
               const quantity = item["실제박스수량"];
               // 중복된 물류센터가 나올 경우 합산
               centerSums[center] = (centerSums[center] || 0) + quantity;
             
               });
               filtered_coopang_data.forEach(item => {
                 const center = item["물류센터"];
               
                  if (centerSums[center] >= 13) {
                 // 이미 결과 배열에 해당 물류센터가 없으면 추가
                 if (!milk_run_result.includes(center)) {
                   milk_run_result.push(item);
                 }
               }else if(centerSums[center] > 9 && centerSums[center] < 13 ){
                 if (!milk_run_temp_result.includes(center)) {
                   milk_run_temp_result.push(item);
                 }
             
               }
             
                 });




    milkrun_qty_data = milk_run_result.length;
    box_qty_data = box_result.length;


    milkrun_qty_state.update(() => milkrun_qty_data);
    box_qty_state.update(() => box_qty_data);

    coopang_shipment_data = box_result;

 
    

  
         coopang_shipment_state.update(() => coopang_shipment_data);
        

        })
      })

    }

  }


  const excelHanjinUpload = (e) => {
 
    const hanjin_upload_config : any = [
      {header: '상품명', key: '상품명', width: 30},
      {header: '수령인', key: '수령인', width: 30},
      {header: '연락처1', key: '연락처1', width: 30},
      {header: '연락처2', key: '연락처2', width: 30},
      {header: '우편번호', key: '우편번호', width: 30},
      {header: '주소', key: '주소', width: 30},
      {header: '확인사항', key: '확인사항', width: 30},
      {header: '체결번호', key: '체결번호', width: 30},
     
   
    ]; 
    

    const wb = new Excel.Workbook();
    const reader = new FileReader()

    let file = e.target.files[0];

    reader.readAsArrayBuffer(file)
    reader.onload = () => {
     let change_data = [];
     let empty_result = [];
     
      const buffer = reader.result;
      wb.xlsx.load(buffer).then(workbook => {
        workbook.eachSheet((sheet, id) => {
          sheet.eachRow((row, rowIndex) => {
            if(rowIndex > 1){
            let obj = {

            };
            for(let i=0; i<hanjin_upload_config.length; i++){
              obj[hanjin_upload_config[i].key] = row.values[i+1] !== '' ?  row.values[i+1] : "공백";

            }

            if(obj['체결번호'] !== '' && obj['체결번호'] !== undefined && obj['체결번호'] !== null){
              change_data.push(obj);
              hanjin_upload_data = change_data;
            }

          
            
          }else {

          }
          });

          console.log('coopang_shipment : ', coopang_shipment_data);
          
           
    
       

          if(hanjin_upload_data.length === 0){
           
          }else{

           
            
      
     
            let test = [];
            let usedCheques = [];
      
      
      coopang_shipment_data.forEach(itemB => {
        const key = itemB['확인사항'];
      
        const matchingA = hanjin_upload_data.find(itemA => itemA['확인사항'] === key);
      
        if (matchingA) {
          let nextChequeIndex = usedCheques.findIndex(entry => entry[key] === matchingA['체결번호']);

          if (nextChequeIndex === -1) {
            test.push(itemB);

            itemB['체결번호'] = matchingA['체결번호'];
            usedCheques.push({ [key]: itemB['체결번호'] });
            console.log('체결번호if : ', itemB['체결번호']);
          
            
          } else {
            const nextMatchingA = hanjin_upload_data.find(itemA => itemA['확인사항'] === key && itemA['체결번호'] !== matchingA['체결번호']);
            test.push(itemB);


            itemB['체결번호'] = nextMatchingA ? nextMatchingA['체결번호'] : undefined;
            const isDuplicate = usedCheques.some(entry => entry[key] === itemB['체결번호']);

            
            if (isDuplicate) {
              // 중복된 경우, nextMatchingA와 비슷한 다음 체결번호를 찾아서 처리
              let nextChequeIndex = hanjin_upload_data.findIndex(itemA => itemA['확인사항'] === key && itemA['체결번호'] !== matchingA['체결번호']);
          
              while (nextChequeIndex !== -1) {
                // 다음 인덱스부터 처리하는 로직
                const nextMatchingB = hanjin_upload_data[nextChequeIndex];
                
                // 다음 체결번호 찾기
                nextChequeIndex = hanjin_upload_data.findIndex((itemA, index) => index > nextChequeIndex && itemA['확인사항'] === key && itemA['체결번호'] !== matchingA['체결번호']);
                
                if (!usedCheques.some(entry => entry[key] === nextMatchingB['체결번호'])) {
                  usedCheques.push({ [key]: nextMatchingB['체결번호'] });
                }
              }
            } else {
              // 중복되지 않은 경우, 현재 체결번호 추가
              usedCheques.push({ [key]: itemB['체결번호'] });
            }

          
            
          }
        } else {
          itemB['체결번호'] = undefined;
        }
      });
     


    

let new_data;

console.log('unique',usedCheques);
console.log('test : ' ,test);

for (let i = 0;i < test.length; i++) {

  let key = Object.keys(usedCheques[i])[0];

  // '체결번호' 속성을 삭제
  delete test[i]["체결번호"];

  // 새로운 데이터 객체 생성
  new_data = { ...test[i], "체결번호": usedCheques[i][key] };



  empty_result.push(new_data);
  
 
}

// 디버깅을 위한 로그
      

coopang_shipment_data = empty_result;

console.log('empty_result : ', empty_result);

      
          
              hanjin_upload_state.update(() => hanjin_upload_data);
              coopang_shipment_state.update(() => coopang_shipment_data);
           
          
          }
        
          
          
        })
      })
    }

  }
  const excelHanjinTransportUpload = (e) => {

   
    const hanjin_transport_upload_config : any = [
      {header: '고객번호', key: '고객번호', width: 30},
      {header: '고객명', key: '고객명', width: 30},
      {header: '배송상태', key: '배송상태', width: 30},
      {header: '배송내역', key: '배송내역', width: 30},
      {header: '사유', key: '사유', width: 30},
      {header: '운송장번호', key: '운송장번호', width: 30},
      {header: '수량', key: '수량', width: 30},
      {header: '운임', key: '운임', width: 30},
      {header: '포장료', key: '포장료', width: 30},
      {header: '할증료', key: '할증료', width: 30},
      {header: '기타비용', key: '기타비용', width: 30},
      {header: '고객출고번호', key: '고객출고번호', width: 30},
      {header: '품목명', key: '품목명', width: 30},
   
      
     
   
    ]; 
   
    const wb = new Excel.Workbook();
    const reader = new FileReader()

    let file = e.target.files[0];

    reader.readAsArrayBuffer(file)
    reader.onload = () => {
     let change_data = [];
     
      const buffer = reader.result;
      wb.xlsx.load(buffer).then(workbook => {
        workbook.eachSheet((sheet, id) => {
          sheet.eachRow((row, rowIndex) => {
            if(rowIndex > 1){
            let obj = {

            };
            for(let i=0; i<hanjin_transport_upload_config.length; i++){
              obj[hanjin_transport_upload_config[i].key] = row.values[i+1] !== '' ?  row.values[i+1] : "공백";

            }
            change_data.push(obj);
         
            hanjin_transport_upload_data = change_data;
            
          }else {

          }
          });

          let filtered_hanjin_transport_data = change_data.filter((item)=> {
            return item.고객출고번호 !== '' && item.고객출고번호 !== undefined && item.고객출고번호 !== null;
          });

        

          
          console.log('coopang_shipment_data : ', coopang_shipment_data);
          console.log('filtered_hanjin_transport_data : ', filtered_hanjin_transport_data);
          
          if(filtered_hanjin_transport_data.length === 0){
           
          }else{
            hanjin_transport_upload_state.update(() => hanjin_transport_upload_data);
          }

          let coopang_data = coopang_shipment_data;

          

          let hanjin_data = hanjin_upload_data;
          
          
          
          for(let i=0; i<filtered_hanjin_transport_data.length; i++){
            
            for(let j=0; j<coopang_data.length; j++){
              if(filtered_hanjin_transport_data[i]['고객출고번호'] === coopang_data[j]['체결번호']){
                coopang_data[j]['송장번호(Invoice Number)'] = filtered_hanjin_transport_data[i]['운송장번호'];
              
                
              }

            }

          }

          
          coopang_shipment_data = coopang_data;
         

          coopang_shipment_state.update(() => coopang_shipment_data);

          
          
          
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



      const select_query = (type) => {
   
        const url = `${api}/${type}/select`; 
              
        search_data['filter'] = TABLE_FILTER[type];
        
        common_search_state.update(() => search_data);

        let start_date = moment(search_data['start_date']).format('YYYY-MM-DDTHH:mm:ss');

        let end_date = moment(search_data['end_date']).format('YYYY-MM-DDTHH:mm:ss');
        let search_text = search_data['search_text'];
        let filter_title = search_data['filter_title'];
        
        let params = 
        {
          start_date : start_date,
          end_date  : end_date,
          search_text : search_text,
          filter_title : filter_title,   
        };
        const config = {
          params : params,
          headers:{
            "Content-Type": "application/json",
            
          }
        }
          axios.get(url,config).then(res=>{
            
            table_data[type].setData(res.data);
            table_state.update(() => table_data);
           
         })
      
      }




      const makeTable = (table_state,type,tableComponent) => {


        
        const url = `${api}/${type}/select`; 
        
        search_data['filter'] = TABLE_FILTER[type];
        
        common_search_state.update(() => search_data);

        let start_date = moment(search_data['start_date']).format('YYYY-MM-DDTHH:mm:ss');

        let end_date = moment(search_data['end_date']).format('YYYY-MM-DDTHH:mm:ss');
        let search_text = search_data['search_text'];
        let filter_title = search_data['filter_title'];
      

        let params = 
        {
          start_date : start_date,
          end_date  : end_date,
          search_text : search_text,
          filter_title : filter_title,   
        };

       
        const config = {
          params : params,
          headers:{
            "Content-Type": "application/json",
            
          }
        }
          axios.get(url,config).then(res=>{
            
          
           
            if(res.data.length > 0){
             
              if(table_state[type]){
                table_state[type].destory();
              }

              
              table_data[type] =   new Tabulator(tableComponent, {
              height:TABLE_TOTAL_CONFIG['height'],
              layout:TABLE_TOTAL_CONFIG['layout'],
              pagination:TABLE_TOTAL_CONFIG['pagination'],
              paginationSize:TABLE_TOTAL_CONFIG['paginationSize'],
              paginationSizeSelector:TABLE_TOTAL_CONFIG['paginationSizeSelector'],
              movableColumns:TABLE_TOTAL_CONFIG['movableColumns'],
              paginationCounter: TABLE_TOTAL_CONFIG['paginationCounter'],
              paginationAddRow:TABLE_TOTAL_CONFIG['paginationAddRow'], //add rows relative to the table
              locale: TABLE_TOTAL_CONFIG['locale'],
              langs: TABLE_TOTAL_CONFIG['langs'],
              selectable: true,
             

              rowClick:function(e, row){
                //e - the click event object
                //row - row component
             
                row.toggleSelect(); //toggle row selected state on row click
            },

              rowFormatter:function(row){
                    row.getElement().classList.add("table-primary"); //mark rows with age greater than or equal to 18 as successful;
              },
           

              data : res.data,
            
              columns: TABLE_HEADER_CONFIG[type],
              
         
             
              });
            
              table_state.update(()=> table_data);

          
            
              
        }else{
          
          if(table_state[type]){
            table_state[type].destory();
          }

          table_data[type] =   new Tabulator(tableComponent, {
            height:TABLE_TOTAL_CONFIG['height'],
            layout:TABLE_TOTAL_CONFIG['layout'],
            pagination:TABLE_TOTAL_CONFIG['pagination'],
            paginationSize:TABLE_TOTAL_CONFIG['paginationSize'],
            paginationSizeSelector:TABLE_TOTAL_CONFIG['paginationSizeSelector'],
            movableColumns:TABLE_TOTAL_CONFIG['movableColumns'],
            paginationCounter: TABLE_TOTAL_CONFIG['paginationCounter'],
            paginationAddRow:TABLE_TOTAL_CONFIG['paginationAddRow'], //add rows relative to the table
            locale: TABLE_TOTAL_CONFIG['locale'],
            langs: TABLE_TOTAL_CONFIG['langs'],
            selectable: true,
            placeholder:"데이터 없음",
            rowClick:function(e, row){
              //e - the click event object
              //row - row component
           
              row.toggleSelect(); //toggle row selected state on row click
          },

            rowFormatter:function(row){
                  row.getElement().classList.add("table-primary"); //mark rows with age greater than or equal to 18 as successful;
            },
         

            data : [],
          
            columns: TABLE_HEADER_CONFIG[type],
            
      
            });
          
            table_state.update(()=> table_data);


       
        }
         })

        
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
  tokenChange,
  select_query,
  productSendDownload,
  shipDownload,
  excelHanjinTransportUpload,
  excelHanjinUpload,
  coopangShipmentDownload,
  palletDownload,
  milkrunBoxDownload,
  productSendPriceDownload
}