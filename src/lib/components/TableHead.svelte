<script lang='ts'>
    export let editable: boolean = false
</script>

<thead class="text-md text-gray-700 uppercase bg-gray-50">
    <tr>
        <slot/>
        {#if editable}
        <th scope="col" class="px-6 py-3"/>
        {/if}
    </tr>
</thead>