<script lang="ts">
    import type { PageData } from "./$types";
    import Table from "$lib/components/Table.svelte";
    import TableHead from "$lib/components/TableHead.svelte";
    import TableHeadChild from "$lib/components/TableHeadChild.svelte";
    import TableBody from "$lib/components/TableBody.svelte";
    import TableBodyChild from "$lib/components/TableBodyChild.svelte";
    import { fade, scale } from "svelte/transition"

    let selectedUserId = ""
    let deleteModalState = false
    let addModalState = false
    let updateModalState = false
    let dropdownState = false
    let levelValue = "Select"
    let updateModalData: any | null

    const showDeleteModal = (id: string) => {
        selectedUserId = id
        deleteModalState = true
    }
    
    const hideDeleteModal = () => {
        selectedUserId = ""
        deleteModalState = false
    }

    const showAddModal = () => {
        addModalState = true
    }

    const hideAddModal = () => {
        levelValue = "Select"
        addModalState = false
    }

    const showUpdateModal = (id: string, updateData:any) => {
        levelValue = updateData["level"]
        updateModalData = updateData
        selectedUserId = id
        updateModalState = true
    }

    const hideUpdateModal = () => {
        levelValue = "Select"
        updateModalData = null
        selectedUserId = ""
        updateModalState = false
    }

    const toggleDropdown = () => { dropdownState = dropdownState ? false : true }

    export let data: PageData

    $: ({ user, userlist } = data)
</script>

{#if deleteModalState}
<div class="flex justify-center items-center fixed h-full w-full backdrop-blur-md z-50" transition:fade>
    <div class="-translate-y-28">
        <div class="z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full" transition:scale>
            <div class="relative w-full h-full max-w-md md:h-auto">
                <div class="relative bg-white rounded-lg shadow">
                    <button on:click={hideDeleteModal} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="p-6 text-center">
                        <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 ">Are you sure you want to delete this user?</h3>
                        <form method="POST" action="?/deleteUser">
                            <input type="text" name="uid" id="uid" bind:value={selectedUserId} class="hidden">
                            <button data-modal-hide="popup-modal" type="submit" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                Yes, I'm sure
                            </button>
                            <button on:click={hideDeleteModal} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 ">No, cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>      
    </div>  
</div>
{/if}

{#if addModalState}
<div class="flex justify-center items-center fixed h-full w-full backdrop-blur-md z-50" transition:fade>
    <!-- Modal content -->
    <div class="relative bg-white rounded-lg shadow-lg -translate-y-28 w-80 md:w-96" transition:scale>
        <button on:click={hideAddModal} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="authentication-modal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
            <h3 class="mb-4 text-xl font-medium text-gray-900">Add user</h3>
            <form method="POST" class="space-y-6" action="?/createUser">
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
                    <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Adam Williams" required>
                </div>
                <div>
                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
                    <input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Adam" required>
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                    <input type="text" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="••••••••" required>
                </div>
                <div>
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="block mb-2 text-sm font-medium text-gray-900">Level</label>
                    <button on:click={toggleDropdown} id="dropdown" data-dropdown-toggle="dropdown" class="text-gray-900 bg-gray-100 hover:bg-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center mb-3" type="button">{levelValue} <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                    {#if dropdownState}
                    <!-- Dropdown menu -->
                    <div on:blur={toggleDropdown} on:mouseleave={toggleDropdown} id="dropdown" class="fixed z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                        <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                          <li>
                            <button on:click={() => {levelValue = "ADMIN"}} on:keydown={() => {levelValue = "ADMIN"}} type="button" class="block px-4 py-2 w-full hover:bg-gray-100 text-left">ADMIN</button>
                          </li>
                          <li>
                            <button on:click={() => {levelValue = "GURU"}} on:keydown={() => {levelValue = "GURU"}} type="button" class="block px-4 py-2 w-full hover:bg-gray-100 text-left">GURU</button>
                          </li>
                        </ul>
                    </div>
                    {/if}
                </div>

                <input type="text" name="level" id="level" class="hidden" bind:value={levelValue}>
                
                <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create User</button>
            </form>
        </div>
    </div>
</div>
{/if}

{#if updateModalState}
<div class="flex justify-center items-center fixed h-full w-full backdrop-blur-md z-50" transition:fade>
    <!-- Modal content -->
    <div class="relative bg-white rounded-lg shadow-lg -translate-y-28 w-80 md:w-96" transition:scale>
        <button on:click={hideUpdateModal} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="authentication-modal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
            <h3 class="mb-4 text-xl font-medium text-gray-900">Update user</h3>
            <form method="POST" class="space-y-6" action="?/updateUser">
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
                    <input bind:value={updateModalData["name"]} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Adam Williams" required>
                </div>
                <div>
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="block mb-2 text-sm font-medium text-gray-900">Level</label>
                    <button on:click={toggleDropdown} id="dropdown" data-dropdown-toggle="dropdown" class="text-gray-900 bg-gray-100 hover:bg-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center mb-3" type="button">{levelValue} <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                    {#if dropdownState}
                    <!-- Dropdown menu -->
                    <div on:blur={toggleDropdown} on:mouseleave={toggleDropdown} id="dropdown" class="fixed z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                        <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                          <li>
                            <button on:click={() => {levelValue = "ADMIN"}} on:keydown={() => {levelValue = "ADMIN"}} type="button" class="block px-4 py-2 w-full hover:bg-gray-100 text-left">ADMIN</button>
                          </li>
                          <li>
                            <button on:click={() => {levelValue = "GURU"}} on:keydown={() => {levelValue = "GURU"}} type="button" class="block px-4 py-2 w-full hover:bg-gray-100 text-left">GURU</button>
                          </li>
                        </ul>
                    </div>
                    {/if}
                </div>

                <input type="text" name="level" id="level" class="hidden" bind:value={levelValue}>
                <input type="text" name="uid" id="uid" class="hidden" bind:value={selectedUserId}>
                
                <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update User</button>
            </form>
        </div>
    </div>
</div>
{/if}

<div class="ml-20 mt-3 p-5 md:p-10 xl:p-20">
    <h1 class="text-4xl font-semibold mb-10 2xl:mx-56">Users</h1>
    <Table Class="2xl:mx-56">
        <TableHead>
            <TableHeadChild label="Nama"/>
            <TableHeadChild label="Level"/>
            <TableHeadChild label="" buttons>
                <button on:click={showAddModal} class="flex justify-center items-center hover:bg-slate-200 w-8 h-8 rounded">
                    <i class="fa-solid fa-plus fa-lg"></i>
                </button>
            </TableHeadChild>
        </TableHead>
        <TableBody>
            <TableBodyChild name="{user.name}" data="{user.level}" editable>
                <div class="flex items-center justify-end">
                    <button class="bg-indigo-500 hover:bg-indigo-600 w-10 h-10 mx-2 text-white rounded">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                </div>
            </TableBodyChild>
            {#each userlist as a}
            {#if user.name != a.name}
            <TableBodyChild name="{a.name}" data="{a.level}" editable>
                <div class="flex items-center justify-end">
                    <button on:click={() => showUpdateModal(a.id, a)} class="bg-indigo-500 hover:bg-indigo-600 w-10 h-10 mx-2 text-white rounded">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button on:click={() => showDeleteModal(a.id)} class="bg-red-500 hover:bg-red-600 w-10 h-10 mx-2 text-white rounded">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </TableBodyChild>
            {/if}
            {/each}
        </TableBody>
    </Table>
</div>
