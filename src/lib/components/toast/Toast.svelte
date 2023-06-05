<script>
    import { Toast, Button } from 'flowbite-svelte';
    import { slide,fly } from 'svelte/transition';
    import {onMount, beforeUpdate} from 'svelte';
    import {common_toast_state} from '$lib/store/common/state';
    import {timeout} from '$lib/store/common/function';

  
  

    // @ts-ignore
  
 
    onMount(() => {
        timeout();
    	
	});
  </script>
  
    {#if common_toast_state['type'] === 'success'}
        <Toast transition={fly} position={'none'} params="{{x: 200}}"  bind:open={common_toast_state['value']}>
            <svg slot="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Autohide in 
        </Toast>

    {:else }

    <Toast transition={fly} position={'none'} params="{{x: 200}}"   bind:open={common_toast_state['value']}>
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        11111s.
      </Toast>
      {/if}
