
<script>

    // @ts-nocheck
    import { Hr, Button ,Modal, Label, Select, Input, Helper} from 'flowbite-svelte'
    
    import * as Icon from 'svelte-awesome-icons';
    
    import Toast from '$lib/components/toast/Toast.svelte';
    import Alert from '$lib/components/alert/Alert.svelte';
    import {product_modal_state, product_form_state} from '$lib/store/product/state';
    import {common_alert_state, common_toast_state} from '$lib/store/common/state';
    
    import {save} from '$lib/store/product/function';
    import {DATA_FAIL_ALERT,DATA_SELECT_ALERT} from '$lib/module/common/constants';
    
    export let title;



  
    console.log('title',title);
    
    let label_title = '';
   
   
    if(title === 'add'){
      label_title = '추가';
    }else if(title === 'update'){
      label_title = '수정';
    }else if(title === 'delete'){
      label_title = '삭제';
    }else if(title === 'check_delete'){
      label_title = '선택 삭제';
    }

    let color = title === 'add' || title === 'update' ? 'blue' : 'red'; 


  

    </script>

 

    <Modal title={`품목 ${label_title}`} color={color} bind:open={$product_modal_state[title]['use']} size="xl" placement={title === 'add' || title === 'check_delete'  ? 'center' : 'center-right'}   class="w-full">
       
          <!-- grid grid-cols-2 gap-4 -->
        <form action="#">
          {#if title === 'add' || title === 'update'}
   
        <div class="grid grid-cols-2 gap-4">
          
          <Label class="space-y-2">
            <span>SKU ID</span>
            <Input type="text" id="last_name" placeholder="SK UID를 입력하세요" required bind:value={$product_form_state['sk_uid']}/>
            
            {#if ($product_form_state['sk_uid'] === '' || $product_form_state['sk_uid'] === 0) && $common_alert_state['value'] === true}
            <Helper class="mt-2" color="red"><span class="font-medium">데이터를 입력해주세요</span></Helper>
            {/if}
          </Label>

          <Label class="space-y-2">
            <span>SKU NAME</span>
            <Input type="text" id="last_name" placeholder="SKU_NAME을 입력하세요" required bind:value={$product_form_state['ship_name']}/>
            
          </Label>

          <Label class="space-y-2">
            <span>마감명</span>
            <Input type="text" id="last_name" placeholder="마감명을 입력하세요" required bind:value={$product_form_state['origin_name']}/>
            
          </Label>

          <Label class="space-y-2">
            <span>인박스</span>
            <Input type="text" id="last_name" placeholder="인박스를 입력하세요" required bind:value={$product_form_state['inbox']}/>
            
          </Label>

          <Label class="space-y-2">
            <span>아웃박스</span>
            <Input type="text" id="last_name" placeholder="인박스를 입력하세요" required bind:value={$product_form_state['outbox']}/>
            
          </Label>

          <Label class="space-y-2">
            <span>수량</span>
            <Input type="number" id="last_name" placeholder="수량을 입력하세요" required bind:value={$product_form_state['qty']}/>
            
          </Label>
          <Label class="space-y-2">
            <span>공급가</span>
            <Input type="number" id="last_name" placeholder="공급금액을 입력하세요" required bind:value={$product_form_state['price']}/>
            
          </Label>


       
      
          
          
          {#if $product_modal_state['title'] === 'update'}
            <Label class="space-y-2">
              <span>사용유무</span>
              <Select id="countries" class="mt-2" bind:value={$product_form_state['used']} placeholder="">
                    <option value={0}>{"사용안함"}</option>
                    <option value={1}>{"사용"}</option>

                </Select>
            </Label>
          {/if}
          </div>
         

          <div class="grid grid-cols-1 gap-4">
                <Hr class="my-8 bg-slate-300 "  height="h-1"></Hr>
         
          </div>


         {#if $common_alert_state['type'] === 'save' && $common_alert_state['value'] === true}
            
         <Alert  state={'add'} color={DATA_FAIL_ALERT.color} title={DATA_FAIL_ALERT['add'].title} content={DATA_FAIL_ALERT['add'].content} />

       {/if}
       
        
          {#if $common_alert_state['type'] === 'select' && $common_alert_state['value'] === true}
            
            <Alert  state={'select'} color={DATA_SELECT_ALERT.color} title={DATA_SELECT_ALERT['select'].title} content={DATA_SELECT_ALERT['select'].content} />

          {/if}
          

          <div class="grid grid-cols-6 gap-4">
           
          </div>
            {:else }
              {#if title === 'delete'}
              <div>삭제하시겠습니까?</div>
              {:else }
              <div>선택한 항목을 삭제하시겠습니까?</div>
              
              {/if}
          {/if}
    
    
      
      
        </form>
        <!-- <svelte:fragment slot='footer'>
          <Button  color={title === 'add' || title === 'update'  ? 'blue' : 'red'}   class="w-full" on:click={save($product_form_state,title)}>{label_title}</Button>
       
          
        
        </svelte:fragment> -->
        <Button  color={title === 'add' || title === 'update'  ? 'blue' : 'red'}   class="w-full" on:click={save($product_form_state,title)}>{label_title}</Button>
       
       
        {#if $common_alert_state['type'] === 'save' && $common_alert_state['value'] === true}
     
        
        <!-- <div class="mt-12">
               <Alert  color={DATA_FAIL_ALERT.color} title={DATA_FAIL_ALERT[title].title} content={DATA_FAIL_ALERT[title].content}/>
           </div> -->
        {/if}

      </Modal>

    