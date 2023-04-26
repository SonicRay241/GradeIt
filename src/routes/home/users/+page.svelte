<script lang="ts">
    import type { PageData } from "./$types";
    import Table from "$lib/components/Table.svelte";
    import TableHead from "$lib/components/TableHead.svelte";
    import TableHeadChild from "$lib/components/TableHeadChild.svelte";
    import TableBody from "$lib/components/TableBody.svelte";
    import TableBodyChild from "$lib/components/TableBodyChild.svelte";
    import { fly } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";
    import { fade, scale } from "svelte/transition"
    import { enhance, type SubmitFunction } from "$app/forms";
    import toast, { Toaster } from "svelte-french-toast"

    let selectedUserId = ""
    let deleteModalState = false
    let addModalState = false
    let updateModalState = false
    let dropdownState = false
    let levelValue = "Select"
    let homeroom = false
    let updateModalData: any | null
    let search = ""

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
        homeroom = false
        levelValue = "Select"
        addModalState = false
    }

    const showUpdateModal = (id: string, updateData:any) => {
        levelValue = updateData["level"]
        if (updateData["class"] != "") {
            levelValue = "WALAS"
        }
        updateModalData = updateData
        selectedUserId = id
        updateModalState = true
    }

    const hideUpdateModal = () => {
        homeroom = false
        levelValue = "Select"
        updateModalData = null
        selectedUserId = ""
        updateModalState = false
    }

    const toggleDropdown = () => { dropdownState = dropdownState ? false : true }

    const onDelete: SubmitFunction = ({ form, data, action, submitter, cancel }) => {
        return async ({ result, update }) => {
            switch (result.type){
                case 'success':
                    toast.success("Deleted user!")
                    break
                case 'error':
                    toast.error("Failed to delete user")
                    break
                default:
                    break
            }

            hideDeleteModal()
            await update()
        }
    }

    const onAdd: SubmitFunction = ({ form, data, action, submitter, cancel }) => {
        const { name, username, classname, password, level } = Object.fromEntries(data)

        if (name == "" || username == "" || password == "" || level == "Select") {
            toast.error("Please fill out the form")
            cancel()
        }

        if (level == "WALAS" && classname == "") {
            toast.error("Please fill the class input")
            cancel()
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long")
            cancel()
        }

        for (let users of userlist) {
            if (users.username == username) {
                toast.error("Username already been used")
                cancel()
            }
        }

        return async ({ result, update }) => {
            switch (result.type){
                case 'success':
                    toast.success("Created user!")
                    break
                case 'error':
                    toast.error("Failed to create user")
                    break
                default:
                    break
            }
            hideAddModal()
            await update()
        }
    }

    const onUpdate: SubmitFunction = ({ form, data, action, submitter, cancel }) => {
        const { name, classname, level } = Object.fromEntries(data)

        if (name == "" || level == "Select") {
            toast.error("Please fill out the form")
            cancel()
        }

        if (level == "WALAS" && classname == "") {
            toast.error("Please fill the class input")
            cancel()
        }

        return async ({ result, update }) => {
            switch (result.type){
                case 'success':
                    toast.success("Updated user!")
                    break
                case 'error':
                    toast.error("Failed to update user")
                    break
                default:
                    break
            }
            hideUpdateModal()
            await update()
        }
    }

    export let data: PageData

    $: ({ user, userlist } = data)
</script>

<Toaster/>
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
                        <form method="POST" action="?/deleteUser" use:enhance = {onDelete}>
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
            <form method="POST" class="space-y-6" action="?/createUser" use:enhance = {onAdd}>
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
                    <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Adam Williams" >
                </div>
                <div>
                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
                    <input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Adam" >
                </div>
                {#if levelValue == "WALAS"}
                <div>
                    <label for="classname" class="block mb-2 text-sm font-medium text-gray-900">Class</label>
                    <input type="text" name="classname" id="classname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="X TKJ" >
                </div>
                {/if}
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                    <input type="text" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="••••••••" >
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
                          <li>
                            <button on:click={() => {levelValue = "WALAS"}} on:keydown={() => {levelValue = "WALAS"}} type="button" class="block px-4 py-2 w-full hover:bg-gray-100 text-left">WALAS</button>
                          </li>
                        </ul>
                    </div>
                    {/if}
                </div>

                <input type="text" name="level" id="level" class="hidden" bind:value={levelValue} >
                <!-- {#if levelValue == "Select"}
                <button type="button" on:click={() => alert("Please fill the form")} class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create User</button>
                {:else} -->
                <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create User</button>
                <!-- {/if} -->
                <!-- <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create User</button> -->
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
            <form method="POST" class="space-y-6" action="?/updateUser" use:enhance={onUpdate}>
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
                    <input bind:value={updateModalData["name"]} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Adam Williams" >
                </div>
                {#if levelValue == "WALAS"}
                <div>
                    <label for="classname" class="block mb-2 text-sm font-medium text-gray-900">Class</label>
                    <input bind:value={updateModalData["class"]} type="text" name="classname" id="classname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="X TKJ" >
                </div>
                {/if}
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
                          <li>
                            <button on:click={() => {levelValue = "WALAS"}} on:keydown={() => {levelValue = "WALAS"}} type="button" class="block px-4 py-2 w-full hover:bg-gray-100 text-left">WALAS</button>
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

<div class="ml-16 mt-3 p-5 md:p-10 xl:p-20" in:fly="{{x:100, easing:cubicInOut, delay: 200}}" out:fly="{{x:100, easing:cubicInOut, duration:200}}">
    <h1 class="text-4xl font-semibold mb-10 2xl:mx-56">Users</h1>
    <Table Class="2xl:mx-56">
        <TableHead>
            <TableHeadChild label="Nama"/>
            <TableHeadChild label="Level"/>
            <TableHeadChild label="Kelas"/>
            <TableHeadChild label="" buttons>
                <input type="text" class="w-48 h-8 mr-3 px-2 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 font-light placeholder:font-light rounded" placeholder="Search" bind:value={search}/>
                <button on:click={showAddModal} class="flex justify-center items-center hover:bg-slate-200 w-8 h-8 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </TableHeadChild>
        </TableHead>
        <TableBody>
            <TableBodyChild name="{user.name}" data="{user.level},{user.class}" editable>
                <div class="flex items-center justify-end">
                    <button class="flex justify-center items-center bg-indigo-500 hover:bg-indigo-600 w-10 h-10 mx-2 text-white rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </button>
                </div>
            </TableBodyChild>
            {#each userlist as a}
            {#if user.name != a.name}
            {#if a.name.toLowerCase().includes(search.toLowerCase()) || a.level.toLowerCase().includes(search.toLowerCase()) || a.class?.toLowerCase().includes(search.toLowerCase())}
            <TableBodyChild name="{a.name}" data="{a.level},{a.class}" editable>
                <div class="flex items-center justify-end">
                    <button on:click={() => showUpdateModal(a.id, a)} class="flex justify-center items-center bg-indigo-500 hover:bg-indigo-600 w-10 h-10 mx-2 text-white rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>                          
                    </button>
                    <button on:click={() => showDeleteModal(a.id)} class="flex justify-center items-center bg-red-500 hover:bg-red-600 w-10 h-10 mx-2 text-white rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
            </TableBodyChild>
            {/if}
            {/if}
            {/each}
        </TableBody>
    </Table>
</div>
