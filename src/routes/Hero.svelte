<script lang="ts">
	import type { MovieDetails } from '$lib/types';
	export let movie:MovieDetails;
	import {media} from '$lib/api';
	
	$: images = movie.images;
	$: backdrop = images.backdrops.find((image) => !image.iso_639_1) || images.backdrops[0];
	$: logo =images.logos.find((image)=>image.iso_639_1==='en') || images.logos[0];


</script>

<div class="column">
	<h1>Today's top movies</h1>
<a href="/movies/{movie.id}">
	<img class="backdrop" src={media(backdrop.file_path,1280)} alt={movie.title} style="aspect-ratio:{backdrop.aspect_ratio}">
	{#if logo}
			<img
				class="logo"
				alt={movie.title}
				src={media(logo.file_path, 500)}
				style="aspect-ratio: {logo.aspect_ratio}"
			/>
		{/if}
</a>
</div>

<style>
	a{
		display:flex;
		flex-direction:column;
		align-items:center;
	}
	.backdrop{
		width:100%;
	}
	.logo{
		position: absolute;
		width: 30%;
		height: 100%;
		left: 1rem;
		bottom: 0;
		object-fit: contain;
		object-position: 50% 75%;
		filter:drop-shadow(0 0 3rem black) drop-shadow(0 0 0.5rem black);
	}
</style>