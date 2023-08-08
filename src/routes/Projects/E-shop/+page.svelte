<script>
	import { onMount, afterUpdate } from 'svelte';

	import { scale, fly, fade, slide } from 'svelte/transition';
	import { showfilter } from '$lib/Javascript/myStore.js';
	import Style0 from '$lib/assets/images/styles0.avif';
	import Style1 from '$lib/assets/images/styles1.avif';
	import Style2 from '$lib/assets/images/style2.jpg';
	import Style3 from '$lib/assets/images/style3.jpg';
	import Style4 from '$lib/assets/images/style4.jpg';
	import Style5 from '$lib/assets/images/style5.jpg';
	import { writable } from 'svelte/store';

	import {
		cartProducts,
		addToCart,
		Products,
		isLoading,
		removeFromCart,
		updateProductQuantity
	} from '$lib/Javascript/Products.js';
	export let message = '';
	export let visible = false;
	let total;

	let array; // Declare a variable to hold the current value of the array

	// Subscribe to the arrayStore and assign the current value to the 'array' variable
	Products.subscribe((value) => {
		array = value;
	});

	onMount(() => {
		showLoading();
	});

	const showLoading = () => {
		setTimeout(() => {
			isLoading.update((isLoading) => (isLoading = false));
		}, 5000);
	};

	// Function to hide the notification after a certain duration
	const hideNotification = () => {
		setTimeout(() => {
			visible = false;
		}, 5000);
	};

	let itemQuantity = 1;
	let itemTotal;

	/**
	 * @param {any} productId
	 * @param {any} price
	 * @param {string} name
	 * @param {any} image
	 * @param {number} index
	 */
	function handleAddProduct(productId, price, name, image, index) {
		visible = true;

		const newProduct = {
			id: productId,
			name: name,
			price: price,
			image: image,
			itemQuantity: itemQuantity,
			itemIndex: index,
			itemTotal: price
		};
		updateProductQuantity(productId, itemQuantity);
		message = name + 'has been added to the cart ';
		addToCart(newProduct, productId);
		hideNotification();
	}

	/**
	 * @param {any} productId
	 * @param {string | number | undefined} [index]
	 */
	function handleRemoveFromCart(productId, index) {
		removeFromCart(productId);
	}

	/**
	 * @type {boolean}
	 */
	let showfiltervalue;

	showfilter.subscribe((value) => {
		showfiltervalue = value;
	});
</script>

<main in:scale>
	<div class="wrapper">
		<div class="Main-card-div">
			<img src={Style1} alt="style1" />
			<div class="Title">
				<h3>My E-Store.</h3>
				<h5>Male accesories</h5>
			</div>
			<div class="darkener" />
		</div>

		<div class="Main-card-div">
			<img src={Style0} alt="style0" />
			<div class="Title">
				<h3>My E-Store.</h3>
				<h5>Female Closet</h5>
			</div>
			<div class="darkener" />
		</div>

		<div class="Main-card-div">
			<img src={Style2} alt="style0" />
			<div class="Title">
				<h3>My E-Store.</h3>
				<h5>Fragrances</h5>
			</div>
			<div class="darkener" />
		</div>
		<div class="Main-card-div">
			<img src={Style3} alt="style0" />
			<div class="Title">
				<h3>My E-Store.</h3>
				<h5>Electronincs</h5>
			</div>
			<div class="darkener" />
		</div>
		<div class="Main-card-div">
			<img src={Style4} alt="style0" />
			<div class="Title">
				<h3>My E-Store.</h3>
				<h5>Home-Decorations</h5>
			</div>
			<div class="darkener" />
		</div>
		<div class="Main-card-div">
			<img src={Style5} alt="style0" />
			<div class="Title">
				<h3>My E-Store.</h3>
				<h5>Sunglasses</h5>
			</div>
			<div class="darkener" />
		</div>
	</div>
	<!--    ::::::::                       ::
			::    ::                       ::
			::    ::  ::     :::::::  :::::::
			::::::::  :::::: ::   ::  ::   ::
			::        ::     ::   ::  ::   ::
			::        ::     ::   ::  ::   ::
			::        ::     :::::::  ::::::: -->

	<div class="product-cont-wrapper">
		<h1>Available Items</h1>

		<div class="products-container">
			{#if $Products}
				{#each $Products as item, index}
					<div class="product-card">
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<p>{item.brand}</p>
						<img src={item.images[0]} alt="Product Image" />
						<h3>{item.title}</h3>
						<p>{item.description}</p>
						<div class="price">
							<p class="dollar-sign">$</p>
							<p class="price-tag">{item.price}</p>
						</div>
						<div class="info">
							{#if item.isAdded == true}
								<button class="added-to-cart" on:click={() => handleRemoveFromCart(item.id, index)}
									>Added <i style="margin-left: 10px;"
										><svg
											xmlns="http://www.w3.org/2000/svg"
											width="15"
											height="15"
											viewBox="0 0 20 20"
											><path fill="currentColor" d="m0 11l2-2l5 5L18 3l2 2L7 18z" /></svg
										></i
									></button
								>
							{:else}
								<div class="add-to-cart-div">
									<button
										class="add-to-cart"
										on:click={() =>
											handleAddProduct(item.id, item.price, item.title, item.images[0], index)}
										>Add to Cart</button
									>
								</div>
							{/if}
						</div>
					</div>{/each}
			{:else}
				<p>Loading...</p>
			{/if}
		</div>
	</div>

	{#if visible}
		<div class="notification" in:fly={{ y: 50 }} out:fade>
			<p>{message}</p>
		</div>
	{/if}
</main>

<style>
	.add-to-cart-div {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.added-to-cart {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #00974a;
		border: 0;
		box-shadow: none;
		color: #ffffff;
		cursor: pointer;
		font-size: 1rem;
		padding: 5px 20px;
		transition: background-color 0.3s;
		width: 80%;
		margin: 0 auto;
	}
	.add-to-cart {
		background-color: #ffa500;
		border: 0;
		box-shadow: none;
		color: #ffffff;
		cursor: pointer;
		font-size: 1rem;
		padding: 5px 20px;
		transition: background-color 0.3s;
		width: 50%;
	}

	.notification {
		width: 200px;
		height: auto;
		position: fixed;
		bottom: 50px;
		right: 10px;
		transform: translateX(-20%);
		background-color: #f0f0f0;
		padding: 10px 20px;
		border-radius: 5px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
		background-color: #333;
		color: #49fa9e;
		font-family: 'poppins';
		font-weight: 200;
		font-size: 14px;
	}
	.wrapper {
		height: 400px;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(4, 1fr);
		gap: 10px;
		width: 90%;
		margin: 200px auto 0 auto;
		background: linear-gradient(
			90deg,
			rgb(241, 78, 13) 0%,
			rgba(9, 121, 54, 1) 35%,
			rgba(0, 212, 255, 1) 100%
		);
		border-radius: 6px;
		box-shadow: 90deg, rgba(24, 23, 23, 0.4), rrgb(3, 19, 9) rgb(5, 14, 15), 20px 40px 600px;
		padding: 14px;
	}
	.Main-card-div {
		position: relative;
		transition: ease 0.2s;
	}
	.darkener {
		position: absolute;
		display: block;
		background-color: rgba(0, 0, 0, 0.1);

		height: 100%;
		width: 100%;
	}
	.Title {
		color: #f6f6f6;
		font-family: 'Poppins';
		box-sizing: border-box;
		padding: 0.5rem;
		position: absolute;
		bottom: 10;
		right: 10;
		display: block;
		z-index: 1;
	}

	.Title h3 {
		font-size: 1.5rem;
		text-shadow: 2px 5px 3px rgba(0, 0, 0, 0.3);
		margin: 0;
	}
	.Title h5 {
		font-size: 0.8rem;
		margin: 0;
		transition: ease-in-out 0.2s;
		margin: auto auto;
		color: #fff;
		letter-spacing: 1px;
		border-radius: 6px;
		background-color: #10101054;
		padding: 0.3rem;
	}

	.Main-card-div > img {
		display: block;
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		object-fit: cover;
	}

	.wrapper div:nth-child(1) {
		grid-row: 1 / span 3;
	}

	.wrapper div:nth-child(2) {
		grid-row: 1 / span 3;
		grid-column: 2 / span 2;
	}
	.wrapper div:nth-child(3) {
		grid-row: 1 / span 4;
	}

	.wrapper div:nth-child(4) {
		position: relative;
	}

	.wrapper div:nth-child(5) {
		position: relative;
	}

	.wrapper div:nth-child(6) {
		position: relative;
	}

	.products-container {
		width: 100%;
		padding: 10px;
		height: auto;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		margin: auto auto;
		gap: 10px;
		box-sizing: border-box;
	}

	.product-cont-wrapper {
		width: 100%;
		margin-top: 24px;
		height: auto;
	}
	.product-cont-wrapper > h1 {
		color: rgb(251, 250, 249);
		font-weight: 300;
		font-size: 2rem;
		font-family: sans-serif;
		background-color: #a3ada3;
		box-sizing: border-box;
		padding: 0.5rem;
		text-align: start;
	}

	.product-card {
		width: 300px;
		height: auto;
		padding: 10px;
		text-align: center;
		background-color: #f6f6f6;
		border-radius: 6px;
		margin: 0;
	}
	.product-card:last-child {
		order: -1; /* Move the last item to the beginning */
	}

	.product-card h3 {
		color: #101010;
		font-family: 'Poppins';
		font-size: 0.8rem;
		font-weight: bold;
		display: -webkit-box;
		-webkit-line-clamp: 1; /* Number of lines to show */
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.product-card p {
		font-family: 'roboto-slab';
		font-size: 0.8rem;
		display: -webkit-box;
		-webkit-line-clamp: 2; /* Number of lines to show */
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;

		overflow: hidden;
	}

	.product-card img {
		height: 150px;
		width: 100%;
		object-fit: scale-down;
	}

	.price {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-weight: bold;
		margin: 10px auto;
		height: 25px;
	}

	.price .price-tag {
		font-size: 1rem;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	@media screen and (max-width: 1350px) {
		.products-container {
			padding: 0.2rem;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-wrap: wrap;
			margin: auto auto;
			gap: 10px;
		}
		.product-card {
			width: 280px;
			height: 300px;

			padding: 10px;
			text-align: center;
			background-color: #f6f6f6;

			margin: 0;
		}

		.product-card img {
			height: 35%;
			width: 100%;
			object-fit: scale-down;
		}
	}
	@media screen and (max-width: 1260px) {
		.product-card {
			width: 240px;
			height: 300px;

			padding: 10px;
			text-align: center;
			background-color: #f6f6f6;

			margin: 0;
		}
		.add-to-cart {
			font-size: 0.8rem;
			padding: 5px 15px;
			transition: background-color 0.3s;
			width: 50%;
		}
		.added-to-cart {
			font-size: 0.8rem;
			padding: 5px 15px;
		}
		.wrapper {
			margin-top: 230px;
		}
	}
	@media screen and (max-width: 1100px) {
		.product-card {
			width: 220px;
			height: 300px;
			border: 1px solid #ddd;
			padding: 10px;
		}
	}
	@media screen and (max-width: 1025px) {
		.product-card {
			width: 200px;
			height: 300px;
			border: 1px solid #ddd;
			padding: 10px;
		}
	}

	@media screen and (max-width: 745px) {
		.product-card {
			width: 190px;
			height: 280px;
			border: 1px solid #ddd;
			padding: 8px;
		}
		.product-card p {
			font-size: 0.6rem;
		}
		.wrapper div:nth-child(1) {
			grid-row: 1 / span 3;
			grid-column: 1 / span 2;
		}

		.wrapper div:nth-child(2) {
			grid-row: 3 / span 2;
			grid-column: 3 / span 2;
		}
		.wrapper div:nth-child(3) {
			grid-row: 1 / span 2;
			grid-column: 3 / span 1;
		}

		.wrapper div:nth-child(4) {
			grid-row: 4 / span 1;
			grid-column: 1 / span 2;
			position: relative;
		}

		.wrapper div:nth-child(5) {
			position: relative;
		}

		.wrapper div:nth-child(6) {
			position: relative;
		}
		.Title {
			color: #f6f6f6;
			font-family: 'Poppins';
			box-sizing: border-box;
			padding: 0.2rem;
			position: absolute;
			bottom: 10;
			right: 10;
			display: block;
			z-index: 1;
		}

		.Title h3 {
			font-size: 1rem;
		}
		.Title h5 {
			font-size: 0.5rem;
		}
	}

	@media screen and (max-width: 500px) {
		.product-card {
			width: 170px;
			height: 280px;
			border: 1px solid #ddd;
			padding: 8px;
		}
		.product-card p {
			font-size: 0.6rem;
		}
		.add-to-cart {
			font-size: 0.8rem;
			padding: 5px 15px;

			width: 80%;
		}
		.added-to-cart {
			font-size: 0.8rem;
			padding: 5px 15px;
			width: 80%;
		}
		.Title h3 {
			font-size: 0.8rem;
		}
		.Title h5 {
			font-size: 0.5rem;
		}
		.product-cont-wrapper > h1 {
			color: rgb(251, 250, 249);
			font-weight: 300;
			font-size: 1.5rem;
			font-family: sans-serif;
			background-color: #a3ada3;
			box-sizing: border-box;
			padding: 0.5rem;
			text-align: start;
		}
	}

	@keyframes slidein {
		from {
			margin-left: 5%;
			width: 5%;
		}

		/* 75% {
			font-size: 300%;
			margin-left: 5%;
			width: 5%;
		} */

		to {
			margin-left: 0%;
			width: 95%;
		}
	}
</style>
