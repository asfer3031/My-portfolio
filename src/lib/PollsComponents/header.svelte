<script>
	import Button from '$lib/Components/HomeButton.svelte';
</script>

<header>
	<h1>Polls Maker</h1>
	<div>
		<Button />
	</div>
</header>

<style>
	header {
		background-color: #f7f7f7;
		padding: 10px;
		display: grid;
		grid-template-columns: 3.5fr 0.5fr;
	}
	header > h1:nth-child(1) {
		display: grid;
		place-content: center;
	}

	header > div:nth-child(2) {
		display: grid;
		place-content: center;
	}

	h1 {
		margin: 0;
		text-align: center;
		color: #d91b42;
		font-family: 'roboto';
	}
</style>
