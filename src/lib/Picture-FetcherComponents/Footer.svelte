<script>
	import MyPic from '$lib/assets/images/asbel_pic1.png';
	import Linkedin from '$lib/assets/images/linkedin-brands.svg';
	import Github from '$lib/assets/images/github-brands (1).svg';
	import Facebook from '$lib/assets/images/facebook-brands (1).svg';
	import Unsplash from '$lib/assets/images/unsplash-brands.svg';
	import Html from '$lib/assets/images/html5-brands.svg';
	import CSS3 from '$lib/assets/images/css3-brands.svg';
	import FontAwesome from '$lib/assets/images/font-awesome-solid.svg';
</script>

<div class="footer-copyright">
	<footer class="footer">
		<article>
			<h3 style="margin: 0;">Project Description:</h3>

			<p>
				This project was made with the intention to demonstrate the use of an Api. I want to thank
				unsplash for sponsoring developers with a free developer's Api. With the use of a Api we can
				manipulate data to show the user information about products or any other type of objects.
			</p>
		</article>

		<div class="icons">
			<h3>Tools used for this project</h3>
			<div class="icon-tools">
				<a href="https://unsplash.com"><img class="a-tag" src={Unsplash} alt="unsplash" /></a>
				<a href="https://www.css3.com/"><img class="a-tag" src={CSS3} alt="css3" /></a>
				<a href="https://html.com/"><img class="a-tag" src={Html} alt="css3" /></a>
				<a href="https://fontawesome.com/"
					><img class="a-tag" src={FontAwesome} alt="font-awesome" /></a
				>
			</div>
		</div>
	</footer>
	<p class="copyright">Copyright 2023 | developed by:Asbel Fernandez</p>
</div>

<style>
	.icon-tools {
		display: flex;
		width: 100%;
		column-gap: 2px;
		font-size: 0.8rem;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-weight: 200;
		color: #fff;
	}
	.icon-tools > a {
		margin: 0;
	}

	.a-tag {
		height: 35px;
		width: 35px;
		margin: 0;
		padding: 5px;
		background: #999;
		border-radius: 6px;
	}
	.a-tag:hover {
		background: white;
	}

	.icons {
		width: 40%;
		height: auto;
		margin: 0;
		color: #999;
		display: flex;
		flex-direction: column;
		align-self: center;
		margin-bottom: 30px;
	}
	.icons > h3 {
		font-size: 1rem;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-weight: bold;

		padding: 0;
		color: #fff;
		text-align: left;
		width: 100%;
	}
	.footer-copyright {
		background-color: #101010;
		border-top: 1px solid #555;
		border-bottom: 1px solid #555;
		box-shadow: 0 0 5px 5px rgba(13, 19, 19, 0.781);
		margin: 20px 0 20px 0;
	}

	.footer {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		height: 300px;
		width: 100%;
		box-sizing: border-box;
	}
	article {
		width: 40%;
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	article > p {
		font-size: 0.8rem;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-weight: 200;
		margin: 1rem 0 0 0;
		color: #fff;
	}

	article > h3 {
		font-size: 1rem;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-weight: bold;
		margin: 0;
		color: #fff;
		text-align: left;
		width: 100%;
	}

	.footer > div:nth-child(2) {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.copyright {
		padding: rem;
		height: 30px;
		display: grid;
		place-content: center;
		color: #fff8;
		margin: 0;
	}

	@media all and (max-width: 720px) {
		.footer {
			display: grid;
			height: auto;
			grid-template-columns: 1fr;
			margin-top: 20px;

			padding: 0;
		}
		article {
			width: 100%;
			height: auto;
			display: flex;
			box-sizing: border-box;
		}

		article > p {
			font-size: 0.8rem;
			font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
			font-weight: 200;
			color: #fff;
			text-align: center;
			text-indent: 1rem;
			margin-top: 5px;
			padding: 0;
		}
		article > h3 {
			text-align: center;
		}

		.footer > article:nth-child(1) {
			display: grid;
			place-content: center;
			padding: 1rem;
			height: auto;
		}

		.footer > div:nth-child(2) {
			margin-top: 20px;
			display: grid;
			place-content: center;
		}

		.icons {
			width: 100%;
			height: auto;
			margin: 0;
			color: #999;

			margin-bottom: 30px;
		}
	}
</style>
