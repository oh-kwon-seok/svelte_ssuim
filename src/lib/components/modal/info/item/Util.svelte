
<script>

    // @ts-nocheck
    import {Indicator, Hr,P, Span,Button ,Modal, Label, Select, Input, Checkbox} from 'flowbite-svelte'
    
    import * as Icon from 'svelte-awesome-icons';
    
    import Alert from '$lib/components/alert/Alert.svelte';
    import {info_item_modal_state, info_item_form_state} from '$lib/store/info/item/state';
    import {common_alert_state,common_type_state, common_unit_state, common_maker_state} from '$lib/store/common/state';
    
    import {save,bomRowUtil,bomRowCellClick} from '$lib/store/info/item/function';
    import {DATA_FAIL_ALERT,DATA_SELECT_ALERT} from '$lib/module/common/constants';
    export let title; 

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


    console.log('$common_alert_state',$common_alert_state);
    
    
    </script>
    
    <Modal title={`품목 ${label_title}`} color={color} bind:open={$info_item_modal_state[title]['use']} size="xl" placement={title === 'add' || title === 'check_delete'  ? 'center' : 'center-right'}   autoclose={false} class="w-full">
        <form  action="#">
          <!-- grid grid-cols-2 gap-4 -->

          {#if title === 'add' || title === 'update'}
       <div class="grid grid-cols-2 gap-4">
          <Label class="space-y-2">
            <span>제조사</span>
            <Select id="countries" class="mt-2" bind:value={$info_item_form_state['maker']} placeholder="">
                {#each $common_maker_state as item}
                  <option value={item.maker_code}>{item.maker_name}</option>
                {/each}
              </Select>
          </Label>
          <Label class="space-y-2">
            <span>품번</span>
            
            {#if title === 'add'}
              
              {#if $info_item_form_state['maker'] === '한스텍'}

                 <!-- 한스텍일때만 코드 자동부여함, 나머지는 고객사이기 때문에 직접 입력 -->
                <Input type="text" id="code" placeholder="코드는 자동부여됩니다" required bind:value={$info_item_form_state['code']}/>
              {:else }
                <Input type="text" id="code" placeholder="코드를 입력하세요" required bind:value={$info_item_form_state['code']}/>
              {/if}

             {:else if title === 'update'}
              <Input type="text" disabled readOnly id="last_name" placeholder="코드를 입력하세요" required bind:value={$info_item_form_state['code']}/>
            {/if}
           

          </Label>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <Label class="space-y-2">
            <span>품명</span>
            <Input type="text" id="last_name" placeholder="품명을 입력하세요" required bind:value={$info_item_form_state['name']}/>
           
          </Label>
    
          <Label class="space-y-2">
            <span>단위</span>
            <Select id="countries" class="mt-2" bind:value={$info_item_form_state['unit']} placeholder="">
              
              
                {#each $common_unit_state as item}
                  <option value={item.unit_code}>{item.unit_name}</option>
                {/each}
              </Select>
          </Label>
          </div>
          <div class="grid grid-cols-2 gap-4">
          <Label class="space-y-2">
            <span>구분</span>
            <Select id="countries" class="mt-2" bind:value={$info_item_form_state['type']} placeholder="">
           
              
                {#each $common_type_state as item}
                  <option value={item.type_code}>{item.type_name}</option>
                {/each}
              </Select>
          </Label>
          </div>

          <div class="grid grid-cols-1 gap-4">
                <Hr class="my-8 bg-slate-300 "  height="h-1"></Hr>
         
          </div>

          <div class="grid grid-cols-6 gap-4">
            <P class="col-span-3 text-bold" align='center'>BOM 리스트</P>
            <Button color="blue" class="gap-4" on:click={() => bomRowUtil('add')}>
              행추가
              
              
              <Indicator color="none" class="bg-red-500 text-xs text-primary-800 font-semibold" size="lg">{$info_item_form_state['child'].length > 0 ? $info_item_form_state['child'].length : 0}</Indicator>
            
            </Button>
            <Button color="red" class="gap-4" on:click={() => bomRowUtil('check_delete')}>
              선택삭제
             </Button>
             <Button color="red" class="gap-4" on:click={() => bomRowUtil('delete')}>
              행삭제
             </Button>
          </div>


          
          {#if $common_alert_state['type'] === 'select' && $common_alert_state['value'] === true}
            
            <Alert  state={'select'} color={DATA_SELECT_ALERT.color} title={DATA_SELECT_ALERT['select'].title} content={DATA_SELECT_ALERT['select'].content} />

          {/if}
          




          {#if $info_item_form_state['child'].length > 0}
            {#each $info_item_form_state['child'] as item,i}
              <div class="grid grid-cols-5 gap-4">
             

                <Label class="space-y-2">
                  
                  
                  <span >품번</span>
                  <div class="flex flex-row gap-2">
                  <Checkbox 
                  on:click={bomRowCellClick('check',item.id)}
                   
                  checked={item.check}/>
                  <Input type="text" placeholder="품번을 입력하세요" size="sm" bind:value={item.code} />
                </div>
                </Label>
                <Label class="space-y-2">
                  <span>품명</span>
                  <Input type="text" placeholder="품명을 입력하세요" size="sm" bind:value={item.name}/>
                </Label>
                <Label class="space-y-2">
                  <span>단위</span>
                  <Select id="countries" class="mt-2" bind:value={item.unit} placeholder="">
                
                    
                      {#each $common_unit_state as item}
                        <option value={item.unit_code}>{item.unit_name}</option>
                      {/each}
                    </Select>
                </Label>
                <Label class="space-y-2">
                  <span>구분</span>
                  <Select id="countries" class="mt-2" bind:value={item.type} placeholder="">
                
                    
                      {#each $common_type_state as item}
                        <option value={item.type_code}>{item.type_name}</option>
                      {/each}
                    </Select>
                </Label>
                <Label class="space-y-2">
                  <span>투입수량</span>
                  <Input type="text" placeholder="수량을 입력하세요" size="sm" bind:value={item.use_qty} />
                </Label>

                
              </div>
            
            {/each}

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
        <svelte:fragment slot='footer'>
          <Button   color={title === 'add' || title === 'update'  ? 'blue' : 'red'}   type="submit" class="w-full" on:click={save($info_item_form_state,title)}>{label_title}</Button>
          {#if $common_alert_state['type'] === 'save' && $common_alert_state['value'] === true}
          <div class="mt-12">
            
            
         
               <Alert  color={DATA_FAIL_ALERT.color} title={DATA_FAIL_ALERT[title].title} content={DATA_FAIL_ALERT[title].content}/>

            </div>
        {/if}
        
        </svelte:fragment>
      </Modal>

    