<script lang="ts">
    import Table from "$lib/components/Table.svelte";
    import TableHead from "$lib/components/TableHead.svelte";
    import TableHeadChild from "$lib/components/TableHeadChild.svelte";
    import TableBody from "$lib/components/TableBody.svelte";
    import TableBodyChild from "$lib/components/TableBodyChild.svelte";
    import { fade, scale } from "svelte/transition"
    import type { PageData } from './$types';
  
    export let data: PageData;

    let addModalState = false

    const showAddModal = () => {
        addModalState = true
    }

    const hideAddModal = () => {
        addModalState = false
    }
    $: ({ assignments, courses } = data)
</script>

{#if addModalState}
<div class="flex justify-center items-center fixed h-full w-full backdrop-blur-md z-50" transition:fade>
    <!-- Modal content -->
    <div class="relative bg-white rounded-lg shadow-lg -translate-y-28 w-80 md:w-96" transition:scale>
        <button on:click={hideAddModal} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="authentication-modal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
            <h3 class="mb-4 text-xl font-medium text-gray-900">Add Assignment</h3>
            <form method="POST" class="space-y-6" action="?/createAssignment">
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Assignment name</label>
                    <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Task 1" required>
                </div>

                <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create Course</button>
                <!-- <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create User</button> -->
            </form>
        </div>
    </div>
</div>
{/if}

<div class="ml-16 mt-3 p-5 md:p-10 xl:p-20">
    <h1 class="text-4xl font-semibold mb-2">{courses.class}</h1>
    <h1 class="text-xl mb-10">Subject: {courses.subject}</h1>
    <Table>
        <TableHead>
            <TableHeadChild label="Name"/>
            <TableHeadChild label="NIS"/>
            {#each assignments as a}
                <TableHeadChild label="{a.name}"/>
            {/each}
            <TableHeadChild label="rata-rata"/>
            <TableHeadChild label="" buttons>
                <button on:click={showAddModal} class="flex justify-center items-center hover:bg-slate-200 w-8 h-8 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </TableHeadChild>
        </TableHead>
        <TableBody>
            <TableBodyChild name="Tes" data="a,-" editable>
                
            </TableBodyChild>
        </TableBody>
    </Table>
</div>
