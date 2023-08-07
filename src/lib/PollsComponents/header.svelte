<header>
	<h1>Polls Maker</h1>
	<div class="a-button">
		<a href="/Projects"
			><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M21 11H6.414l5.293-5.293l-1.414-1.414L2.586 12l7.707 7.707l1.414-1.414L6.414 13H21z"
				/></svg
			> Back to projects</a
		>
	</div>
</header>

<style>
	header {
		background-color: #f7f7f7;
		padding: 10px;
		display: grid;
		grid-template-columns: 3.5fr 0.5fr;
		margin-top: 80px;
	}
	.a-button a {
		text-decoration: none;
		margin-right: 28px;
		font-family: 'poppins';
		color: #d91b42;
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
	}
	.a-button a:hover {
		color: rgba(0, 0, 0, 0.8);
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
