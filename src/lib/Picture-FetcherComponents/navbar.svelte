<script>
	import '$lib/global.css';
	import Facebook from '$lib/assets/images/facebook-48.png';
	import Twitter from '$lib/assets/images/twitter-64.png';
	import Instagram from '$lib/assets/images/instagram-48.png';
	import { fade, slide, scale } from 'svelte/transition';

	/**
	 * @type {any}
	 */
	let scrolly = 0;
</script>

<svelte:window bind:scrollY={scrolly} in:slide />

<nav style="transition: ease-in-out .5s;" class:hideNav={scrolly > 160}>
	<div class="one">
		<div class="logo" />

		<ul>
			<li><a href="/Pricing">pricing</a></li>
			<li><a href="/Availability">Availability</a></li>
		</ul>
	</div>

	<div class="two">
		<a href="" class="social-icon"><img src={Facebook} alt="" class="icon" /></a>
		<a href="" class="social-icon"><img src={Twitter} alt="" class="icon" /></a>
		<a href="" class="social-icon"><img src={Instagram} alt="" class="icon" /></a>
		<!-- <a href="">{scrolly} </a> -->

		<ul>
			<li>
				<a href="/About">ABOUT / CONTACT</a>
			</li>
		</ul>
	</div>
</nav>

<style>
	.hideNav {
		background-color: rgb(10, 10, 10);
		transition: ease-in-out 1s;
		box-shadow: 0 0 5px 4px #7a5f02;
		border-bottom: 1px solid #7a5f04;
	}
	nav {
		height: 5rem;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		z-index: 3;
		position: fixed;
		top: 0;
		align-items: center;
	}

	.one {
		display: flex;
		flex-direction: row;
		margin-left: 10px;
	}
	.one > ul {
		display: flex;
		flex-direction: row;
		list-style: none;
	}

	.one > ul > li {
		margin-left: 10px;
		text-transform: capitalize;
		text-decoration: none;
	}

	.one > ul > li > a {
		text-decoration: none;
		color: #e4b10b;
		font-size: 1.5rem;
		margin-left: 10px;
		font-family: 'GreatVibes', 'sanserif';
		opacity: 0.8;
	}

	.one > ul > li > a:hover {
		color: #f7c317;
		-webkit-text-stroke-width: 1px;
		-webkit-text-stroke-color: #fff9;
	}

	.logo {
		height: 60px;
		width: 60px;
		border-radius: 50%;
		background-position: center;
		background-size: cover;
		object-fit: cover;
		background-image: url('$lib/assets/images/asbel_pic1.png');
		background-color: #fff9;
		box-sizing: border-box;

		/* border: 1px solid #b76e79; */
		background-repeat: no-repeat;
		border: 1px solid #d4af37;
	}

	.two {
		display: flex;
		flex-direction: row;
		justify-items: end;

		padding-right: 10px;
	}

	.two > ul {
		list-style: none;
		text-decoration: none;
		display: flex;
		flex-direction: row;
		/* background-color: #b76e79; */
		height: 100%;
	}

	.two > ul > li {
		display: flex;
		flex-direction: row;
		line-height: 1em;
		margin: 0;
		padding: 0;
		align-items: center;
	}
	.two > ul > li > a {
		text-decoration: none;
		text-transform: uppercase;
		color: #fff;
		font-family: 'roboto';
		font-size: 1rem;
		font-weight: 200;
		height: 100%;
		width: 100%;
		display: grid;
		place-content: center;
		border: 1.5px solid;
		border-image: linear-gradient(to right, #f7d461, #f1bb08, #7a5f04) 1;
		padding: 0.5rem;
	}

	.two > ul > li > a:hover {
		transition: ease-in-out;
		border: 0.5px solid #fff;
	}

	.social-icon {
		height: 1.5rem;
		width: 1.5rem;
		margin: auto 10px auto 10px;
	}

	.icon {
		height: 100%;
		width: 100%;
		object-fit: cover;
		object-position: center;
		opacity: 0.7;
	}
	.icon:hover {
		opacity: 9;
	}

	/* :global(body) {
		height: 100vh;
		overflow-x: hidden;
	} */
</style>
