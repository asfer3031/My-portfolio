<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import Header from '$lib/Picture-FetcherComponents/header.svelte';
	import '$lib/global.css';
	import Modal from '$lib/Picture-FetcherComponents/Modal.svelte';
	import upPic from '$lib/assets/images/arrow-135-64.png';
	import Close from '$lib/assets/images/circle-xmark-solid.svg';

	let showModal = false;
	import { fly, slide, scale, fade } from 'svelte/transition';
	import { error } from '@sveltejs/kit';

	/**
	 * @type {number}
	 */
	let scrollpos;

	/**
	 * @param {{ detail: { text: any; }; }} event
	 */
	export async function handleMessage(event) {
		let searchvalue = event.detail.text;
		let clientId = 'oODACv19bvg6jOUDaRv-KSgz9mtlMaG5ib10d0rP50A';
		const response = await fetch(
			`https://api.unsplash.com/search/photos?client_id=${clientId}&query=${searchvalue}&per_page=30`
		);

		if (response.ok) {
			const data1 = await response.json();
			data.items = data1.results;
			scrollpos = 320;
			return {
				items: data1.results
			};
		} else {
			throw error(404, {
				message: 'Not found'
			});
		}
	}

	let key;

	/**
	 * @param {{ keyCode: any; }} event
	 */
	function handleKeydown(event) {
		key = event.keyCode;
		console.log(key);
		if (key == 27) {
			showModal = false;
		}
	}

	/**
	 * @type {number}
	 */
	let newindex;
	let picId;
	/**
	 * @type {any}
	 */
	let newHeight;

	/**
	 * @param {number} inPos
	 */
	function getAllelements(inPos) {
		toggleModal();
		newindex = inPos;
		picId = data.items[newindex].id;
		// newHeight = data.items[newindex].height + 'px';
	}

	const toggleModal = () => {
		showModal = !showModal;
	};

	function scrollUP() {
		scrollpos = 0;
	}
</script>

<svelte:window bind:scrollY={scrollpos} />
<!-- svelte-ignore a11y-click-events-have-key-events -->

<main class="main">
	<Modal {showModal} on:click={toggleModal}>
		<div class="modal-header">
			<button class="btn1" on:click={toggleModal}><img src={Close} alt="" /></button>
			<!-- <button class="btn" type="submit" value="download" on:click={downloadPicture}>DOWNLOAD</button -->
		</div>
		<div class="image-container">
			<div class="image-div">
				<img class="image-self" src={data.items[newindex].urls.regular} alt="" />
			</div>

			<div class="info-div">
				<p class="info-title">Photographer:</p>
				<div class="user" style="border: .5px solid {data.items[newindex].color};">
					<div
						class="user-image"
						style="background-image:url({data.items[newindex].user.profile_image.medium}) ;"
					/>
					<p class="user-name">
						"{data.items[newindex].user.first_name}
						{data.items[newindex].user.last_name}"
					</p>
				</div>
			</div>
		</div>
	</Modal>

	<Header on:message={handleMessage} />

	<div class="images-container" style="stretchfirst = true">
		{#each data.items as item, inPos}
			{#if item}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="image-conditional"
					on:click={() => getAllelements(inPos)}
					in:scale={{ duration: 500 }}
				>
					<img src={item.urls.regular} alt="just " class="image" />
					<div class="card-footer__evrlay">
						<div class="info">
							<div
								class="circle"
								style="background-image: url({item.user.profile_image.medium});"
							/>
							<p class="card-heading">Picture taken by:</p>
							<p>"{item.user.first_name} {item.user.last_name}"</p>
						</div>
					</div>
				</div>
			{:else}
				<p>{error}</p>
			{/if}
		{/each}
	</div>
</main>
{#if scrollpos > 500 && showModal == false}
	<div class="up-botton" in:fly={{ x: 200, duration: 500 }} out:fly={{ x: 200, duration: 500 }}>
		<button on:click={scrollUP}><img src={upPic} alt="" /></button>
	</div>
{/if}

<style>
	.main {
		width: 100%;
		height: 100%;
		background-color: #101010;
		scroll-behavior: smooth;
	}
	.up-botton {
		height: 50px;
		width: 50px;
		position: fixed;
		right: 20px;
		bottom: 40px;
		z-index: 300;
		border-radius: 6px;
	}
	.up-botton:hover {
		box-shadow: 0 0 3px 4px #fff7;
		border: 0.5px solid #fff;
	}

	.up-botton > button {
		height: 100%;
		width: 100%;
		background-color: #060b14;
		cursor: pointer;
		box-shadow: none;
		border: 1px solid #777;
		border-radius: 6px;
		padding: 1rem;
	}

	.up-botton > button > img {
		height: 100%;
		width: 100%;
	}

	.modal-header {
		display: flex;
		height: 50px;
		width: 100%;
		box-sizing: border-box;
		margin: 0;
		justify-content: flex-end;
		align-items: center;
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
		border: 1px solid #fff;
		cursor: pointer;
	}

	.user-name {
		margin: 0;
		/* color: rgba(0, 0, 0, 0.8); */
		color: #fff;
		font-family: 'roboto-slab';
		font-weight: bold;
		font-size: 18px;
		margin-left: 10px;
	}

	.user-image {
		height: 40px;
		width: 40px;
		border-radius: 50%;
		border: 1px solid #101010;
	}
	.user {
		height: 50px;
		width: 100%;
		background-color: #fff2;
		border-radius: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 5px;
		box-sizing: border-box;
	}
	.info-div {
		width: 100%;
		height: 100%;
		background-color: #101010;
		border-radius: 6px;
		padding: 10px;
		box-sizing: border-box;
	}
	.info-title {
		margin: 0;
		color: #fff7;
		font-family: 'roboto';
		font-weight: 300;
		font-size: 20px;
		margin-bottom: 5px;
	}
	.image-self {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}
	.image-div {
		border-radius: 6px;
		overflow: hidden;
		width: 100%;
		height: 100%;
		border: 1px solid #101010;
	}

	.image-container {
		width: 100%;
		height: 500px;
		display: grid;
		grid-template-columns: 2.5fr 1.5fr;
		box-sizing: border-box;
		gap: 10px;
	}

	.images-container {
		columns: 4;
		column-gap: 10px;
		width: 100%;
		height: auto;
		margin: 10px auto 0 auto;
		padding: 10px;
		background-color: #101010;
		box-sizing: border-box;
	}

	.image-conditional {
		height: 100%;
		width: 100%;
		position: relative;
		break-inside: avoid;
		margin-bottom: 10px;
	}

	.image {
		object-fit: cover;
		width: 100%;
		height: 100%;
		aspect-ratio: auto;
	}
	.circle {
		height: 50px;
		width: 50px;
	}

	.card-footer__evrlay {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		color: #fff;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		display: flex;
		align-items: end;
		justify-content: center;
		flex-direction: row;
		opacity: 0;
		transition: opacity 0.25s;
	}

	.card-footer__evrlay:hover {
		opacity: 1;
	}

	.info {
		display: flex;
		flex-direction: row;
		width: 100%;
		padding: 10px;
		background-color: rgba(8, 8, 8, 0.904);
		margin: 10px;
	}

	.card-heading {
		font-weight: bold;
	}

	.image:hover {
		transform: scale(1.5);
	}

	@media all and (max-width: 1200px) {
		.images-container {
			columns: 3;
			grid-template-rows: auto;
			width: 100%;
			padding: 2px;
		}
	}

	@media all and (max-width: 1180px) {
		.images-container {
			columns: 3;
		}
	}

	@media all and (max-width: 1090px) {
		.images-container {
			columns: 2;
		}
	}

	@media all and (max-width: 780px) {
		.image-container {
			width: 100%;
			height: 95%;
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			gap: 10px;
		}
		.modal-header {
			padding: 2px 0 2px 0;
		}
		.info-div {
			width: 100%;
			height: 30%;
			background-color: #101010;
			border-radius: 6px;
			padding: 10px;
			box-sizing: border-box;
		}
	}

	@media all and (max-width: 560px) {
		.images-container {
			columns: 1;
			grid-template-rows: auto;
			background-color: #101010;
		}
	}
</style>
