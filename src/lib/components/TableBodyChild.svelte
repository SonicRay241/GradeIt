<script lang='ts'>
    export let name: string
    export let data: string
    export let editable: boolean = false

    const dataa = data.split(",")
</script>

<tr class="bg-white border-b">
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {name}
    </th>
    {#each dataa as a}
        <td class="px-6 py-4">
            {a}
        </td>
    {/each}
    {#if editable}
    <td class="px-6 py-4 text-right">
        <slot/>
    </td>
    {/if}
</tr>