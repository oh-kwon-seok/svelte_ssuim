<script>
	// @ts-nocheck
	import '../app.postcss';
	import { onMount,beforeUpdate } from 'svelte';

	import {changeUrl,infoCallApi} from '$lib/store/common/function';
	import axios from 'axios';



	beforeUpdate(() => {
    // 현재 URL을 가져와 currentUrl 변수에 저장합니다.
        const url = window.location.href;
        const path = url.replace(/^(https?:\/\/)?[^\/]+/, '');
        const queryIndex = path.indexOf('?');
        
		const pathname = (queryIndex === -1) ? path : path.slice(0, queryIndex);
        const search = (queryIndex === -1) ? '' : path.slice(queryIndex);

		let url_obj = {path : pathname, query : search }
		
		changeUrl(url_obj);
		infoCallApi('maker');
		infoCallApi('unit');
		infoCallApi('type');

		// const maker_url = '/api/maker/select';
		// try {
		// 	 axios.get(maker_url).then(res=>{
		// 		console.log('res : ',res);
		// 	})
		// }catch(e){
		// 	console.log('e',e);
		// } finally {
		// 	console.log('final : ');
		// }
	});



</script>


<div class='app '>
	<main>
		<slot />
	</main>

   

</div>
	
 