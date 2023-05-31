

<script>
	
    // @ts-nocheck
    import '../../../app.postcss';

    import Header from '$lib/components/layout/Header.svelte';
    import SideBar from '$lib/components/layout/SideBar.svelte';
    import Footer from '$lib/components/layout/Footer.svelte';
    import Title from '$lib/components/layout/Title.svelte';
    

    import { Tabs, TabItem, Timeline, TimelineItem, Button } from 'flowbite-svelte';

    import Table from '$lib/components/table/info/Table.svelte';
    import Util from '$lib/components/modal/info/item/Util.svelte';
    
    import Pagination from '$lib/components/table/info/Pagination.svelte';
    import * as Icon from 'svelte-awesome-icons';

    import {modalOpen} from '$lib/store/info/item/function';
    import {excelDownload, excelUpload, fileButtonClick} from '$lib/store/common/function';
    import {info_item_data, info_item_header,info_item_form_state,info_item_modal_state} from '$lib/store/info/item/state';
    import {common_search_state} from '$lib/store/common/state';
    import {EXCEL_INFO_ITEM_CONFIG} from '$lib/module/info/constants';
    import Item from './components/item.svelte'
  



    if($common_search_state['type'] === 'all'){
      $common_search_state['filteredItems'] = $info_item_data.filter((item) => item['maker'].indexOf($common_search_state['search_text'].toLowerCase()) !== -1 || item['name'].indexOf($common_search_state['search_text'].toLowerCase()) !== -1)
    }else {
      $common_search_state['filteredItems'] = $info_item_data.filter((item) => item[$common_search_state['type']].indexOf($common_search_state['search_text'].toLowerCase()) !== -1);
    }
   

   
  
    export let data;
    
    console.log('data : ', data);

    </script>
    
    
        <Header />

        <div class="grid grid-rows-1 grid-flow-col gap-2">
            <div class="row-span-3 h-screen"> <SideBar /></div>
            <div class="col-span-2 "> <Title title='기준정보 관리' subtitle='품목관리'/></div>
            
            <div class="col-span-12"> 
                <Tabs style='position: fixed; top: 0;' >
                    <TabItem open>
                      <span slot="title">품목 관리</span>

                      <Item />
                
                  
                    </TabItem>
                    <TabItem>
                      <span slot="title">구분 관리</span>
                      <div class='m-5'>
                         
                        <Button on:click={(e) => modalOpen('','add')}>
                          <Icon.FloppyDiskSolid class='mr-2' size="20" />
                          추가
                        </Button>
                        <Button color='green' on:click={excelDownload(common_search_state['filteredItems'],'info_item',EXCEL_INFO_ITEM_CONFIG)}>
                          <Icon.DownloadSolid class='mr-2' size="20" />
                          Download
                      </Button>
                      <Button color='green' on:click={(e)=> fileButtonClick('upload')}>
                        <Icon.UploadSolid class='mr-2' size="20" />
                          Upload
                        <input 
                        hidden  
                        id = 'upload' 
                        type='file' 
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
                        on:change={(e)=> excelUpload(e,EXCEL_INFO_ITEM_CONFIG)}

                        />
                    </Button>
                    <Button color='red' on:click={(e) => modalOpen($common_search_state['filteredItems'],'check_delete')}>
                      <Icon.TrashSolid class='mr-2' size="20" />
                      선택삭제
                    </Button>

                      </div>
                 
                    <Table color='default' filteredItems={$common_search_state['filteredItems']}/>
                    <div class="flex justify-center mt-10">
                      <Pagination />
                    </div>
                    </TabItem>
                    <TabItem>
                      <span slot="title">단위 관리</span>
                      <div class='m-5'>
                         
                        <Button on:click={(e) => modalOpen('','add')}>
                          <Icon.FloppyDiskSolid class='mr-2' size="20" />
                          추가
                        </Button>
                        <Button color='green' on:click={excelDownload($common_search_state['filteredItems'],'info_item',EXCEL_INFO_ITEM_CONFIG)}>
                          <Icon.DownloadSolid class='mr-2' size="20" />
                          Download
                      </Button>
                      <Button color='green' on:click={(e)=> fileButtonClick('upload')}>
                        <Icon.UploadSolid class='mr-2' size="20" />
                          Upload
                        <input 
                        hidden  
                        id = 'upload' 
                        type='file' 
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
                        on:change={(e)=> excelUpload(e,EXCEL_INFO_ITEM_CONFIG)}

                        />
                    </Button>
                    <Button color='red' on:click={(e) => modalOpen($common_search_state['filteredItems'],'check_delete')}>
                      <Icon.TrashSolid class='mr-2' size="20" />
                      선택삭제
                    </Button>

                      </div>
                 
                    <Table color='default' filteredItems={$common_search_state['filteredItems']}/>
                    <div class="flex justify-center mt-10">
                      <Pagination />
                    </div>
                    </TabItem>
          
                  </Tabs>
                <Footer />
            </div>
         
          </div>
       
        
        
    
    