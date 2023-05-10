<script>
    // @ts-nocheck
    import {Toolbar,Search, Select,Label,Button, Checkbox, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Input, P} from 'flowbite-svelte';
   

  
    import * as Icon from 'svelte-awesome-icons';
    import {info_item_data, info_item_header,info_item_form_state,info_item_modal_state} from '$lib/store/info/item/state';
    import {common_search_state} from '$lib/store/common/state';
    
    import {onSearchHandler,allCheckClick,cellClick,rowClick} from '$lib/store/common/function';
    
    import {modalOpen} from '$lib/store/info/item/function';
    import Util from '$lib/components/modal/info/item/Util.svelte'


    import {INFO_ITEM_SELECT_ARRAY} from '$lib/module/info/constants'
   
    export let color;
    export let filteredItems;

 
  console.log('filteredItems : ', filteredItems);
  

   
    let styles = {
      child_cell : 'text-neutral-500'
    }


  </script>
<Toolbar color="default">
 





  <div class="grid gap-6 mb-6 md:grid-cols-4">
      <div>
        <Label for="last_name" class="mb-2">시작일자</Label>
        <Input class="mt-2" type="date" id="first_name" placeholder="John" required bind:value={$common_search_state['start_date']} />
      </div>
     <div>
      <Label for="last_name" class="mb-2">종료일자</Label>
      <Input class="mt-2" type="date" id="first_name" placeholder="John" required bind:value={$common_search_state['end_date']} />
    </div>

    <div>
        <Label for="last_name" class="mb-2">구분</Label>
      <Select class= 'mt-2 ' id="countries"  bind:value={$common_search_state['type']} placeholder="" >
          <option selected={$common_search_state['type'] === 'all' ? true : false} value ='all'>전체</option>
  
          {#each INFO_ITEM_SELECT_ARRAY as {value, name}}
            <option {value}>{name}</option>
          {/each}
      </Select>
    </div>
    
    
    <div>  
          <Label for="last_name" class="mb-2">검색</Label>
      <Search class="mt-2" size='md'  placeholder="검색어를 입력해주세요" on:keypress={(e)=> onSearchHandler(e,filteredItems)}>
      
      </Search>
    </div>
  
  
  
   

  </div>
  </Toolbar>
  <Table
   
    color={color}
    placeholder="검색어를 입력하세요"
    hoverable={true}
   
  >
    <TableHead >
          {#each info_item_header as header}

            {#if header === ''}
            <TableHeadCell class='text-sm'><Checkbox on:click={(e) => allCheckClick(filteredItems,'check', $common_search_state['all_check'])} bind:checked={$common_search_state['all_check']}/></TableHeadCell>
            
            {/if}
           <TableHeadCell class='text-sm'>{header}</TableHeadCell>
           {/each}
     
    </TableHead>
    <TableBody class="divide-y">
      {#if filteredItems.length > 0}
      {#each filteredItems as item }
        <TableBodyRow color={item['select'] === true ? 'grey400' : 'default'} on:click={rowClick(filteredItems, 'select',item.code)} >
          <TableBodyCell>  
            <Checkbox on:click={cellClick(filteredItems, 'check',item.code)} checked={item.check}/>
          </TableBodyCell>

          <TableBodyCell class='flex flew-row' on:click={cellClick(filteredItems,'expand',item.code)}>  
            {#if item.expand === false}
            <Icon.ChevronDownSolid size="20" />
            {:else if item.expand === true}
            <Icon.ChevronUpSolid size="20" />    
            {/if}
          </TableBodyCell>
        
        
         <TableBodyCell>{item.id}</TableBodyCell>

          <TableBodyCell>{item.maker}</TableBodyCell>
          <TableBodyCell>{item.code}</TableBodyCell>
          <TableBodyCell>{item.name}</TableBodyCell>
          <TableBodyCell>{item.unit}</TableBodyCell>
          <TableBodyCell>{item.type}</TableBodyCell>
          <TableBodyCell>
            <Button  pill={true} outline={true}  class="!p-2" size="sm" on:click={modalOpen(item,'update')}> <Icon.PenSolid  size="20" /></Button>
            <Button color="red" pill={true} outline={true}  class="!p-2" size="sm" on:click={(e)=> modalOpen(item,'delete')} > <Icon.TrashSolid  size="20" /></Button>
          </TableBodyCell>
        </TableBodyRow>
        
        {#if item.expand === true && Object.keys(item).includes('child') === true}
      
     
      
        {#each item.child as child_item, index}
          <TableBodyRow >
            <TableBodyCell colspan={2}>
              {#if child_item.expand === false}
              <Icon.ChevronDownSolid size="20" />
              {:else if child_item.expand === true}
              <Icon.ChevronUpSolid size="20" />    
              {/if}
            
            
            </TableBodyCell>
            <TableBodyCell class={styles['child_cell']} >[{index + 1}] {child_item.id}</TableBodyCell>
            <TableBodyCell class={styles['child_cell']}>{child_item.maker}</TableBodyCell>
            <TableBodyCell class={styles['child_cell']}>{child_item.code}</TableBodyCell>
            <TableBodyCell class={styles['child_cell']}>{child_item.name}</TableBodyCell>
            <TableBodyCell class={styles['child_cell']}>{child_item.unit}</TableBodyCell>
            <TableBodyCell class={styles['child_cell']}>{child_item.type}</TableBodyCell>
            <TableBodyCell class={styles['child_cell']}></TableBodyCell>
            
          </TableBodyRow>

        {/each}
      
      
          {:else if item.expand === true && Object.keys(item).includes('child') === false}
          <TableBodyRow   class="bg-green-300" >
            <TableBodyCell class="text-center" colspan={info_item_header.length+1}>
              BOM이 없습니다.
            
            
            </TableBodyCell>
           
            
          </TableBodyRow>
        {/if}
     

      {/each}



      {:else }
      <TableBodyRow   class="bg-sky-300" >
        <TableBodyCell class="text-center text-white" colspan={info_item_header.length+1}>
          데이터가 존재하지 않습니다.
        </TableBodyCell>
      </TableBodyRow>
      {/if}

     
    </TableBody>
    <!-- <tfoot>
      <tr class="font-semibold text-gray-900 dark:text-white">
        <th scope="row" class="py-3 px-6 text-base">Total</th>
        <td class="py-3 px-6">3</td>
        <td class="py-3 px-6">21,000 </td>
      </tr>
    </tfoot> -->
  </Table>

  {#if $info_item_modal_state['add']['use'] === true || $info_item_modal_state['update']['use'] === true || $info_item_modal_state['delete']['use'] === true || $info_item_modal_state['check_delete']['use'] === true    }
    <Util title={$info_item_modal_state['title']} />
  {/if}


  