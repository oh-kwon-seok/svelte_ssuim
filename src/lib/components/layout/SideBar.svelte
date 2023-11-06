



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
              <SidebarDropdownItem class={text_style} label="품목 관리" href='/product' active={activeUrl === '/product'} on:click={handleToggle('product')} />
              <SidebarDropdownItem class={text_style} label="원산지 관리" href='/origin' active={activeUrl === '/origin'} on:click={handleToggle('origin')} />
              <SidebarDropdownItem class={text_style} label="규격 관리" href='/standard' active={activeUrl === '/standard'} on:click={handleToggle('standard')} />
              <SidebarDropdownItem class={text_style} label="단위 관리" href='/unit' active={activeUrl === '/unit'} on:click={handleToggle('unit')} />
                


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
    

       
        </SidebarWrapper>
      </Sidebar>

