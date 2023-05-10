<script lang="ts">
	import { Button, Modal, Label, Input, Checkbox, Card} from 'flowbite-svelte'
	import axios from 'axios'
	import Alert from '$lib/components/alert/Alert.svelte';
	import {LOGIN_ALERT} from '$lib/module/common/constants';
	import src_url from '$lib/images/sea.jpeg';
	import {common_alert_state,login_state} from '$lib/store/common/state';

	import {onChangeHandler} from '$lib/store/common/function';


	import { setCookie, getCookie, removeCookie } from '$lib/cookies';

	const login = (e : any) => {

		
		

		const url = '/api/user/auth/login'
		try {

			let params = $login_state;
		axios.get(url,{
			params,
		}).then(res => {

			console.log('res : ', res)
			if(res.data === ''){
				$common_alert_state = true;
			}else {
				


				// 쿠키 설정
			setCookie('my-cookie', $login_state['user_id'], { expires: 3600 });

		
		
				window.location.href = '/home';
			}		
		}
			
	)
		
	

		}catch (e : any){
			alert(`다음과 같은 에러가 발생했습니다 : ${e.name} : ${e.message}`);
		}

		$common_alert_state = false;
	}



	
  

</script>
		<div class="flex justify-center items-center ">
		<Card class="w-full mt-16 "  padding='xl' img={src_url}   reverse={false} horizontal>	
		<form class="flex flex-col space-y-6" >
				<h3 class="text-xl font-medium text-gray-700 dark:text-white p-0 w-80">스마트공장 MES 시스템</h3>
				<Label class="space-y-2">
					<span>ID</span>
					<Input   type="text" name="user_id" placeholder="ID를 입력하세요" required vind:value={$login_state.user_id} on:change={(e)=> onChangeHandler(e)} />
				</Label>
				<Label class="space-y-2 justify-center">
					<span>Password</span>
					<Input  type="password" name="user_password" placeholder="•••••" required vind:value={$login_state.user_password} on:change={(e)=> onChangeHandler(e)}/>
				</Label>
				<div class="flex items-start">
					<Checkbox>자동 저장</Checkbox>
					
				</div>
				<Button  type="submit" class="w-full" on:click={(e) => login(e)} >Login</Button>	
			
			</form>
		{#if $common_alert_state === true}
			<div class="mt-12">
				<Alert  color='red' title={LOGIN_ALERT.title} content={LOGIN_ALERT.content}/>
			</div>
		{/if}
	</Card>
</div>




	








