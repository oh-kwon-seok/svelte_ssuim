



<script>

	// @ts-nocheck
    import {  Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, SidebarDropdownWrapper, SidebarDropdownItem  } from 'flowbite-svelte'
    import { page } from '$app/stores';
    import { sineIn } from 'svelte/easing';
    import * as Icon from 'svelte-awesome-icons';
  
  let spanClass = 'flex-1 ml-3 whitespace-nowrap';
  $: activeUrl = $page.url.pathname
  $: mainPath = activeUrl.split('/')[1];
    // add your logic here
  
    
  


  import { menu_state } from '$lib/store/common/state';

  import { handleToggle } from '$lib/store/common/function';
  import { afterUpdate, onMount } from 'svelte';


  let transitionParams = {
    x: -320,
    duration: 100,
    easing: sineIn
  };
  // let text_style = 'font-heavy text-green-400 bg-green-100  hover:text-black '
  let text_style = 'font-heavy  hover:text-black '

  console.log('gg');


</script>






	<main>
		<slot />
	</main>

    <Sidebar >
        <SidebarWrapper divClass='overflow-y-auto py-4 px-3 bg-gray-50 rounded  h-screen'>
          <SidebarGroup >
            
            <SidebarItem class={text_style} label="Home" href='/home' active={activeUrl === '/home'} {spanClass}>
             
                <svelte:fragment slot="icon">
                    <Icon.HouseSolid size="20"/>
                </svelte:fragment>
            </SidebarItem>
 
          </SidebarGroup>

          <SidebarGroup border>
            <SidebarDropdownWrapper class={text_style} label="기준정보관리" isOpen={mainPath ==='info' ? true : false} transitionType="fly" {transitionParams} >
                <svelte:fragment slot="icon">
                    <Icon.DatabaseSolid size="20"/>
                </svelte:fragment>
              <SidebarDropdownItem class={text_style} label="품목 관리" href='/info/item' active={activeUrl === '/info/item'} on:click={handleToggle('info')} />
                
            </SidebarDropdownWrapper>
 
          </SidebarGroup>

          <SidebarGroup border>
            <SidebarDropdownWrapper class={text_style} label="영업 관리" isOpen={mainPath ==='project' ? true : false} transitionType="fly" {transitionParams} >
              <svelte:fragment slot="icon">
                <Icon.StoreSolid size="20"/>
            </svelte:fragment>
              <SidebarDropdownItem class={text_style} label="수주 관리" href='/project/project' active={activeUrl === '/project/project'} on:click={handleToggle('project')}/>
         
            </SidebarDropdownWrapper>
          </SidebarGroup>
          <SidebarGroup border>
            <SidebarDropdownWrapper class={text_style} label="공정 및 설비 관리" isOpen={mainPath ==='process_equipment' ? true : false}   transitionType="fly" {transitionParams} >
              <svelte:fragment slot="icon">
                <Icon.ScrewdriverWrenchSolid size="20"/>
            </svelte:fragment>
              <SidebarDropdownItem class={text_style} label="공정 관리" href='/process_equipment' active={activeUrl === '/process_equipment/process_equipment' } on:click={handleToggle('process_equipment')}/>
         
            </SidebarDropdownWrapper>
          </SidebarGroup>

          <SidebarGroup border>
            <SidebarDropdownWrapper class={text_style} label="생산 관리"  isOpen={mainPath ==='product' ? true : false}  transitionType="fly" {transitionParams} >
              <svelte:fragment slot="icon">
                <Icon.IndustrySolid size="20"/>
            </svelte:fragment>
              <SidebarDropdownItem class={text_style} label="작업지시 관리" href='/product/product_order' active={activeUrl === '/product/product_order'} on:click={handleToggle('product')}/>
         
            </SidebarDropdownWrapper>
          </SidebarGroup>

          <SidebarGroup border>
            <SidebarDropdownWrapper class={text_style} label="출하 관리"  isOpen={mainPath ==='shipment' ? true : false}  transitionType="fly" {transitionParams} >
              <svelte:fragment slot="icon">
                <Icon.TruckFastSolid size="20"/>
            </svelte:fragment>
              <SidebarDropdownItem class={text_style} label="출하 지시 관리" href='/shipment/shipment_order' active={activeUrl === '/shipment/shipment_order'} on:click={handleToggle('shipment')}/>
         
            </SidebarDropdownWrapper>
          </SidebarGroup>
        </SidebarWrapper>
      </Sidebar>

