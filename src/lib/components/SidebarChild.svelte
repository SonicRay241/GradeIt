<script lang='ts'>
    import { page } from '$app/stores'
    export let href: string;
    export let label: string;

    let selectedClass = "hover:bg-gray-300"

    if ($page.url.pathname.split("/")[2] == href.split("/")[2]){
        selectedClass = "bg-indigo-500 text-neutral-50 hover:bg-indigo-600"
    }
</script>

{#if $page.url.pathname.split("/")[2] == href.split("/")[2]}
<a class="flex flex-row items-center justify-start overflow-hidden w-full h-12 mt-2 mx-0 rounded bg-indigo-500 text-neutral-50 hover:bg-indigo-600" href="{href}">
    <div class="mx-3">
        <slot/>
    </div>
    <h1>{label}</h1>
</a>
{:else}
<a class="flex flex-row items-center justify-start overflow-hidden w-full h-12 mt-2 mx-0 rounded hover:bg-gray-300" href="{href}">
    <div class="mx-3">
        <slot/>
    </div>
    <h1>{label}</h1>
</a>
{/if}