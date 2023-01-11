<script lang="ts">
	import Close from '$lib/assets/images/circle-xmark-solid.svg';
	import { fly, slide, scale, fade } from 'svelte/transition';
</script>

<main in:scale out:scale>
	<div class="header">
		<a class="btn1" href="/"><img src={Close} alt="" /></a>
	</div>
	<embed
		src="./src/lib/assets/documents/Asbel_Fernandez_Resume.pdf"
		type="application/pdf"
		width="100%"
		height="600px"
	/>
</main>

<style>
	.header {
		display: flex;
		height: 50px;
		width: 100%;
		box-sizing: border-box;
		margin: 0;
		justify-content: flex-end;
		align-items: center;
		background-color: #333;
	}
	.btn1 {
		padding: 0;
		background: none;
		box-shadow: none;
		height: 40px;
		width: 40px;
		border: none;
		box-sizing: border-box;
		margin-right: 10px;
	}
	.btn1 > img {
		height: 100%;
		width: 100%;
		margin: 0;
		padding: 0;
		object-fit: cover;
	}

	.btn1:hover {
		background-color: #fff6;
		cursor: pointer;
		border-radius: 50%;
		height: 38px;
		width: 38px;
	}
</style>
