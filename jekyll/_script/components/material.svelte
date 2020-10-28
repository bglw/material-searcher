<script>
	import { onMount } from 'svelte';

	export let icons = [];
	let iconTags = {};

	let searchInput;
	let searched = "";
	let tagged_icons = [...icons];

	$: if (searched.length) {
		tagged_icons = [...icons];

		tagged_icons = tagged_icons.filter(i => {
			if (isMatch(i)) return true;
			if (searched.length < 3) return false;
			if (!iconTags[i]) return false;
			for (let tag of iconTags[i]) {
				if (isMatch(tag)) return true;
			}
			return false;
		});
	} else {
		tagged_icons = [...icons];
	}

	const isMatch = (icon) => {
		return icon.toString().indexOf(searched.toLowerCase()) >= 0;
	}

	const getTags = (icon) => {
		if (searched.length < 3) return "";
		if (!iconTags[icon]) return ""; 
		return iconTags[icon].filter(i => isMatch(i)).join(', ');
	}

	const click = async (icon) => {
		try {
			await navigator.clipboard.writeText(icon);
		} catch(err) {
			alert("Copy failed.");
		}
	}

	onMount(async () => {
		searchInput.focus();

		let res = await fetch(`/tags.json`);
		res = await res.json();
		res.icons.map(i => {
			iconTags[i.name] = i.tags || [];
		});
	});
</script>

<div class="search">
	<input 
		class="input" 
		type="text" 
		placeholder="Search for icons"
		bind:this={searchInput}
		bind:value={searched}>
</div>


{#if searched.length}
<div class="icons">
{#each tagged_icons as icon}
	<div class="icon searched">
		<div class="icon-main">
			<button on:click={() => {click(icon)}}>
				<div>
					<div><code>{ icon }<i class="material-icons copy-icon">content_copy</i></code></div>
					<div class="tags">{ getTags(icon)}</div>
				</div> 
				<i class="material-icons disp-icon">{ icon }</i>
			</button>
		</div>
	</div>
{/each}
</div>
<hr>
{/if}

<div class="icons">
{#each icons as icon}
	<div class="icon" class:shh={searched.length}>
		<div class="icon-main">
			<span>{ icon }</span>
			<i class="material-icons disp-icon">{ icon }</i></div>
		</div>
{/each}
</div>