<script>
    import Page from "./+page.svelte";
    import { page } from "$app/stores"
</script>

<Page>
    <h1 class="text-red-600 mt-4">{$page.error?.message}</h1>
</Page>