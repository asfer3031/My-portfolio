<script>
	import '$lib/global.css';
	import Triangle from '$lib/assets/images/triangle-64.png';
	import Icon from '@iconify/svelte';

	import Searchinput from '$lib/E-shopComponents/Search.svelte';
	import Loading from '$lib/E-shopComponents/loading.svelte';
	import { slide, fly, fade, scale } from 'svelte/transition';
	import {
		showKart,
		showfilter,
		showcategories,
		categoryValue,
		account
	} from '$lib/Javascript/myStore.js';

	import {
		cartProducts,
		filterProductsByCategory,
		fetchProducts,
		initializeCartProducts,
		initializeProducts,
		isLoading,
		removeFromCart,
		calculateTotal,
		updateProductQuantity
	} from '$lib/Javascript/Products.js';

	import { onDestroy } from 'svelte';

	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let showcategorievalue = false;
	/**
	 * @type {any}
	 */
	let total;

	function loadFunction() {
		fetchProducts();
	}

	function loadOnce() {
		const isLoaded = sessionStorage.getItem('isFunctionLoaded');
		if (isLoaded === null) {
			loadFunction();
			sessionStorage.setItem('isFunctionLoaded', 'true');
		}
	}

	function cleanup() {
		sessionStorage.removeItem('isFunctionLoaded');
		sessionStorage.removeItem('products');
		sessionStorage.removeItem('cartItems');
	}

	onMount(async () => {
		loadOnce();
		initializeCartProducts();
		initializeProducts();
	});

	onDestroy(() => {
		if (browser) {
			window.addEventListener('unload', cleanup);
		}
	});

	let productData = [];
	let cartItemCount = 0;
	let itemQuantity;
	/**
	 * @param {any} productId
	 */
	function handleRemoveFromCart(productId) {
		removeFromCart(productId);
		total = calculateTotal();
	}

	/**
	 * @param {any} productId
	 */
	function addProductQuantity(productId) {
		// @ts-ignore
		const cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
		const product = cartItems.find((/** @type {{ id: any; }} */ item) => item.id === productId);

		if (product) {
			if (product.itemQuantity < 10) {
				product.itemQuantity++;
				updateProductQuantity(productId, product.itemQuantity);
			}
		}
		total = calculateTotal();

		// Return null or a default value if the product is not found
		return null;
	}
	/**
	 * @param {any} productId
	 */
	function minusProductQuantity(productId) {
		// @ts-ignore
		const cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
		const product = cartItems.find((/** @type {{ id: any; }} */ item) => item.id === productId);

		if (product) {
			if (product.itemQuantity < 10) {
				product.itemQuantity--;
				updateProductQuantity(productId, product.itemQuantity);
			}
		}
		total = calculateTotal();

		// Return null or a default value if the product is not found
		return null;
	}

	cartProducts.subscribe((value) => {
		productData = value;
		cartItemCount = productData.length;
	});

	/**
	 * @type {boolean}
	 */
	let showkartvalue;

	/**
	 * @type {boolean}
	 */
	let loadingValue;

	isLoading.subscribe((value) => {
		loadingValue = value;
	});

	/**
	 * @param {string} url
	 */
	function letLoading(url) {
		if (browser) {
			if (window.location.href === '/') {
				// User is already on the homepage, do nothing
			} else {
				// User is not on the homepage, redirect to the homepage
				window.location.href = url;
				isLoading.update((isLoading) => (isLoading = true));
			}
		}
	}

	function toggleCarton() {
		showkartvalue = true;
		document.documentElement.style.overflow = 'hidden';
		total = calculateTotal();
	}

	function toggleCartoff() {
		showkartvalue = false;
		document.documentElement.style.overflow = 'auto';
	}

	let menu = false;

	function toggleMenuon() {
		menu = true;
		document.documentElement.style.overflow = 'hidden';
	}

	function toggleMenuoff() {
		menu = false;
		document.documentElement.style.overflow = 'auto';
	}

	let previousScroll = 0;
	/**
	 * @type {number}
	 */
	let currentScroll;

	let showNavbar = true;

	/**
	 * @type {{ contains: (arg0: any) => any; }}
	 */
	let divRef;

	/**
	 * @param {{ target: any; }} event
	 */
	function handleClick(event) {
		if (
			event.target.tagName !== 'BUTTON' &&
			(!divRef || !divRef.contains(event.target)) &&
			(!divRef || !divRef.contains(event.target.parentNode))
		) {
			showcategorievalue = false;
		}
	}

	/**
	 * @param {any} category
	 * @param {string} url
	 */
	function selectCategory(category, url) {
		isLoading.update((isLoading) => (isLoading = true));
		window.location.href = url;

		if (browser) {
			const stringValue = category;
			sessionStorage.setItem('myString', stringValue);
		}
		showcategorievalue = false;
		filterProductsByCategory();
	}

	let submenu = false;
	function subMenu() {
		submenu = !submenu;
	}
</script>

<slot />

<svelte:window on:mouseup={handleClick} />

{#if menu == true}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="side-menu" on:click={toggleMenuoff} in:fade out:fade>
		<div
			class="side-menu-inner"
			in:fly={{ x: -50, duration: 300 }}
			out:fly={{ x: -200, duration: 300 }}
			on:click|stopPropagation
		>
			<div class="side-menu-header">
				<div>
					<h3>My E-Store.</h3>
				</div>

				<div>
					<button on:click={toggleMenuoff}>
						<i class="icon-class">
							<Icon icon="ic:round-close" />
						</i>
					</button>
				</div>
			</div>
			<span class="line" />

			<div class="sub-menu-area">
				<button on:click={subMenu}
					>categories <img
						class={submenu === true ? 'active-triangle ' : 'Triangle'}
						src={Triangle}
						alt="the freindly grocery"
					/></button
				>
				<div class={submenu === true ? 'sub-menu-active' : 'sub-menu'}>
					{#if $categoryValue}
						{#each $categoryValue as category}
							<!-- svelte-ignore a11y-missing-attribute -->
							<button on:click={() => selectCategory(category, '/Projects/E-shop/detailedpage')}
								>{category}</button
							>
						{/each}
					{:else}
						<p>Loading data...</p>
					{/if}
				</div>
			</div>

			<ul>
				<li>
					<button on:click={() => letLoading('/')}
						><a href="#"><i class="my-icon"><Icon icon="octicon:home-24" /></i> All Products</a
						></button
					>
				</li>
				<li>
					<button>
						<a href="#"
							><i class="my-icon"><Icon icon="material-symbols:shopping-bag-outline" /></i> Services</a
						>
					</button>
				</li>
				<li>
					<button>
						<a href="#"> <i class="my-icon"><Icon icon="ic:outline-contact-phone" /></i> Contact</a>
					</button>
				</li>
				<li>
					<button>
						<a href="#"><i class="my-icon"><Icon icon="tabler:info-circle" /></i> Info</a>
					</button>
				</li>
			</ul>
		</div>
	</div>
{/if}
<!-- :::::::  :::::::  ::::::: :
	 ::       ::   ::  ::   ::    ::
	 ::       :::::::  :::::      ::
	 :::::::  ::   ::  ::   ::    ::

-->

{#if showkartvalue == true}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="filter-menu"
		in:fade={{ duration: 250 }}
		out:fade={{ duration: 250 }}
		on:click={toggleCartoff}
	>
		<div
			class="filter-inner"
			in:fly={{ x: 100, duration: 300 }}
			out:fly={{ x: 100, duration: 300 }}
			on:click|stopPropagation
		>
			<div class="form-header">
				<div class="filter-header">
					{#if cartItemCount > 0}
						<label for="price-filter">Items in Cart {cartItemCount}</label>
					{:else}
						<label for="price-filter">NO products Found</label>
					{/if}

					<button on:click={toggleCartoff}>X</button>
				</div>
			</div>

			{#if cartItemCount > 0}
				<ul>
					{#each $cartProducts as product, index}
						<li class="cart-item">
							<div class="products-in-cart">
								<img src={product.image} alt={product.name} />
								<h3>{product.name}</h3>
								<div class="quantity">
									<button on:click={() => minusProductQuantity(product.id)}>-</button>
									<p>{product.itemQuantity}</p>
									<button on:click={() => addProductQuantity(product.id)}>+</button>
								</div>

								<p>${product.itemTotal}.00</p>
								<button class="remove-cart-item" on:click={() => handleRemoveFromCart(product.id)}
									>remove</button
								>
							</div>
						</li>
					{/each}
					<li style="list-style: none; margin-top:20px">
						<div class="total-in-cart">
							<div />
							<div />
							<div />
							<p>total:${total}.00</p>
						</div>
						<div class="check-out">
							<div>
								<hr />
								<button
									on:click={() => {
										alert('Awesome! arranging your products');
									}}>Check out</button
								>
							</div>
						</div>
					</li>
				</ul>
			{:else}
				<p />
			{/if}
		</div>
	</div>
{/if}

<!-- :::::::  :::::::  ::     ::
	 ::   ::  ::   ::   ::   ::
	 ::   ::  :::::::    :: ::
	 ::   ::  ::   ::     ::

-->

{#if showNavbar == true}
	<div
		class="header-outer"
		in:fly={{ y: -100, duration: 500 }}
		out:fly={{ y: -300, duration: 2000 }}
	>
		<div class="back-to-projects">
			<a href="/Projects"
				><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M21 11H6.414l5.293-5.293l-1.414-1.414L2.586 12l7.707 7.707l1.414-1.414L6.414 13H21z"
					/></svg
				> Back to projects</a
			>
		</div>
		<div class="top-header">
			<div class="menu-btn">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<i class="icon-class" on:click={toggleMenuon}>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
						><path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg
					>
				</i>
			</div>

			<h3>My E-store<span>.</span></h3>

			<div class="links">
				<li class="categories">
					<button
						on:click={() => {
							showcategorievalue = !showcategorievalue;
						}}
						class="categories-button"
						>Categories <i
							style="display:flex; flex-direction:column; align-items:center; margin-left:5px;"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M3 21h4.675v-4.675H3V21Zm6.675 0h4.65v-4.675h-4.65V21Zm6.65 0H21v-4.675h-4.675V21ZM3 14.325h4.675v-4.65H3v4.65Zm6.675 0h4.65v-4.65h-4.65v4.65Zm6.65 0H21v-4.65h-4.675v4.65ZM3 7.675h4.675V3H3v4.675Zm6.675 0h4.65V3h-4.65v4.675Zm6.65 0H21V3h-4.675v4.675Z"
								/></svg
							></i
						></button
					>
				</li>
				<!-- <span class="line" /> -->

				<ul class="nav-links">
					<li><button on:click={() => letLoading('/Projects/E-shop')}>All Products</button></li>
				</ul>
				<!-- <span class="line" /> -->
			</div>
			<div class="each-icon">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="icon-area" on:click={toggleCarton}>
					<i class="icon-class">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
							><path
								fill="currentColor"
								d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2s-.9-2-2-2zM1 2v2h2l3.6 7.59l-1.35 2.45c-.16.28-.25.61-.25.96c0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12l.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2s2-.9 2-2s-.9-2-2-2z"
							/></svg
						>
					</i>

					{#if cartItemCount > 0}
						<div
							style="position: absolute; top: -10px; right: -10px; background-color: red; color: white; border-radius: 50%; padding: 2px 6px; font-size: 0.75em;"
						>
							{cartItemCount}
						</div>
					{/if}
				</div>
			</div>
		</div>
		<div class="search-mobile"><Searchinput /></div>

		<!-- ::::::::  ::::::::  :::::::::
			::        ::    ::     :: 
			::        ::::::::     ::
			::        ::    ::     ::
			::::::::  ::    ::     ::  -->

		{#if showcategorievalue}
			<!-- svelte-ignore a11y-click-events-have-key-events -->

			<div class="categories-menu" bind:this={divRef} in:slide out:slide>
				<div />
				<div class="category-items">
					{#if $categoryValue}
						{#each $categoryValue as category, i}
							<!-- svelte-ignore a11y-missing-attribute -->
							<button on:click={() => selectCategory(category, '/Projects/E-shop/detailedpage')}>
								<span class="category-bullet" />
								{category}</button
							>
						{/each}
					{:else}
						<p>Loading data...</p>
					{/if}
				</div>
				<div />
			</div>
		{/if}
	</div>
{/if}

{#if loadingValue}
	<div class="loading-screen">
		<Loading />
	</div>
{/if}

<style>
	.back-to-projects {
		display: flex;
		align-items: center;
		justify-content: end;
		height: 35px;
		width: 100%;
		padding: 5px;
	}
	.back-to-projects a {
		text-decoration: none;
		margin-right: 28px;
		font-family: 'poppins';
		color: #333;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.back-to-projects a:hover {
		color: rgba(0, 0, 0, 0.8);
	}
	.search-mobile {
		height: 40px;
		width: 100%;
		display: none;
		margin: 0 5px;
	}
	.total-in-cart {
		display: grid;
		grid-template-columns: 2fr 3fr 1fr 2fr 1fr;
	}
	.total-in-cart p {
		margin: 0;
		font-size: 18px;
		font-family: 'roboto-slab';
		color: rgba(0, 0, 0, 0.6);
		font-weight: bold;
	}
	.check-out {
		height: 80px;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: end;
	}
	.check-out div {
		width: 200px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.check-out div button {
		background-color: #ffa500;
		border: 0;
		box-shadow: none;
		color: #ffffff;
		cursor: pointer;
		font-size: 1rem;
		padding: 5px 20px;
		transition: background-color 0.3s;
		width: 100%;
		border-radius: 6px;
	}
	.check-out hr {
		width: 100%;
		justify-self: end;
	}
	.remove-cart-item {
		background: none;
		border: none;
		padding: 0;
		margin: auto 0;
		box-shadow: none;
		color: red;
		cursor: pointer;
		height: 30px;
	}
	.quantity {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
		border-radius: 6px;
		height: 100%;
		width: 100%;
	}

	.quantity button {
		font-size: 14px;
		font-weight: bold;
		color: rgba(0, 0, 0, 0.6);
	}
	.quantity > p {
		font-size: 18px;
		font-family: 'roboto-slab';
		color: rgba(0, 0, 0, 0.6);
		font-weight: bold;
		border: 1px solid #ccc;
		padding: 5px;
		height: 15px;
		display: grid;
		place-content: center;
	}
	.products-in-cart {
		display: grid;
		grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
		gap: 20px;
		width: 100%;
	}

	.products-in-cart h3:nth-child(2) {
		display: flex;
		align-items: center;
	}
	.products-in-cart div:nth-child(3) {
		display: flex;
		align-items: center;
	}

	.products-in-cart p:nth-child(4) {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	/* .products-in-cart button:nth-child(5) {
		display: flex;
		align-items: center;
		justify-content: center;
	} */

	.cart-item {
		display: flex;
		align-items: center;
		padding: 10px;
		border-bottom: 1px solid #ccc;
		width: 100%;
	}

	.cart-item img {
		width: 80px;
		height: 80px;
		margin-right: 10px;
		object-fit: scale-down;
	}

	.products-in-cart > h3 {
		margin: 0;
		font-size: 16px;
		font-family: 'roboto-slab';
		color: rgba(0, 0, 0, 0.8);
		font-weight: 400;
	}

	.products-in-cart > p {
		margin: 0;
		font-size: 14px;
		font-family: 'roboto-slab';
		color: rgba(0, 0, 0, 0.6);
		font-weight: bold;
	}

	.links {
		display: flex;
		list-style: none;
	}
	.categories-button {
		margin: auto 0;
		width: auto;
		height: 100%;
		color: #333;
		font-family: 'Poppins';
		font-weight: bold;
		font-size: 14px;
		display: flex;
		align-items: center;
		text-transform: uppercase;
		letter-spacing: 1px;
		background-color: #04e772;
		border: 0;
		border-radius: 0;
		cursor: pointer;
		transition: all 0.3s ease-in-out;
		box-sizing: border-box;
		padding: 0 10px;
	}
	.categories-button:hover {
		color: #fbfaf9;
		padding: 0 20px;
	}
	.line {
		height: 80%;
		width: 1px;
		background-color: rgba(255, 255, 255, 0.4);
		margin: auto 5px;
		padding: 0;
	}
	.top-header {
		width: 100%;
		height: 50px;
		background-color: #333;
		padding: 0;
		display: flex;
		justify-content: space-between;
		margin-top: 0;
		box-sizing: border-box;
		row-gap: 10px;
		margin-bottom: 2px;
	}

	.icon-area {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0;
		width: 35px;
	}
	.icon-class {
		font-size: 1.5em;
		cursor: pointer;
		color: #00974a;

		margin: auto 5px;
	}
	.icon-class:hover {
		color: #49fa9e;
		backdrop-filter: blur(5px);
	}
	.each-icon {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: end;
		align-items: center;
		margin-right: 28px;
		box-sizing: border-box;
	}

	.side-menu-inner ul {
		margin-top: 20px;
		padding: 0;
		list-style: none;
		text-align: start;
	}

	.side-menu-inner li {
		display: block;
		margin-bottom: 20px;
	}

	.side-menu-inner li a {
		display: flex;
		align-items: center;
		font-size: 24px;
		color: #646464b7;
		text-decoration: none;
		padding: 10px;
	}
	.side-menu-inner li button {
		background: none;
		margin: 0;
		padding: none;
		border: 0;
		box-shadow: none;
		width: 100%;
	}
	.side-menu-inner li button a {
		display: flex;
		align-items: center;
		font-size: 24px;
		color: #646464b7;
		text-decoration: none;
		padding: 10px;
	}

	.my-icon {
		font-size: 1.9rem;
		margin-right: 5px;
	}

	.side-menu {
		height: 100vh;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
	}

	.side-menu-inner {
		background-color: #f6f6f6;
		width: 70%;
		height: 100%;
		border-right: 4px solid rgba(0, 0, 0, 0.4);
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		padding: 0.5rem 0;
	}
	.side-menu-inner span {
		border-top: 2px solid #e4e6e7;
		height: 2px;
		width: 80%;
		margin: 0.5rem auto;
	}

	.sub-menu-area {
		margin-top: 2rem;
	}

	.sub-menu-area > button {
		background: none;
		border: 0;
		box-shadow: none;
		font-size: 1.5rem;
		text-transform: capitalize;
		color: #4d4c4cb7;
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		background-color: #bbbbbba6;
		padding: 10px;
	}
	.sub-menu-area > button img {
		height: 0.8rem;
		opacity: 0.8;
		margin-left: 5px;
		transition: ease-in-out 0.2s;
	}

	.active-triangle {
		transform: rotate(180deg);
	}
	.Triangle {
		transform: rotate(90deg);
	}

	.side-menu-header {
		height: 60px;
		padding: 0;
		display: grid;
		grid-template-columns: 3fr 1fr;
		width: 100%;
		place-content: center;
		text-align: center;
	}
	.side-menu-header > div:nth-child(1) {
		color: #00974a;
		height: 40px;
		border-radius: 25px;
		display: grid;
		place-content: center;
		margin: 0 auto;
		width: 150px;
		font-family: 'Poppins';
		font-size: 1rem;
	}
	.side-menu-header > div:nth-child(2) {
		display: grid;
		place-content: center;
		height: 100%;
		width: 100%;
	}
	.side-menu-header > div:nth-child(2) button {
		display: grid;
		place-content: center;
		border: 0;
		box-shadow: none;
		background: none;
		height: 40px;
		width: 40px;
		padding: 0;
		border-radius: 8px;
	}

	.side-menu-header > div:nth-child(2) button img {
		height: 100%;
		width: 100%;
		padding: 0;
		margin: 0;
	}
	.sub-menu {
		height: 0px;
		overflow: hidden;
		transition: ease-in-out 0.3s;
	}
	.sub-menu button {
		display: none;
	}
	.sub-menu-active {
		height: 250px;
		padding: 0.5rem;
		background-color: #f1f1f1;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		align-items: flex-start;
		transition: ease-in-out 0.3s;
		overflow-x: hidden;
		border-bottom: 1px solid #bbbbbba6;
	}
	.sub-menu-active button {
		text-align: start;
		font-family: 'Poppins';
		font-size: 1rem;
		text-transform: capitalize;
		text-decoration: none;
		color: #4d4c4cb7;
		padding: 0.3rem;
		width: 100%;
		background: none;
		border: 0;
		box-shadow: none;
	}

	.categories-menu {
		height: 350px;
		width: 100%;
		transition: ease-in-out 1ms;
		/* display: grid;
		grid-template-columns: 1fr 3.5fr 1fr; */
		margin-top: 3px;
		box-shadow: 0 2px 3px 2px rgba(0, 0, 0, 0.2);
		background-color: rgba(0, 0, 0, 0.8);
		border: 0.5px solid rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(2px);
	}
	.category-items {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		row-gap: 0px;
		column-gap: 10px;
		background-color: #ccc;
		border: 0.5px solid rgba(0, 0, 0, 0.3);
		height: 100%;
		width: 100%;
		border-radius: 6px;
		margin: 0;
		padding: 14px 24px;
		box-sizing: border-box;
	}
	.category-items button {
		margin: 4px;
		text-decoration: none;
		font-family: sans-serif;
		font-weight: 700;
		word-wrap: normal;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.6);
		padding: 16px;
		box-sizing: border-box;
		display: grid;
		place-content: start;
		text-align: start;
		display: flex;
		align-items: center;
		text-align: start;
		background-color: #333;
		cursor: pointer;
		border: none;
		border-radius: 6px;
	}
	.category-items a i {
		margin-right: 5px;
		color: #49fa9e;
	}

	.category-items button:hover {
		color: #49fa9e;
	}
	.category-bullet {
		background-color: #49fa9e;
		margin-right: 10px;
		height: 12px;
		width: 12px;
	}
	.category-items button:hover span {
		-webkit-transform: rotate(140deg);
		display: inline-block;
		transition: ease-in-out 0.3s;
		height: 14px;
		width: 14px;
	}

	.header-outer {
		width: 100%;
		height: auto;
		z-index: 99;
		position: fixed;
		top: 80px;
		left: 0;
		right: 0;
		border-bottom: 3px solid #49fa9e;
		display: flex;
		align-items: center;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fbfaf9;
	}

	.top-header h3 {
		color: #04e772;
		font-family: sans-serif;
		font-weight: Bold;
		font-size: 1.5rem;
		box-sizing: border-box;
		letter-spacing: 1px;
		padding: 0;
		margin: auto 10px;
	}

	.search-area {
		height: 35px;
		margin: auto auto;
		width: 100%;
		padding: 0;
		border-radius: 4px;
	}

	.search-form button img {
		height: 30px;
		width: 30px;
		object-fit: cover;
		object-position: center;
		margin: 0;
		padding: 0;
	}

	.nav-links {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		height: 100%;
		width: auto;
	}

	.nav-links li {
		margin: 0 10px;
		box-sizing: border-box;
	}

	.nav-links li > button {
		height: 100%;
		width: auto;
		color: #91ac91;
		text-decoration: none;
		font-family: 'Poppins';
		font-weight: 400;
		padding: 0 4px;
		margin: 0;
		font-size: 14px;

		text-transform: capitalize;
		letter-spacing: 1px;
		background: none;
		border: 0;
		box-shadow: none;
		cursor: pointer;
	}
	.nav-links li > button:hover {
		color: #49fa9e;
		transform: scaleX(1);
		transform-origin: bottom left;
	}

	.icons button :hover {
		opacity: 0.7;
		cursor: pointer;
	}
	.icons button img {
		height: 100%;
		width: 100%;
		object-fit: contain;
	}

	.filter-menu {
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		position: fixed;
		top: 0;
		right: 0;
		z-index: 1000;
		border-right: 1px solid #ffa500;
	}
	.filter-inner {
		position: fixed;
		top: 0;
		right: 0;
		height: 100%;
		padding: 20px;
		background-color: #ffff;
		width: 40%;
		overflow-y: auto;
	}
	.filter-header {
		height: 40px;
		border-bottom: 0.5px solid #101010;
		width: 100%;
		padding: 1rem;
	}
	.filter-header label {
		text-align: center;
		color: rgba(0, 0, 0, 0.6);
		font-weight: 200;
		font-size: 1.5em;
		text-transform: uppercase;
		font-family: 'Poppins', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		padding-left: 20px;
	}

	.filter-header > button {
		font-size: 1.5rem;
		font-family: 'Poppins';
		color: rgba(0, 0, 0, 0.4);
		border: 0;
		box-shadow: none;
		float: right;
		transition-duration: 0.8s;
		background: none;
	}
	.menu-btn {
		display: none;
	}

	.filter-header > button:hover {
		transform: rotate(360deg);
		cursor: pointer;
	}

	@media only screen and (max-width: 1200px) {
		.each-icon {
			justify-content: center;
		}
		.menu-btn {
			margin: 0;
			padding: 0;
			height: 100%;
			width: 80px;
			display: grid;
			place-content: center;
			padding: 1rem;
			box-sizing: border-box;
		}
		.line {
			display: none;
		}
		.categories {
			display: none;
		}
		.filter-inner {
			width: 100%;
		}
		.search-area {
			display: none;
		}
		.logoimg h3 {
			word-wrap: nowrap;
		}
		.search-mobile {
			display: block;
			width: 95%;
		}
		.nav-links {
			display: none;
		}
	}

	@media only screen and (max-width: 600px) {
		.logoimg h3 {
			font-size: 2rem;
			width: 100%;
			text-align: center;
			margin: 0 auto;
		}
		.icons {
			display: flex;
			flex-direction: row;
			height: 40px;
			align-items: center;
			box-sizing: border-box;
			margin-right: 0.2rem;
		}
	}

	@media only screen and (max-width: 500px) {
		.icon-area {
			gap: 0;
			width: 35px;
			height: 50%;

			display: flex;
			align-items: center;
			justify-content: center;
		}
		.icon-class {
			font-size: 1.5em;
			cursor: pointer;
			color: #00974a;
			margin: 0 10px;
		}
	}

	@media only screen and (max-width: 300px) {
		.menu-btn {
			width: 30px;
			padding: 0;
			margin: 5px;
		}

		.icon-area {
			gap: 0;
			width: 35px;
			height: 100%;
			margin: 0;
		}
		.icon-class {
			font-size: 1.5em;
			margin: 0;
		}
	}

	/* Extra small devices (phones) */
	@media only screen and (max-width: 576px) {
		/* Styles for phones */
		.products-in-cart {
			gap: 10px;
		}

		.products-in-cart h3:nth-child(2) {
			display: flex;
			align-items: center;
			font-size: 14px;
		}
	}
</style>
