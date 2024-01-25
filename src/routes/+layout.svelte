<script>
	import { enhance } from '$app/forms';
	import { page, navigating } from '$app/stores';
	import NavigatingIndicator from '$lib/components/NavigatingIndicator.svelte';
	import * as api from '$lib/api';
	import logo from '$lib/images/svelteflix.svg';
	import tmdb from '$lib/images/moviedb.svg';
	import '../styles/styles.css';
	import {status}  from '$lib/stores';
	import {fly} from 'svelte/transition';
	import {onDestroy} from 'svelte';
	export let data;
	$: user = data.user;
	let messsage;
	let type;
	let unsubscribe= status.subscribe((value) => {

		if (value) {
				messsage= value.message;
				type=value.type;
				setTimeout(()=>{
					status.set({message:null,type:null})
				},2000)
			
		}
	});

	
	onDestroy(() => {
		unsubscribe();
	});
</script>

<svelte:head>
	<link rel="preconnect" href={api.base} />
	<title>{$page.data.title ?? 'SvelteFlix'}</title>
	<meta name="description" content="Discover today's top movies" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="frontend-masters-svelteflix.vercel.app" />
	<meta property="twitter:url" content="https://frontend-masters-svelteflix.vercel.app/" />
	<meta name="twitter:title" content="SvelteFlix" />
	<meta name="twitter:description" content="Discover today's top movies" />
	<meta name="twitter:image" content="https://frontend-masters-svelteflix.vercel.app/og.png" />
</svelte:head>


<nav>
	<a class="logo" href="/"><img class="logo" alt="SvelteFlix" src={logo} /></a>

	<div class="links">
		<a href="/search">Search</a>

		{#if user}
			<a href="/watchlist">Watchlist</a>
			<a href="/watchedlist">Watchedlist</a>

			<form method="POST" action="/logout" use:enhance>
				<button>Log out</button>
			</form>
		{:else}
			<a href="/login">Log in or register</a>
		{/if}
	</div>
</nav>
{#if messsage}
<div class:success-class={type==='success'}  class:error-class={type==='error'} transition:fly={{y:-200,duration:2000}}>
	<p >{messsage}</p>
</div>	
{/if}
<main class:infinite={$page.data.infinite}>
	<slot />
</main>

<footer>
	<p>
		Data provided by <a href="https://www.themoviedb.org/"><img alt="The Movie DB" src={tmdb} /></a>
	</p>
</footer>

{#if $navigating}
	<NavigatingIndicator />
{/if}

<style>
	nav,
	footer {
		padding: 1rem var(--side);
		margin: 0 auto;
	}

	nav {
		display: flex;
		width: 100%;
		height: 3rem;
		align-items: center;
		justify-content: space-between;
		color: var(--accent);
		max-width: var(--column);
	}

	footer {
		display: flex;
		height: 5rem;
		align-items: center;
	}

	a {
		text-decoration: none;
	}

	button {
		background: none;
		border: none;
		font-family: inherit;
		font-size: inherit;
		color: inherit;
		cursor: pointer;
	}

	.links {
		display: flex;
		align-items: center;
	}

	main.infinite {
		height: 0;
		flex: 1;
		overflow: hidden;
	}

	.links {
		display: flex;
		gap: 1em;
	}

	.logo {
		height: 100%;
	}
	.error-class, .success-class {
		position: fixed;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: auto;
		height: 1rem;
		margin: 1rem;
		padding: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
		font-size: small;
		border-radius:5px;
		color:#2e2e2e;
		font-weight: bold;
	}
	.error-class {
		background-color: rgb(181, 39, 39);
		color:rgb(233, 230, 230);
	}
	.success-class {
		background: #08a045;
	}
</style>
