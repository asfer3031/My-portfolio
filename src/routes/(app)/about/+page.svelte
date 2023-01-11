<script>
	import Linkedin from '$lib/assets/images/linkedin-brands.svg';
	import Github from '$lib/assets/images/github-brands (1).svg';
	import Facebook from '$lib/assets/images/facebook-brands (1).svg';
	import { fly, slide, scale } from 'svelte/transition';
</script>

<main class="main">
	<!-- svelte-ignore a11y-missing-content -->
	<div class="header">
		<a href="/" in:fly={{ y: -200, duration: 500 }} out:fly>
			<div class="header-a" />
		</a>
	</div>

	<div class="container" in:scale out:scale>
		<div class="inner-grid">
			<div>
				<div class="card">
					<div class="my-pic" />
					<h1>Asbel Fernandez</h1>
					<div class="line" />
					<h2>Front-End Web Developer</h2>
					<!-- <p>Find me on:</p> -->

					<div class="info">
						<ul>
							<a href="https://www.linkedin.com/in/asbel-fernandez-9a25b9211"
								><img class="a-tag" src={Linkedin} alt="link" /></a
							>
							<a href="https://github.com/asfer3031"><img class="a-tag" src={Github} alt="git" /></a
							>
							<a href="https://www.facebook.com/josfer.30/"
								><img class="a-tag" src={Facebook} alt="facebook" /></a
							>
						</ul>
					</div>
				</div>
			</div>

			<div class="about-me">
				<article>
					<h1>Hello<span>!</span></h1>
					<h2>Here is who I am and what I aspire.</h2>

					<p>
						I was born on September 30th 1987. I enjoy sports and music production. However, I have
						a passion for programming. I have always been curious about how we communicate and share
						data across the internet. I grew an interest for Information Technology after my first
						year at Centro Escolar Mexico Junior College. I was convinced that I wanted to excel in
						this field. Technology is a very broad field that one cannot know it all but we can go
						as far as we limit ourselves to. I am determined to work hard to go beyond my
						limitations.
					</p>

					<div class="quote">
						<p>“It’s Never too late to be what you might have been” (George Eliot).</p>
					</div>
				</article>
			</div>
		</div>
	</div>
</main>

<style>
	@font-face {
		font-family: 'Goergia,serif';
		src: url(/src/lib/assets/fonts/Georgia-serif/georgia\ italic.ttf);
	}

	.main {
		margin: 0;
		height: 100%;
		width: 100%;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}

	.container {
		height: auto;
		width: 100%;
		border-radius: 2px;
		box-sizing: border-box;
		margin-bottom: 20px;
	}

	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 500px;

		width: 90%;
		border-radius: 6px;

		margin: auto auto;
	}

	.card > h1 {
		color: rgba(0, 0, 0, 0.9);
		text-align: center;
		font-family: 'roboto';
		font-size: 24px;
	}

	.card > h2 {
		color: rgba(0, 0, 0, 0.9);
		text-align: center;
		font-family: 'roboto-slab';
		font-size: 16px;
	}

	.about-me {
		padding: 40px;
	}

	.about-me > article > h1 {
		color: rgba(0, 0, 0, 0.8);
		text-align: center;
		font-family: 'roboto';
		font-size: 3rem;
	}
	.about-me > article > h1 span {
		color: #b721ff;
	}

	.about-me > article > h2 {
		color: rgba(0, 0, 0, 0.8);
		text-align: center;
		font-family: 'roboto';
		font-size: 24px;
	}
	.about-me > article > p {
		flex-wrap: wrap;
		color: rgba(0, 0, 0, 0.9);
		font-family: 'roboto-slab';
		font-size: 1.1em;
		text-indent: 2em;
		font-weight: 400;
		padding: 0.5rem;
	}

	.inner-grid {
		display: grid;
		grid-template-columns: 2fr 3fr;
		height: 100%;
		width: 100%;
		column-gap: 0;
	}

	.quote {
		height: auto;
		width: 80%;
		background-color: rgba(36, 35, 35, 0.726);
		float: right;
		padding: 10px;
		border-radius: 6px;
		color: #fff;
	}

	.my-pic {
		background-image: url('$lib/assets/images/asbel_pic1.png');
		background-size: cover;
		background-repeat: no-repeat;
		height: 150px;
		width: 150px;
		border-radius: 50%;
		border: 1px solid #b721ff;
		margin-top: 40px;
		background-color: #fff;
	}

	.line {
		height: 2px;
		width: 80%;
		background-color: #b721ff;
		margin: 5px auto 5px auto;
	}
	.header {
		height: 60px;
		width: 100%;
		padding: 5px;
		display: flex;
		justify-content: flex-end;
	}
	.header > a {
		height: 40px;
		width: 40px;
		padding: 0;
		margin: 10px 2rem 0 0;
	}

	.header-a {
		height: 100%;
		width: 100%;
		background-image: url('$lib/assets/images/left.svg');
		background-position: center;
		background-size: cover;
		cursor: pointer;
		border: 0;
		border-radius: 6px;
		box-shadow: 2px 2px 2px #666;
		background-color: #fff;

		box-sizing: border-box;
	}

	.header > a:hover {
		height: 38px;
		width: 38px;
	}

	.info {
		display: grid;
		place-content: center;
		align-items: center;
	}

	.info > ul {
		display: flex;
		flex-direction: row;
		height: 50px;
		padding: 0;
		box-sizing: border-box;
		width: 100%;
		margin-top: 100px;
	}

	.a-tag {
		height: 30px;
		width: 30px;
		border-radius: 5px;
		margin: 5px;
		padding: 0;
		opacity: 0.7;
		padding: 5px;
		background-color: #fff7;
	}

	.a-tag:nth-child(1):hover {
		opacity: 0.7;
		background-color: #fff;
	}

	@media screen and (max-width: 992px) {
		.inner-grid {
			grid-template-columns: 1fr;
			gap: 5px;
		}

		.container {
			width: 95%;
		}

		.card {
			width: 100%;
			border-radius: 0;
			margin: 0;
		}

		.main {
			height: 100%;
		}
	}
	@media only screen and (max-width: 1000px) {
		.header {
			display: none;
		}
	}
	@media only screen and (max-width: 780px) {
		.card {
			padding: 0;
			margin: 0;
			height: 350px;
		}
		.about-me {
			padding: 10px;
		}
		.info {
			height: 20%;
		}
		.my-pic {
			height: 125px;
			width: 125px;
		}
	}

	@media screen and (max-width: 400px) {
		.my-pic {
			height: 100px;
			width: 100px;
		}

		.about-me {
			padding: 10px;
		}

		.card > h1 {
			font-size: 16px;
		}

		.card > h2 {
			font-size: 12px;
		}
	}
</style>
