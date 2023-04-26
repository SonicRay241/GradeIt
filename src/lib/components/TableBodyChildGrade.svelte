<script lang='ts'>
    import type { avgResult } from "@prisma/client";

    export let index: number
    export let name: string
    export let nis: string
    export let data: avgResult[]
</script>

{#each data as e, i}
<tr class="bg-white border-b">
    {#if i == 0}
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {index + 1}
    </th>
    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {name}
    </td>
    <td class="px-6 py-4 text-gray-600">
        {nis}
    </td>
    {:else}
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        
    </th>
    <td class="px-6 py-4">
        
    </td>
    <td class="px-6 py-4">
        
    </td>
    {/if}
    <td class="px-6 py-4 text-gray-600">
        {e.coursename}
    </td>
    {#if e.taskRemed}
    <td class="px-6 py-4 text-gray-600">
        REMED
    </td>
    {:else}
    <td class="px-6 py-4 text-gray-600">
        -
    </td>
    {/if}
    {#if e.testRemed}
    <td class="px-6 py-4 text-gray-600">
        REMED
    </td>
    {:else}
    <td class="px-6 py-4 text-gray-600">
        -
    </td>
    {/if}
    <td class="px-6 py-4 text-gray-600">
        {e.teacherName}
    </td>
</tr>
{/each}