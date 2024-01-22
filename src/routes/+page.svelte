<script lang="ts">
	import Hero from './Hero.svelte';
	import Carousel from '$lib/components/Carousel.svelte';

	export let data;
</script>


<Hero movie={data.featured}/>

<Carousel title="Trending" href="/movies/trending" movies={data.trending} />
<Carousel title="Now playing" href="/movies/now_playing" movies={data.now_playing} />
<Carousel title="Upcoming" href="/movies/upcoming" movies={data.upcoming} />

