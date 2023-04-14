<script lang='ts'>
    export let name: string
    export let nis: string
</script>

<tr class="bg-white border-b">
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {name}  
    </th>
    <td class="px-6 py-4">
        {nis}
    </td>
    <slot/>
        <!-- <td class="px-6 py-4">
                TODO: ADD CREATEORUPDATE BACKEND FUNCTION
                <input type="text" name="id" id="id" bind:value={studentId} hidden>
                <button type="button">
                    {a}
                </button>
        </td> -->
    <!-- <td class="px-6 py-4">
        {gradeAvg}
    </td> -->
    <!-- {#if editable}
    <td class="px-6 py-4 text-right">
        <slot/>
    </td>
    {/if} -->
</tr>