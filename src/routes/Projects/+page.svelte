<script>
	import { showUl, switchUl } from '$lib/Javascript/store.js';
	import { projects } from '$lib/Javascript/store.js';
	import { activeLi } from '$lib/Javascript/store.js';
	import { fly, slide, scale } from 'svelte/transition';

	/**
	 * @param {number} i
	 */
	function setUlactive(i) {
		switchUl.update((switchUl) => (switchUl = i));
		toggleUl();
	}

	function toggleUl() {
		showUl.update((showUl) => (showUl = true));
	}
</script>

<h1 class="title">Projects</h1>

<ul in:scale out:scale>
	{#each projects as item, i}
		<li>
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a href={item.url} on:click={() => setUlactive(i)}>
				<div class="card">
					<div class="card-header">
						<img src={item.picture} alt="" />
						<p class="name">{item.id}</p>
					</div>

					<div class="project-info">
						<p>{item.description}</p>
					</div>
				</div>
			</a>
		</li>
	{/each}
</ul>

<style>
	.title {
		color: rgb(251, 250, 249);
		font-weight: 300;
		font-size: 2rem;
		font-family: sans-serif;
		background-color: #a3ada3;
		box-sizing: border-box;
		padding: 0.5rem;
		text-align: start;
		margin-top: 90px;
		text-transform: uppercase;
	}
	ul {
		margin-top: 20px;
		list-style: none;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 0;
		box-sizing: border-box;
	}

	ul > li {
		margin: 20px;
		padding: 0;
		box-sizing: border-box;
	}

	ul > li > a {
		text-decoration: none;
		margin: 0;
		padding: 0;
	}
	.card:hover {
		cursor: pointer;
		box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 6);
		transition: ease-in-out 0.2s;
		scale: (1);
	}
	.card-header {
		text-align: center;
		width: 100%;
		box-sizing: border-box;
		border-radius: 5px 5px 0 0;
		padding: 0.3rem;
		display: flex;
		justify-content: space-evenly;
		align-items: center;

		margin: 0;
	}
	.card-header p {
		font-size: 26px;
		font-family: 'Poppins';
		font-weight: 200;
	}
	.card-header img {
		height: 80px;
		width: 80px;
		object-fit: scale-down;
		border-radius: 5px;
	}

	.project-info {
		width: 100%;
		height: 100%;
		padding: 5px;
		box-sizing: border-box;
		text-align: center;
		word-wrap: normal;
		margin: 0;
	}
	.project-info > p {
		font-size: 14px;
		color: #101010;
		flex-wrap: wrap;
		text-align: center;
		font-family: 'roboto-slab';
		margin: 0;
	}
	.name {
		font-size: 1rem;
		text-align: center;
		color: #101010;
		font-weight: bold;
	}
	.card {
		position: relative;
		background-color: #fff;
		border: 1px solid #ccc;
		border-radius: 5px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		margin: 0;
		padding: 20px;
		width: 300px;
		min-height: 220px;
	}
	@media only screen and (max-width: 1200px) {
		/* For mobile phones: */
		ul {
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			width: 100%;
			margin: 0;
			padding: 0;
		}
	}
	@media only screen and (max-width: 1145px) {
		/* For mobile phones: */
		ul {
			display: grid;
			grid-template-columns: 1fr 1fr;
			place-content: center;
			width: 70%;
			margin: 0 auto;
		}
		.card {
			margin: 0 auto;
		}
	}
	@media only screen and (max-width: 1060px) {
		ul {
			display: grid;
			grid-template-columns: 1fr 1fr;
			place-content: center;
			width: 80%;
			margin: 0 auto;
			box-sizing: border-box;
			padding: 0 20%;
		}
	}
	@media only screen and (max-width: 950px) {
		ul {
			width: 90%;
		}
	}
	@media only screen and (max-width: 850px) {
		ul {
			width: 100%;
		}
	}
	@media only screen and (max-width: 750px) {
		ul {
			width: 100%;
			grid-template-columns: 1fr;
		}
	}
</style>
