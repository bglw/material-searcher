<script>
	export let icons = [];

	let searched = "";
	let filtered_icons = [...icons];
	let hidden_icons = [];

	$: if (searched.length) {
		filtered_icons = [...icons];
		filtered_icons = filtered_icons.filter(i => isMatch(i));
		
		hidden_icons = [...icons];
		hidden_icons = hidden_icons.filter(i => !isMatch(i));
	} else {
		filtered_icons = [...icons];
		hidden_icons = [];
	}

	const isMatch = (icon) => {
		return icon.toString().indexOf(searched.toLowerCase()) >= 0;
	}
</script>

<div class="search">
	<input 
		class="input" 
		type="text" 
		placeholder="Search for icons"
		bind:value={searched}>
</div>

<div class="icons">
{#each filtered_icons as icon}
	<div class="icon">{ icon } <i class="material-icons">{ icon }</i></div>
{/each}
{#each hidden_icons as icon}
	<div class="icon shh">{ icon } <i class="material-icons">{ icon }</i></div>
{/each}
</div>