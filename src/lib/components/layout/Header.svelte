<script>
	// @ts-nocheck
	import '../../../app.postcss';

	import { Navbar, NavBrand, NavHamburger, NavUl, NavLi, Chevron, MegaMenu   } from 'flowbite-svelte'
  import {MENU} from '$lib/module/common/constants'


  
  let styles = {
    nav_link_style : '',
    nav_item_name : 'font-semibold dark:text-white',
    nav_item_help : 'text-sm font-light dark:text-gray-400',
    


  }

</script>
<main>
  <slot />
</main>

	<Navbar let:hidden let:toggle rounded >
        <NavBrand href="/">
            <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo"/>
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">쓰임받는사람들</span>
        </NavBrand>
        <NavHamburger on:click{toggle} />
        <NavUl {hidden}>
            <NavLi class={styles['nav_link_style']}><Chevron class="text-xl " aligned>기준정보 관리</Chevron></NavLi>
            
            <MegaMenu full items={MENU.info} let:item>
              <a href={"/info/" + item.id} class="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 h-full">
                <div class={styles['nav_item_name']}>{item.name}</div>
                <span class={styles['nav_item_help']}>{item.help}</span>
              </a>
            </MegaMenu>

            <NavLi class={styles['nav_link_style']}><Chevron aligned>회원 관리</Chevron></NavLi>
            
            <MegaMenu full items={MENU.customer} let:item>
              <a href={"/customer/" + item.id} class="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 h-full">
                <div class={styles['nav_item_name']}>{item.name}</div>
                <span class={styles['nav_item_help']}>{item.help}</span>
              </a>
            </MegaMenu>

         
       
        </NavUl>
      </Navbar>


 


	
 