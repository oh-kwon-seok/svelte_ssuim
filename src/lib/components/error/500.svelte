<script>

import { Tabs, TabItem, Timeline, TimelineItem, Button } from 'flowbite-svelte';



</script>

<section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">500</h1>
            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">데이터를 불러올 수 없습니다.</p>
            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">서버와의 통신에 문제가 있습니다. 새로고침해주십시오.</p>
            <Button  on:click={(e)=> location.reload()}>새로고침</Button>
        </div>   
    </div>
</section>