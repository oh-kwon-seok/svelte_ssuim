

<script lang='ts'>
    import { Alert,Button } from 'flowbite-svelte';
    import { slide } from 'svelte/transition';
     import { quintOut, elasticOut } from 'svelte/easing';
   export let title : any;
   export let content : any;
   export let color : any;
   
   </script>
   
   
     <Alert dismissable color={color} transition={slide} >
       <span slot="icon"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg></span>
       <span class="text-lg font-medium">{title}</span>
       <div slot="extra">
         <div class="mt-2 mb-4 text-sm">{content}</div>
       
       </div>
     </Alert>


  
    
      <!-- <Alert color={color} dismissable>
        <span slot="icon"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
        </span>
        A simple info alert with an <b class="font-semibold  hover:text-red-800 dark:hover:text-red-900">{title}</b>{content}
      </Alert>  -->

   