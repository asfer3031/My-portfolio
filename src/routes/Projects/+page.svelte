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

<ul in:scale out:scale>
	{#each projects as item, i}
		<li>
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a href={item.url} on:click={() => setUlactive(i)}>
				<div class="card">
					<div class="card-image" style="background-image: url({item.picture});" />
					<div class="project-info">
						<p class="name">{item.id}</p>
						<p>{item.description}</p>
						<div class="card-footer">
							<div class="card-footercontent">
								{item.Cardfootertitle} <img src={item.cardfooterimageUrl} alt="" />
							</div>
						</div>
					</div>
				</div>
			</a>
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 1rem;
		box-sizing: border-box;
	}

	ul > li {
		margin: 1rem 0 1rem 0;
		padding: 0;
		box-sizing: border-box;
		width: 80%;
		border-radius: 6px;
	}

	ul > li > a {
		text-decoration: none;
		margin: 0;
		padding: 0;
	}
	ul > li > a:hover {
		cursor: pointer;
	}

	.card {
		height: 200px;
		width: 100%;
		position: relative;
		border-radius: 6px;
		display: grid;
		grid-template-columns: 1.5fr 2.5fr;
		border: 1px solid rgb(202, 200, 200);
		background-color: #fff;
		box-shadow: 0 0 3px 2px #5553;
	}
	.card:hover {
		box-shadow: 0 0 3px 2px rgba(53, 53, 53, 0.719);
	}

	.card > div:nth-child(2) {
		width: 100%;
	}

	.card-image {
		height: 100%;
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		border-radius: 6px 0px 0 6px;
	}
	.card-footer {
		position: absolute;
		bottom: 0;
		right: 0;
		height: 40px;
		width: 100%;
		background-color: #101010;
		border-radius: 0 0px 6px 0px;

		box-sizing: border-box;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		color: #fff;
	}
	.card-footercontent {
		height: 100%;
		width: auto;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
	}
	.card-footercontent > img {
		height: 100%;
		width: 40px;
		margin-left: 10px;
		padding: 0;
		box-sizing: border-box;
		border: 0.5px;
		border: 0.5px solid #101010;
		border-radius: 0 0 6px 0;
	}
	.project-info {
		width: 100%;
		height: 100%;
		padding: 1rem;
		box-sizing: border-box;
		position: relative;
	}
	.project-info > p {
		font-size: 1rem;
		color: #101010;
		flex-wrap: wrap;
		text-align: center;
		font-family: 'roboto-slab';
	}
	.name {
		font-size: 1rem;
		text-align: center;
		color: #101010;
		font-weight: bold;
	}

	@media only screen and (max-width: 700px) {
		/* For mobile phones: */
		ul {
			list-style: none;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100%;
			margin: 0;
			padding: 0;
		}
		.card {
			min-height: 400px;
			height: auto;
			width: 300px;
			display: grid;
			grid-template-columns: 1fr;
			margin: 0;
			border-radius: 6px 6px 0 0;
		}

		.card-image {
			width: 100%;
			height: 40%;
			background-position: center;
			background-size: cover;
			background-repeat: no-repeat;
			border-radius: 6px 6px 0 0;
		}
		.project-info {
			height: 60%;
			position: absolute;
			bottom: 0;
			width: 100%;
			border-radius: 0px 0 6px 6px;
			padding: 5px;
			box-sizing: border-box;
		}
		.card-footer {
			border-radius: 0;
		}
	}
</style>
