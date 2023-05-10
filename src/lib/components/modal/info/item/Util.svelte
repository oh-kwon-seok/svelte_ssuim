
<script>

    // @ts-nocheck
    import {  Button ,Modal, Label, Select, Input, Checkbox} from 'flowbite-svelte'
    
    import * as Icon from 'svelte-awesome-icons';
    
    import Alert from '$lib/components/alert/Alert.svelte';
    import {info_item_modal_state, info_item_form_state, info_item_type_array, info_item_unit_array, info_item_maker_array} from '$lib/store/info/item/state';
    import {common_alert_state} from '$lib/store/common/state';
    
    import {save} from '$lib/store/info/item/function';
    import {DATA_FAIL_ALERT} from '$lib/module/common/constants';
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



    </script>
    
    <Modal title={`품목 ${label_title}`} color={color} bind:open={$info_item_modal_state[title]['use']} size="xs" placement={title === 'add' || title === 'check_delete'  ? 'center' : 'center-right'}   autoclose={false} class="w-full">
        <form class="flex flex-col space-y-6" action="#">
        
          {#if title === 'add' || title === 'update'}
          <Label class="space-y-2">
            <span>제조사</span>
            <Select id="countries" class="mt-2" bind:value={$info_item_form_state['maker']} placeholder="">
                <!-- <option selected value="한스텍">한스텍</option> -->
              
                {#each info_item_maker_array as item}
                  <option {item}>{item}</option>
                {/each}
              </Select>
          </Label>
          <Label class="space-y-2">
            <span>품번</span>
            <Input disabled readOnly type="text" id="last_name" placeholder="코드를 입력하세요" required bind:value={$info_item_form_state['code']}/>
           
          </Label>
    
          <Label class="space-y-2">
            <span>품명</span>
            <Input type="text" id="last_name" placeholder="품명을 입력하세요" required bind:value={$info_item_form_state['name']}/>
           
          </Label>
    
          <Label class="space-y-2">
            <span>단위</span>
            <Select id="countries" class="mt-2" bind:value={$info_item_form_state['unit']} placeholder="">
              
              
                {#each info_item_unit_array as item}
                  <option {item}>{item}</option>
                {/each}
              </Select>
          </Label>
    
          <Label class="space-y-2">
            <span>구분</span>
            <Select id="countries" class="mt-2" bind:value={$info_item_form_state['type']} placeholder="">
           
              
                {#each info_item_type_array as item}
                  <option {item}>{item}</option>
                {/each}
              </Select>
          </Label>
            {:else }
              {#if title === 'delete'}
              <div>삭제하시겠습니까?</div>
              {:else }
              <div>선택한 항목을 삭제하시겠습니까?</div>
              
              {/if}
          {/if}
    
    
          
          <Button color={title === 'add' || title === 'update'  ? 'blue' : 'red'}   type="submit" class="w-full" on:click={save($info_item_form_state,title)}>{label_title}</Button>
          {#if $common_alert_state === true}
          <div class="mt-12">
            
            
         
               <Alert  color={DATA_FAIL_ALERT.color} title={DATA_FAIL_ALERT[title].title} content={DATA_FAIL_ALERT[title].content}/>

            </div>
        {/if}
        </form>
       
      </Modal>

    