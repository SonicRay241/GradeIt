<script lang="ts">
    import Sidebar from "$lib/components/Sidebar.svelte";
    import SidebarChild from "$lib/components/SidebarChild.svelte";
    import Error from "./error.svelte"
    import type { PageData } from './$types';
  
    export let data: PageData;
</script>



<div class="ml-16">
    {#if data.message === "404"}
        <Error/>
    {:else}
    <h1 class="text-5xl"> {data.message} </h1>
    {/if}
</div>
