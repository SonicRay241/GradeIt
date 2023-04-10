<script lang='ts'>
    import { page } from '$app/stores'
    export let iconClass: string
    export let href: string
    export let label: string
</script>

{#if $page.url.pathname.split("/")[2] != href.split("/")[2]}
<a class="flex flex-row items-center justify-start overflow-hidden w-full h-12 mt-2 mx-0 rounded hover:bg-gray-300" href="{href}">
    <i class="{iconClass} mx-3.5"></i>
    <h1>{label}</h1>
</a>
{:else}
<a class="flex flex-row items-center justify-start overflow-hidden w-full h-12 mt-2 mx-0 rounded bg-indigo-500 text-neutral-50 hover:bg-indigo-600" href="{href}">
    <i class="{iconClass} mx-3.5"></i>
    <h1>{label}</h1>
</a>
{/if}