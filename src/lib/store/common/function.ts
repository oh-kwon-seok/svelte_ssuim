// @ts-nocheck


import { writable } from 'svelte/store';
import {common_alert_state,common_toast_state, menu_state,url_state,load_state,common_search_state,login_state,common_product_state,common_ship_state,common_user_state,table_state,coopang_upload_state,coopang_upload_result_state,coopang_shipment_state,hanjin_upload_state,hanjin_transport_upload_state } from './state';

// import {item_data,item_form_state} from '$lib/store/info/item/state';

import {TABLE_TOTAL_CONFIG,TABLE_HEADER_CONFIG,TABLE_FILTER} from '$lib/module/common/constants';

import axios from 'axios';
import {v4 as uuid} from 'uuid';
import Excel from 'exceljs';
import moment from 'moment';


import {TabulatorFull as Tabulator} from 'tabulator-tables';


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

  }
  const tokenChange = (token) => {
    
    login_data['token'] = token;
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
    {header: '구분', key: '구분', width: 30},
    {header: '제품명', key: '제품명', width: 30},
    {header: '수량', key: '수량', width: 30},
    {header: '박스', key: '박스', width: 30},
    {header: '발주처', key: '발주처', width: 30},
    {header: '발주번호', key: '발주번호', width: 30},
    {header: '유통기한', key: '유통기한', width: 30},
    {header: '비고', key: '비고', width: 30},


  ]; 


  try {

    let product_title : any= '생산부 전달용';
    
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

    let file_name = product_title + moment().format('YYYY-MM-DD HH:mm:ss') + '.xlsx';
  
  
    workbook.addWorksheet(product_title);
    const sheetOne = workbook.getWorksheet(product_title);
         
         
          
    // 컬럼 설정
    // header: 엑셀에 표기되는 이름
    // key: 컬럼을 접근하기 위한 key
    // hidden: 숨김 여부
    // width: 컬럼 넓이
    sheetOne.columns = product_send_config;
 
    const sampleData = coopang_upload_result_data;
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
         
            const sampleData = coopang_upload_result_data;
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
         
            const sampleData = coopang_shipment_data;
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
              obj[coopang_upload_config[i].key] = row.values[i+1] !== '' ?  row.values[i+1] : "공백";

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
                  filtered_coopang_data[i]['확인사항'] = product_data[z]['origin_name'];
                  
                  filtered_coopang_data[i]['인박스'] = product_data[z]['inbox'];
                  filtered_coopang_data[i]['아웃박스'] = product_data[z]['outbox'];
                  filtered_coopang_data[i]['박스수량'] = product_data[z]['qty'];
                  filtered_coopang_data[i]['단가'] = product_data[z]['price'];
                }
              }
              let box_qty = 0;
              box_qty = Math.ceil(filtered_coopang_data[i]['확정수량'] / filtered_coopang_data[i]['박스수량']);
              filtered_coopang_data[i]['실제박스수량'] = box_qty;
             
              if(box_qty > 0){
                let box_in_qty = filtered_coopang_data[i]['확정수량'];
                
                for(let a=0; a<box_qty; a++){
                 
               
                  if(box_in_qty > 0){
                   
    
                    if(box_in_qty > filtered_coopang_data[i]['박스수량']){
                      filtered_coopang_data[i]['수량'] = filtered_coopang_data[i]['박스수량'];
                    }else{
                      filtered_coopang_data[i]['수량'] = box_in_qty;
                    }

                  }else{
                    filtered_coopang_data[i]['수량'] = filtered_coopang_data[i]['확정수량'];

                  }
                  filtered_coopang_data[i]['확인사항'] += '-' + filtered_coopang_data[i]['수량'] + '개';
                  box_in_qty -= filtered_coopang_data[i]['박스수량'];

                  filtered_coopang_data[i]['박스'] = "1박스";

                  filtered_coopang_data[i]['상품명'] = "쿠팡로켓배송C";
                  
                  standard_coopang_data.push(filtered_coopang_data[i]);
                  coopang_upload_result_data = standard_coopang_data;
                }
              }
              

              filtered_coopang_data[i]['발주번호(PO ID)'] = filtered_coopang_data[i]['발주번호'];
              filtered_coopang_data[i]['물류센터(FC)'] = filtered_coopang_data[i]['물류센터'];
              filtered_coopang_data[i]['입고유형(Transport Type)'] = filtered_coopang_data[i]['입고유형'];
              filtered_coopang_data[i]['입고예정일(EDD)'] = filtered_coopang_data[i]['입고예정일'];
              filtered_coopang_data[i]['상품번호(SKU ID)'] = filtered_coopang_data[i]['상품번호'];
              filtered_coopang_data[i]['상품바코드(SKU Barcode)'] = filtered_coopang_data[i]['상품바코드'];
              filtered_coopang_data[i]['상품이름(SKU Name)'] = filtered_coopang_data[i]['상품이름'];
              filtered_coopang_data[i]['확정수량(Confirmed Qty)'] = filtered_coopang_data[i]['확정수량'];
              
              filtered_coopang_data[i]['송장번호(Invoice Number)'] = '';
              filtered_coopang_data[i]['납품수량(Shipped Qty)'] = filtered_coopang_data[i]['확정수량'];
              
              
          }

         coopang_upload_result_state.update(() => coopang_upload_result_data);
          
         coopang_shipment_data = filtered_coopang_data;

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
    console.log('시도함');


    const wb = new Excel.Workbook();
    const reader = new FileReader()

    let file = e.target.files[0];

    reader.readAsArrayBuffer(file)
    reader.onload = () => {
     let change_data = [];
     
      const buffer = reader.result;
      wb.xlsx.load(buffer).then(workbook => {
        console.log(workbook, 'workbook instance555')
        workbook.eachSheet((sheet, id) => {
          sheet.eachRow((row, rowIndex) => {
            console.log(row.values, rowIndex);
            if(rowIndex > 1){
            let obj = {

            };
            for(let i=0; i<hanjin_upload_config.length; i++){
              obj[hanjin_upload_config[i].key] = row.values[i+1] !== '' ?  row.values[i+1] : "공백";

            }

            change_data.push(obj);
         
            hanjin_upload_data = change_data;
            
          }else {

          }
          });

          let filtered_hanjin_data = change_data.filter((item)=> {
            return item.체결번호 !== '' && item.체결번호 !== undefined && item.체결번호 !== null;
          });

          
  
          if(filtered_hanjin_data.length === 0){
           
          }else{
            if(coopang_upload_result_data.length ===  filtered_hanjin_data.length){
              
              for(let i=0; i<coopang_upload_result_data.length; i++){
                hanjin_upload_data[i]["상품번호"] = coopang_upload_result_data[i]["상품번호"];

              }
              console.log('hanjin_upload_data : ', hanjin_upload_data);

              hanjin_upload_state.update(() => hanjin_upload_data);
            }else{
              alert('쿠팡 발주서업로드 데이터와 한진업로드 데이터가 일치하지 않습니다.');
            }

          
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
        console.log(workbook, 'workbook instance555')
        workbook.eachSheet((sheet, id) => {
          sheet.eachRow((row, rowIndex) => {
            console.log(row.values, rowIndex);
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

        

          
          if(filtered_hanjin_transport_data.length === 0){
           
          }else{
            hanjin_transport_upload_state.update(() => hanjin_transport_upload_data);
          }

          let coopang_data = coopang_shipment_data;
          let hanjin_data = hanjin_upload_data;
          
          

          for(let i=0; i<filtered_hanjin_transport_data.length; i++){
            
            for(let j=0; j<hanjin_data.length; j++){
              if(filtered_hanjin_transport_data[i]['고객출고번호'] === hanjin_data[j]['체결번호']){
                console.log('고객출고번호',filtered_hanjin_transport_data[i]['고객출고번호']);
                console.log('체결번호 : ',hanjin_data[j]['체결번호']);
                
                for(let z=0; z<coopang_data.length; z++){
                  if(coopang_data[z]['상품번호'] === hanjin_data[j]['상품번호']){
                    coopang_data[z]['송장번호(Invoice Number)'] = filtered_hanjin_transport_data[i]['운송장번호'];
                  }
                
                 
                }
                
              }

            }

          }
          coopang_shipment_data = coopang_data;
          console.log('coopang_data : ',coopang_data);

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
            console.log('select_query : ',res);
            console.log('table_data : ',table_data);
            
            table_data[type].setData(res.data);
            table_state.update(() => table_data);
           
         })
      
      }




      const makeTable = (table_state,type,tableComponent) => {


        console.log(table_state);
        console.log(type);
        console.log(tableComponent);
        
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
            
            console.log('makeTable : ',res);
         
           
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
              console.log('table_data  :', table_data);

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
            console.log('table_data  :', table_data);

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

}