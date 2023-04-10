<script lang='ts'>
    import ClassCard from "$lib/components/ClassCard.svelte";
    import type { PageData } from "./$types"

    export let data: PageData

    $: ({ user, time } = data)
</script>

<div class="ml-20 mt-3 p-5 md:p-10 xl:p-20">
    <p class="text-5xl font-semibold text-gray-800 mb-10 sm:mb-20">
        Good {time}, {user.name}!
    </p>
       
    <div class="grid grid-cols-1 sm:grid-cols-2">
        <div class="mb-6 sm:mb-0">
            <p class="text-xl">Recently accessed class</p>
            <a href="/home/classes" class="inline-flex items-center mb-6 font-medium text-center text-blue-500 hover:text-blue-600">
                Go to classes
                <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
            <div class="max-w-md">
                <ClassCard className="XII RPL" classUrl="AMOGUS" name="Bahasa Indonesia"/>
            </div>
        </div>
        <div>
            <p class="text-xl mb-6">Announcements</p>
        </div>
    </div>
    
</div>

