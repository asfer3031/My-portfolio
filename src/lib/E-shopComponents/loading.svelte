<main>
	<div class="loading-container">
		<div class="loading-spinner" />
		<p>Loading...</p>
	</div>
</main>

<style>
	.loading-container {
		display: grid;
		place-content: center;
		padding: 16px;
		height: 100vh;
		width: 100vw;
		color: #333;
		position: absolute;
		background-color: #fbfaf9;
	}

	.loading-spinner {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		border: 6px solid #ccc;
		border-top-color: #49fa9e;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
