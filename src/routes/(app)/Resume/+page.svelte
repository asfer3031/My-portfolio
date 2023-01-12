<script lang="ts">
	import Close from '$lib/assets/images/circle-xmark-solid.svg';
	import { fly, slide, scale, fade } from 'svelte/transition';
	import Resume from '$lib/assets/documents/Asbel_Fernandez_Resume.pdf';
</script>

<main in:scale out:scale>
	<div class="header">
		<a class="btn1" href="/"><img src={Close} alt="" /></a>
	</div>

	<a href={Resume} target="_self">Asbel Fernandez Resume</a>

	<embed src={Resume} type="application/pdf" width="100%" height="800px" />
</main>

<style>
	main > a {
		display: none;
	}
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

	@media only screen and (max-width: 1000px) {
		main > embed {
			display: none;
		}

		main > a {
			height: 50px;
			width: 200px;
			background-color: rgba(3, 3, 3, 0.5);
			border-radius: 6px;
			margin: 50% auto;
			padding: 1rem;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: #fff7;
			font-weight: 200;
			text-decoration: none;
			font-size: 1.2rem;
		}
	}
</style>
