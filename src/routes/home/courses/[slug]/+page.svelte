<script lang="ts">
    import Table from "$lib/components/Table.svelte";
    import TableHead from "$lib/components/TableHead.svelte";
    import TableHeadChild from "$lib/components/TableHeadChild.svelte";
    import TableBody from "$lib/components/TableBody.svelte";
    import TableGrade from "$lib/components/TableGrade.svelte";
    import { fade, scale, fly } from "svelte/transition"
    import { cubicInOut } from "svelte/easing"
    import type { PageData } from './$types';
  
    export let data: PageData;

    let addModalState = false
    let addUserState = false
    let gradeModalState = false
    let gradeModalValue = ""

    let selectedStudentId = ""
    let selectedAssignmentId = ""

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

    $: ({ assignments, courses, grades, students } = data)

    const showGradeModal = (studentId: any, assignmentId: any, value: any) => {
        gradeModalState = true
        gradeModalValue = value
        selectedAssignmentId = assignmentId
        selectedStudentId = studentId
    }

    const getGrade = (studentId: any, assignmentId: any) => {
        for (let i = 0; i < grades.length; i++) {
            if (grades[i].assignmentID == assignmentId as number && grades[i].studentID == studentId as number) {
                return grades[i].score
            }
        }
        return 0
    }

    const getGradeAvg = (studentId: any) => {
        let avg = 0
        for (let i = 0; i < grades.length; i++) {
            if (grades[i].studentID == studentId as number) {
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
</script>
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
            <form method="POST" class="space-y-6" action="?/createOrUpdateGrade">
                <div>
                    <!-- <label for="grade" class="block mb-2 text-sm font-medium text-gray-900">Assignment name</label> -->
                    <input type="number" name="grade" id="grade" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="100" bind:value={gradeModalValue} required>
                </div>

                <input type="text" name="assignmentId" id="assignmentId" bind:value={selectedAssignmentId} hidden>
                <input type="text" name="studentId" id="studentId" bind:value={selectedStudentId} hidden>

                {#if +gradeModalValue > 100}
                <button type="button" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" on:click={() => alert("Must have valid score")}>Create Course</button>
                {:else}
                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create Course</button>
                {/if}

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
            <form method="POST" class="space-y-6" action="?/createStudent">
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Student name</label>
                    <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Andrew" required>
                </div>
                <div>
                    <label for="nis" class="block mb-2 text-sm font-medium text-gray-900">Student NIS</label>
                    <input type="text" name="nis" id="nis" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="1234" required>
                </div>

                <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create Course</button>
                <!-- <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create User</button> -->
            </form>
        </div>
    </div>
</div>
{/if}

<div class="ml-16 mt-3 p-5 md:p-10 xl:p-20" in:fly="{{x:100, easing:cubicInOut, delay: 200}}" out:fly="{{x:100, easing:cubicInOut, duration:200}}">
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
            <TableGrade name="{student.name}" nis={student.studentNis}>
                {#each assignments as assignment}
                    {@const grade = getGrade(student.id, assignment.id)}
                    {#if grade < +(courses.kkm)}
                    <td class="group px-6 py-4 cursor-pointer bg-red-400 text-gray-100 hover:bg-red-500 hover:text-gray-50" on:click={() => showGradeModal(student.id, assignment.id, grade)} on:keydown={() => showGradeModal(student.id, assignment.id, grade)}>
                        <div class="flex flex-row">
                            {grade}
                            <div class="flex justify-end w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-red-400 group-hover:text-gray-50">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>
                            </div>
                        </div>
                    </td>
                    {:else}
                    <td class="group px-6 py-4 cursor-pointer hover:bg-gray-300 hover:text-gray-500" on:click={() => showGradeModal(student.id, assignment.id, grade)} on:keydown={() => showGradeModal(student.id, assignment.id, grade)}>
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
                    <td class="px-6 py-4 bg-red-400 text-gray-100">
                        {avg}
                    </td>
                {:else}
                    <td class="px-6 py-4">
                        {avg}
                    </td>
                {/if}
            </TableGrade>
            {/each}
        </TableBody>
    </Table>
</div>
