<script lang="ts">
    import Table from "$lib/components/Table.svelte";
    import TableHead from "$lib/components/TableHead.svelte";
    import TableHeadChild from "$lib/components/TableHeadChild.svelte";
    import TableBody from "$lib/components/TableBody.svelte";
    import TableGrade from "$lib/components/TableGrade.svelte";
    import { fade, scale, fly } from "svelte/transition"
    import { cubicInOut } from "svelte/easing"
    import type { PageData } from './$types';
    import type { AssignmentType } from "@prisma/client";
    import { enhance, type SubmitFunction } from "$app/forms";
    import toast, { Toaster } from "svelte-french-toast";
  
    export let data: PageData;

    let addModalState = false
    let addUserState = false
    let gradeModalState = false
    let dropdownState = false
    let updateStudentState = false
    let deleteModalState = false

    let gradeModalValue = ""
    let typeValue = "TUGAS"

    let selectedStudentId = ""
    let selectedAssignmentId = ""
    let selectedAssignmentType = ""
    let updateValue = ""
    let updateType = ""

    const showAddModal = () => {
        addModalState = true
    }

    const hideAddModal = () => {
        addModalState = false
    }

    const showUserModal = () => {
        addUserState = true
    }

    const hideUserModal = () => {
        addUserState = false
    }

    const toggleDropdown = () => { dropdownState = dropdownState ? false : true };

    $: ({ assignments, courses, grades, students } = data)

    const showGradeModal = (studentId: any, assignmentId: any, value: any, assignmentType: AssignmentType) => {
        gradeModalState = true
        gradeModalValue = value
        selectedAssignmentId = assignmentId
        selectedStudentId = studentId
        selectedAssignmentType = assignmentType
    }

    const showUpdateModal = (type: "Name" | "NIS", id: number, value: string) => {
        updateStudentState = true
        updateType = type
        selectedStudentId = id.toString()
        updateValue = value
    }

    const hideUpdateModal = () => {
        updateStudentState = false
        updateType = ""
        selectedStudentId = ""
        updateValue = ""
    }

    const showDeleteModal = (id: number) => {
        deleteModalState = true
        selectedStudentId = id.toString()
    }

    const hideDeleteModal = () => {
        deleteModalState = false
        selectedStudentId = ""
    }

    const getGrade = (studentId: number, assignmentId: number) => {
        for (let i = 0; i < grades.length; i++) {
            if (grades[i].assignmentID == assignmentId && grades[i].studentID == studentId) {
                return grades[i].score
            }
        }
        return 0
    }

    const getGradeAvg = (studentId: number) => {
        let avg = 0
        for (let i = 0; i < grades.length; i++) {
            if (grades[i].studentID == studentId) {
                avg += grades[i].score
            }
        }

        const out = Math.floor(avg / assignments.length).toString()

        if (out == "NaN") {
            return "-"
        }

        return out
    }

    const hideGradeModal = () => {
        gradeModalState = false
        gradeModalValue = ""
        selectedAssignmentId = ""
        selectedStudentId = ""
    }

    const onGrade: SubmitFunction = ({ form, data, action, submitter, cancel }) => {
        const { grade } = Object.fromEntries(data)

        if (+grade < 0 || +grade > 100 || grade == "") {
            toast.error('Score must be between 0 - 100')
            cancel()
        }

        return async ({ result, update }) => {
            switch (result.type){
                case 'success':
                    toast.success("Updated score!")
                    break
                case 'error':
                    toast.error("Failed to update score")
                    break
                default:
                    break
            }
            hideGradeModal()
            await update()
        }
    }

    const onAddStudent: SubmitFunction = ({ form, data, action, submitter, cancel }) => {
        const { name, nis } = Object.fromEntries(data)

        if (name == "" || nis == "") {
            toast.error("Please fill out the form")
            cancel()
        }

        return async ({ result, update }) => {
            switch (result.type){
                case 'success':
                    toast.success("Added student!")
                    break
                case 'error':
                    toast.error("Failed to add student")
                    break
                default:
                    break
            }
            hideUserModal()
            await update()
        }
    }

    const onAddAssignment: SubmitFunction = ({ form, data, action, submitter, cancel }) => {
        const { name, type } = Object.fromEntries(data)

        if (name == "") {
            toast.error("Please fill out the form")
            cancel()
        }

        return async ({ result, update }) => {
            switch (result.type){
                case 'success':
                    toast.success("Added assignment!")
                    break
                case 'error':
                    toast.error("Failed to add assignment")
                    break
                default:
                    break
            }
            hideAddModal()
            await update()
        }
    }

    const onUpdateUser: SubmitFunction = ({ form, data, action, submitter, cancel }) => {
        const { value } = Object.fromEntries(data)

        if (value == "") {
            toast.error("Please fill in the form")
            cancel()
        }

        return async ({ result, update }) => {
            switch (result.type){
                case 'success':
                    toast.success("Updated student!")
                    break
                case 'error':
                    toast.error("Failed to update student")
                    break
                default:
                    break
            }
            hideUpdateModal()
            await update()
        }
    }

    const onDelete: SubmitFunction = ({ form, data, action, submitter, cancel }) => {
        return async ({ result, update }) => {
            switch (result.type){
                case 'success':
                    toast.success("Deleted student!")
                    break
                case 'error':
                    toast.error("Failed to delete student")
                    break
                default:
                    break
            }
            hideDeleteModal()
            await update()
        }
    }
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
                        <form method="POST" action="?/deleteStudent" use:enhance={onDelete}>
                            <input type="text" name="uid" id="uid" bind:value={selectedStudentId} class="hidden">
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

{#if updateStudentState}
<div class="flex justify-center items-center fixed h-full w-full backdrop-blur-md z-50" transition:fade>
    <!-- Modal content -->
    <div class="relative bg-white rounded-lg shadow-lg -translate-y-28 w-80 md:w-96" transition:scale>
        <button on:click={hideUpdateModal} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="authentication-modal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
            <h3 class="mb-4 text-xl font-medium text-gray-900">{updateType}</h3>
            <form method="POST" class="space-y-6" action="?/updateStudent" use:enhance={onUpdateUser}>
                <div>
                    <!-- <label for="value" class="block mb-2 text-sm font-medium text-gray-900">Value</label> -->
                    <input type="text" name="value" id="value" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="value" bind:value={updateValue} >
                </div>

                <input type="text" name="updateType" id="updateType" bind:value={updateType} hidden>
                <input type="text" name="studentId" id="studentId" bind:value={selectedStudentId} hidden>

                <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update {updateType}</button>

                <!-- <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create User</button> -->
            </form>
        </div>
    </div>
</div>
{/if}

{#if gradeModalState}
<div class="flex justify-center items-center fixed h-full w-full backdrop-blur-md z-50" transition:fade>
    <!-- Modal content -->
    <div class="relative bg-white rounded-lg shadow-lg -translate-y-28 w-80 md:w-96" transition:scale>
        <button on:click={hideGradeModal} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="authentication-modal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
            <h3 class="mb-4 text-xl font-medium text-gray-900">Score</h3>
            <form method="POST" class="space-y-6" action="?/createOrUpdateGrade" use:enhance={onGrade}>
                <div>
                    <!-- <label for="grade" class="block mb-2 text-sm font-medium text-gray-900">Assignment name</label> -->
                    <input type="number" name="grade" id="grade" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="100" bind:value={gradeModalValue} >
                </div>

                <input type="text" name="assignmentId" id="assignmentId" bind:value={selectedAssignmentId} hidden>
                <input type="text" name="studentId" id="studentId" bind:value={selectedStudentId} hidden>
                <input type="text" name="assignmentType" id="assignmentType" bind:value={selectedAssignmentType} hidden>

                <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update Score</button>

                <!-- <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create User</button> -->
            </form>
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
            <h3 class="mb-4 text-xl font-medium text-gray-900">Add Assignment</h3>
            <form method="POST" class="space-y-6" action="?/createAssignment" use:enhance={onAddAssignment}>
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Assignment name</label>
                    <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Task 1" >
                </div>
                <div>
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="block mb-2 text-sm font-medium text-gray-900">Assignment Type</label>
                    <button on:click={toggleDropdown} id="dropdown" data-dropdown-toggle="dropdown" class="text-gray-900 bg-gray-100 hover:bg-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center" type="button">{typeValue} <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                    {#if dropdownState}
                    <!-- Dropdown menu -->
                    <div on:blur={toggleDropdown} on:mouseleave={toggleDropdown} id="dropdown" class="fixed z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                        <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                          <li>
                            <button on:click={() => {typeValue = "TUGAS"}} on:keydown={() => {typeValue = "TUGAS"}} type="button" class="block px-4 py-2 w-full hover:bg-gray-100 text-left">TUGAS</button>
                          </li>
                          <li>
                            <button on:click={() => {typeValue = "ULANGAN"}} on:keydown={() => {typeValue = "ULANGAN"}} type="button" class="block px-4 py-2 w-full hover:bg-gray-100 text-left">ULANGAN</button>
                          </li>
                        </ul>
                    </div>
                    {/if}
                </div>
                <input type="text" name="type" id="type" class="hidden" bind:value={typeValue} />
                <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add Assignment</button>
                <!-- <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create User</button> -->
            </form>
        </div>
    </div>
</div>
{/if}

{#if addUserState}
<div class="flex justify-center items-center fixed h-full w-full backdrop-blur-md z-50" transition:fade>
    <!-- Modal content -->
    <div class="relative bg-white rounded-lg shadow-lg -translate-y-28 w-80 md:w-96" transition:scale>
        <button on:click={hideUserModal} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="authentication-modal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
            <h3 class="mb-4 text-xl font-medium text-gray-900">Add Student</h3>
            <form method="POST" class="space-y-6" action="?/createStudent" use:enhance={onAddStudent}>
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Student name</label>
                    <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Andrew" >
                </div>
                <div>
                    <label for="nis" class="block mb-2 text-sm font-medium text-gray-900">Student NIS</label>
                    <input type="text" name="nis" id="nis" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="1234" >
                </div>

                <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add Student</button>
                <!-- <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create User</button> -->
            </form>
        </div>
    </div>
</div>
{/if}

<div class="ml-16 mt-3 p-5 md:p-10 xl:p-20" in:fly="{{x:100, easing:cubicInOut, delay: 200}}" out:fly="{{x:100, easing:cubicInOut, duration:200}}">
    <h1 class="text-4xl font-semibold mb-2">{courses.class}</h1>
    <h1 class="text-xl mb-1">Subject: {courses.subject}</h1>
    <h1 class="text-lg mb-10">KKM: {courses.kkm}</h1>
    <Table>
        <TableHead>
            <TableHeadChild label="Name"/>
            <TableHeadChild label="NIS"/>
            {#each assignments as a}
                <TableHeadChild label="{a.name}"/>
            {/each}
            <TableHeadChild label="rata-rata"/>
            <TableHeadChild label="" buttons>
                <button on:click={showAddModal} class="flex justify-center items-center hover:bg-slate-200 w-8 h-8 mr-2 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
                <button on:click={showUserModal} class="flex justify-center items-center hover:bg-slate-200 w-8 h-8 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                    </svg>                                          
                </button>
            </TableHeadChild>
        </TableHead>
        <TableBody>
            {#each students as student}
            <TableGrade>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 hover:bg-gray-200 cursor-pointer whitespace-nowrap" on:click={() => showUpdateModal("Name", student.id, student.name)}>
                    {student.name}  
                </th>
                <td class="px-6 py-4 font-medium text-gray-900 hover:bg-gray-200 cursor-pointer whitespace-nowrap" on:click={() => showUpdateModal("NIS", student.id, student.studentNis)} on:keydown={() => showUpdateModal("NIS", student.id, student.studentNis)}>
                    {student.studentNis}
                </td>
                {#each assignments as assignment}
                    {@const grade = getGrade(student.id, assignment.id)}
                    {#if grade < +(courses.kkm)}
                    <td class="group px-6 py-4 cursor-pointer bg-red-500 text-gray-100 hover:bg-red-600 hover:text-gray-50" on:click={() => showGradeModal(student.id, assignment.id, grade, assignment.type)} on:keydown={() => showGradeModal(student.id, assignment.id, grade, assignment.type)}>
                        <div class="flex flex-row">
                            {grade}
                            <div class="flex justify-end w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-red-500 group-hover:text-gray-50">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>
                            </div>
                        </div>
                    </td>
                    {:else}
                    <td class="group px-6 py-4 cursor-pointer hover:bg-gray-200 hover:text-gray-500" on:click={() => showGradeModal(student.id, assignment.id, grade, assignment.type)} on:keydown={() => showGradeModal(student.id, assignment.id, grade, assignment.type)}>
                        <div class="flex flex-row">
                            {grade}
                            <div class="flex justify-end w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-white group-hover:text-gray-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>
                            </div>
                        </div>                      
                    </td>
                    {/if}
                {/each}
                {@const avg = getGradeAvg(student.id)}
                {#if avg < courses.kkm }
                    <td class="px-6 py-4 bg-red-500 text-gray-100">
                        {avg}
                    </td>
                {:else}
                    <td class="px-6 py-4">
                        {avg}
                    </td>
                {/if}
                <td class="px-6 py-4">
                    <div class="flex items-center justify-end">
                        <button on:click={() => showDeleteModal(student.id)} class="flex justify-center items-center bg-red-500 hover:bg-red-600 w-10 h-10 mx-2 text-white rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                    </div>
                </td>
            </TableGrade>
            {/each}
        </TableBody>
    </Table>
</div>
