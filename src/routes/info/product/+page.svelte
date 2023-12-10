

<script>
	
    // @ts-nocheck
    import '../../../app.postcss';

    import Header from '$lib/components/layout/Header.svelte';
    import SideBar from '$lib/components/layout/SideBar.svelte';
    import Footer from '$lib/components/layout/Footer.svelte';
    import Title from '$lib/components/layout/Title.svelte';
    

    import { Tabs, TabItem, Timeline, TimelineItem, Button,ButtonGroup,Dropdown,DropdownItem,Input,Label,Select,Search} from 'flowbite-svelte';
    import { ChevronDownSolid, SearchOutline } from 'flowbite-svelte-icons';


    import Util from '$lib/components/modal/product/Util.svelte';
    

    import * as Icon from 'svelte-awesome-icons';

    import {productModalOpen} from '$lib/store/product/function';
    import {excelDownload, excelUpload, productSendDownload,shipDownload,fileButtonClick,coopangShipmentDownload,excelHanjinUpload,excelHanjinTransportUpload,palletDownload} from '$lib/store/common/function';
    
    import {product_form_state,product_modal_state} from '$lib/store/product/state';

    import {url_state,cookie_state,table_state,common_toast_state,coopang_upload_result_state,hanjin_upload_state,hanjin_transport_upload_state} from '$lib/store/common/state';
    import {TABLE_COMPONENT,EXCEL_CONFIG} from '$lib/module/common/constants';

    import SearchBar from '$lib/components/layout/SearchBar.svelte'
    import Toast from '$lib/components/toast/Toast.svelte'
    
    import {makeTable,infoCallApi} from '$lib/store/common/function';
    

	import { afterUpdate, onMount } from 'svelte';

  
    // import {TabulatorFull as Tabulator} from 'tabulator-tables';

    import 'tabulator-tables-css'; // CSS 파일이 import됩니다.
	import moment from 'moment';
            
  
    export let data;

 
    let tableComponent = "example-table-theme";


    onMount(()=>{
        
        makeTable(table_state,"product",tableComponent);

    });

    afterUpdate(()=> {

        if(data.title === 'redirect'){
            window.location.href = '/';
            alert('잘못된 주소거나 요청시간이 만료되었습니다.');
        }else if($url_state['path'] === '/product'){
         
            makeTable(table_state,"product",tableComponent);
        }
      
    })
     
 

 

    </script>
        
        {#if $common_toast_state['value'] === true}
         <Toast />
        {/if}

        
     
        <Header />

        <div class="grid grid-rows-16 grid-flow-col gap-1">
            <div class="row-span-16"> 
              <SideBar />
            </div>
            <div class="col-span-1 row-span-1"> 
              <Title title='기준정보 관리' subtitle='품목관리'/>
            </div>

           

            
            <div class="row-span-15 col-span-12 "> 
                <Tabs  style="pill" defaultClass=" mt-5 overflow-auto  flex rounded-lg divide-x divide-gray-200 shadow dark:divide-gray-700" >
                    <TabItem  open >
                   

                      <span slot="title">품목 관리</span>

                
                      <SearchBar title="product"/>


                      <div class='m-5'>

                        <Button  on:click={() => {productModalOpen('','add')}}>
                          <Icon.FloppyDiskSolid class='mr-2' size="20" />
                          추가
                        </Button>

                        <Button  color='red' on:click={() => productModalOpen('','check_delete')}>
                          <Icon.BanSolid class='mr-2' size="20" />
                          선택삭제
                        </Button>

                        <Button  color='green' on:click={() =>excelDownload('product',EXCEL_CONFIG['product'])}>
                          <Icon.FileCsvSolid class='mr-2' size="20" />
                          엑셀다운
                      </Button>

                    
                  

                      

                        {#if $product_modal_state['title'] === 'add'}
                          <Util title="add" />
                        {:else if $product_modal_state['title'] === 'update'}
                          <Util  title="update"/>
                          {:else if $product_modal_state['title'] === 'check_delete'}
                          <Util  title="check_delete"/>
                        {/if}
                        

                      </div>
                      <div class='m-5'>
                        <Button  color='green' on:click={(e)=> fileButtonClick('upload')}>
                          <Icon.UploadSolid class='mr-2' size="20" />
                            1.쿠팡발주서 업로드
                          <input 
                          hidden  
                          id = 'upload' 
                          type='file' 
                          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
                          on:change={(e)=> excelUpload(e)}
                    
                          />
                      </Button>
                      {#if $coopang_upload_result_state.length > 0}
                        <Button  color='green' on:click={(e)=> fileButtonClick('upload1')}>
                          <Icon.UploadSolid class='mr-2' size="20" />
                            2.한진택배양식 업로드
                          <input 
                          hidden  
                          id = 'upload1' 
                          type='file' 
                          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
                          on:change={(e)=> excelHanjinUpload(e)}
                    
                          />
                      </Button>
                      {#if $hanjin_upload_state.length > 0}
                      <Button  color='green' on:click={(e)=> fileButtonClick('upload2')}>
                        <Icon.UploadSolid class='mr-2' size="20" />
                          3.한진택배 운송장 업로드
                        <input 
                        hidden  
                        id = 'upload2' 
                        type='file' 
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
                        on:change={(e)=> excelHanjinTransportUpload(e)}
                  
                        />
                    </Button>
                      {/if}


                      {/if}
                   


                    

                        </div>

                      <div class='m-5'>

                        {#if $coopang_upload_result_state.length > 0}
                        <Button  color='green' on:click={() =>productSendDownload()}>
                          <Icon.FileCsvSolid class='mr-2' size="20" />
                          생산부 전달용 다운
                      </Button>
                      <Button  color='green' on:click={() => palletDownload()}>
                        <Icon.FileCsvSolid class='mr-2' size="20" />
                        파렛트 다운
                     </Button>
                      
                     <Button  color='green' on:click={() => shipDownload()}>
                        <Icon.FileCsvSolid class='mr-2' size="20" />
                        한진택배송장 다운
                      </Button>

                        {#if $hanjin_transport_upload_state.length > 0}
                        <Button  color='green' on:click={() =>coopangShipmentDownload()}>
                          <Icon.FileCsvSolid class='mr-2' size="20" />
                          쿠팡쉽먼트 다운
                      </Button>
                      {/if}

                      {/if}

                      </div>


                      <div id="example-table-theme" bind:this={tableComponent}></div>
                    </TabItem>
                   
                  
          
                  </Tabs>
                <Footer />
            </div>
         
          </div>
       
        
        
    
    