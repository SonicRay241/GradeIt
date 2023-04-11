<script lang="ts">
    import ClassCard from "$lib/components/ClassCard.svelte";
    import { fade, scale } from "svelte/transition"
    import type { PageData } from "./$types";

    let addModalState = false
    let dropdownState = false
    let classValue = "Select"

    const hideAddModal = () => {
        addModalState = false
    }

    const showAddModal = () => {
        addModalState = true
    }

    const toggleDropdown = () => { dropdownState = dropdownState ? false : true };

    export let data: PageData;

    $: ({ courses } = data)
    
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
            <h3 class="mb-4 text-xl font-medium text-gray-900">Add Course</h3>
            <form method="POST" class="space-y-6" action="?/createCourse">
                <div>
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="block mb-2 text-sm font-medium text-gray-900">Class</label>
                    <button on:click={toggleDropdown} id="dropdown" data-dropdown-toggle="dropdown" class="text-gray-900 bg-gray-100 hover:bg-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center" type="button">{classValue} <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                    {#if dropdownState}
                    <!-- Dropdown menu -->
                    <div on:blur={toggleDropdown} on:mouseleave={toggleDropdown} id="dropdown" class="fixed z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                        <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                          <li>
                            <button on:click={() => {classValue = "X"}} on:keydown={() => {classValue = "X"}} type="button" class="block px-4 py-2 w-full hover:bg-gray-100 text-left">X</button>
                          </li>
                          <li>
                            <button on:click={() => {classValue = "XI"}} on:keydown={() => {classValue = "XI"}} type="button" class="block px-4 py-2 w-full hover:bg-gray-100 text-left">XI</button>
                          </li>
                          <li>
                            <button on:click={() => {classValue = "XII"}} on:keydown={() => {classValue = "XII"}} type="button" class="block px-4 py-2 w-full hover:bg-gray-100 text-left">XII</button>
                          </li>
                        </ul>
                    </div>
                    {/if}
                </div>
                <div>
                    <label for="major" class="block mb-2 text-sm font-medium text-gray-900">Major</label>
                    <input type="text" name="major" id="major" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Class Major" required>
                </div>
                <div>
                    <label for="subject" class="block mb-2 text-sm font-medium text-gray-900">Subject</label>
                    <input type="text" name="subject" id="subject" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="School Subject" required>
                </div>
                <div>
                    <label for="kkm" class="block mb-2 text-sm font-medium text-gray-900">KKM</label>
                    <input type="number" name="kkm" id="kkm" class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="50" required>
                </div>

                <input type="text" name="classs" id="classs" class="hidden" bind:value={classValue} required/>
                
                {#if classValue == "Select"}
                <button type="button" on:click={() => alert("Please fill the form")} class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create Course</button>
                {:else}
                <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create Course</button>
                {/if}
            </form>
        </div>
    </div>
</div>
{/if}

<main class="ml-20 h-full">
    <div class="2xl:px-20 xl:px-15 lg:px-10 px-5 2xl:pt-20 xl:pt-15 lg:pt-10 pt-5 mb-10">
        <h1 class="text-4xl font-semibold mb-4">Courses</h1>
        <button on:click={showAddModal} class="flex justify-center items-center hover:bg-slate-200 w-20 h-8 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
            </svg>
            <p class="text-lg ml-1">
                Add
            </p>
        </button>
    </div>
    {#if courses.length < 1}
        <div class="flex justify-center mb-6">
            <h1 class="text-4xl mt-20">Nothing to see here...</h1>
        </div>
        <div class="flex justify-center">
            <button on:click={showAddModal} type="button" class="inline-flex items-center px-3 py-2 text-lg w-fit font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Create a course</button>          
        </div>
    {:else}
    <div class="mt-3 mr-4 grid 2xl:px-20 xl:px-15 xl:grid-cols-5 lg:grid-cols-4 lg:px-10 sm:grid-cols-3 px-5 pb-10 gap-4 place-items-stretch">
        {#each courses as a}
            <ClassCard 
            className="{a.class}"
            classUrl="{a.urlID}"
            name="{a.subject}"
            />
        {/each}
        <!-- <ClassCard className="XII RPL" classUrl="AMOGUS" name="Bahasa Indonesia"/> -->
    </div>
    {/if}
</main>