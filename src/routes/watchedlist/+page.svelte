<script>
	import ResultsPage from '$lib/components/ResultsPage.svelte';

	export let data;
</script>

<div class="column flex">
	<h1>Watchedlist</h1>

	{#if data.movies.length > 0}
		<ResultsPage movies={data.movies} next={null} />
	{:else}
		<p>You haven't added anything to your watchedlist yet.</p>
	{/if}
</div>