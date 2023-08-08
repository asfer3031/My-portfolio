<script>
	import {
		filteredProducts,
		filterProductsByCategory,
		categoryNewValue,
		isLoading,
		addToCart,
		initializeCartProducts,
		removeFromCart,
		updateProductQuantity
	} from '$lib/Javascript/Products.js';
	import { onMount, afterUpdate } from 'svelte';
	export let message = '';
	export let visible = false;
	let itemQuantity = 1;
	let itemTotal;

	const hideNotification = () => {
		setTimeout(() => {
			visible = false;
		}, 5000);
	};

	import { slide, fly, fade, scale } from 'svelte/transition';
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

		message = name + 'has been added to the cart ';
		addToCart(newProduct, productId);
		hideNotification();
	}
	/**
	 * @param {any} productId
	 */
	function handleRemoveFromCart(productId) {
		removeFromCart(productId);
	}

	onMount(async () => {
		filterProductsByCategory();
		initializeCartProducts();
	});

	afterUpdate(() => {
		isLoading.update((isLoading) => (isLoading = false));
	});
</script>

<body>
	<h1 class="title">{$categoryNewValue}</h1>

	{#if $filteredProducts}
		<div class="products-container">
			{#each $filteredProducts as item, index}
				<div class="product-card">
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<p>{item.brand}</p>
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<img src={item.images[0]} alt="Product Image" />
					<h3>{item.title}</h3>
					<p>{item.description}</p>
					<!-- <div class="product-rating">
							<span class="rating">{product.rating}</span>
							<span class="max-rating">/5</span>
						</div> -->
					<div class="price">
						<p class="dollar-sign">$</p>
						<p class="price-tag">{item.price}</p>
					</div>
					<div class="info">
						{#if item.isAdded == true}
							<button class="added-to-cart" on:click={() => handleRemoveFromCart(item.id)}
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
				</div>
			{/each}
		</div>
	{:else}
		<p style="background-color:#101010;">No products found</p>
	{/if}
	{#if visible}
		<div class="notification" in:fly={{ y: 50 }} out:fade>
			<p>{message}</p>
		</div>
	{/if}
</body>

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
		margin-top: 200px;
		text-transform: uppercase;
	}
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

	.products-container {
		width: 100%;
		padding: 10px;
		height: auto;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		margin-top: 30px;
		gap: 10px;
		box-sizing: border-box;
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
			border: 1px solid #ddd;
			padding: 10px;
			text-align: center;
			background-color: #f6f6f6;
			box-shadow: 0 1px 3px 2px rgba(0, 0, 0, 0.1);
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
			border: 1px solid #ddd;
			padding: 10px;
			text-align: center;
			background-color: #f6f6f6;
			box-shadow: 0 1px 3px 2px rgba(0, 0, 0, 0.1);
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
		.title {
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
