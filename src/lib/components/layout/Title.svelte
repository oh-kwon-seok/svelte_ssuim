<script>
  // @ts-nocheck
    import {Breadcrumb,BreadcrumbItem} from 'flowbite-svelte';

    export let title;
    export let subtitle;
    

</script>





<main>
  <slot />
</main>

<div class="m-5">
<Breadcrumb aria-label="Solid background breadcrumb example" class="bg-gray-50 py-3 px-5 dark:bg-gray-900">
    <BreadcrumbItem href="/" home>{title}</BreadcrumbItem>
   
    {#if subtitle !=='none'}
    <BreadcrumbItem>
      {subtitle}
    </BreadcrumbItem>
    {:else}
    <div></div>
   
    {/if}


   
    
  </Breadcrumb>
</div>