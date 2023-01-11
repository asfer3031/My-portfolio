<script>
	import Header from '$lib/PollsComponents/header.svelte';
	import Footer from '$lib/PollsComponents/footer.svelte';
	import PollList from '$lib/PollsComponents/pollList.svelte';
	import CreateNewPoll from '$lib/PollsComponents/CreateNewPoll.svelte';
	import Tabs from '$lib/PollsComponents/shared/Tabs.svelte';

	let items = ['Current Poll', 'New Poll'];
	let activeItem = 'Current Poll';

	const tabChange = (/** @type {{ detail: string; }} */ e) => {
		activeItem = e.detail;
	};

	const handleAdd = (/** @type {any} */ e) => {
		activeItem = 'Current Poll';
	};
</script>

<Header />
<Tabs {activeItem} {items} on:tabChange={tabChange} />
<main>
	{#if activeItem === 'Current Poll'}
		<PollList />
	{:else if activeItem === 'New Poll'}
		<CreateNewPoll on:add={handleAdd} />
	{/if}
</main>
<Footer />

<style>
	Main {
		max-width: 960px;
		margin: 40px auto;
	}
</style>
