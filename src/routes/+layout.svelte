<script>
	// @ts-nocheck
	import '../app.postcss';
	import { onMount,beforeUpdate } from 'svelte';

	import {changeUrl} from '$lib/store/common/function';



	beforeUpdate(() => {
    // 현재 URL을 가져와 currentUrl 변수에 저장합니다.
        const url = window.location.href;
        const path = url.replace(/^(https?:\/\/)?[^\/]+/, '');
        const queryIndex = path.indexOf('?');
        
		const pathname = (queryIndex === -1) ? path : path.slice(0, queryIndex);
        const search = (queryIndex === -1) ? '' : path.slice(queryIndex);

		let url_obj = {path : pathname, query : search }
		
		changeUrl(url_obj);
		



	});



</script>


<div class='app '>
	<main>
		<slot />
	</main>

   

</div>
	
 