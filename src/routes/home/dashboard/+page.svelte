<script lang='ts'>
    import ClassCard from "$lib/components/ClassCard.svelte";
    import { fly } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";
    import type { PageData } from "./$types"

    export let data: PageData

    const hours = new Date().getHours()
    let time = "Night"
    if (hours < 5) {
        time = "Night"
    } else if (hours < 12) {
        time = "Morning"
    } else if (hours < 18) {
        time = "Afternoon"
    } else if (hours < 20) {
        time = "Evening"
    } else {
        time = "Night"
    }

    $: ({ user } = data)
</script>

<div class="ml-20 mt-3 p-5 md:p-10 xl:p-20" in:fly="{{x:100, easing:cubicInOut, delay: 200}}" out:fly="{{x:100, easing:cubicInOut, duration:200}}">
    <p class="text-5xl font-semibold text-gray-800 mb-10 sm:mb-20">
        Good {time}, {user.name}!
    </p>
       
    <div class="grid grid-cols-1 sm:grid-cols-2">
        <div class="mb-6 sm:mb-0">
            <p class="text-xl">Recently accessed class</p>
            <a href="/home/courses" class="inline-flex items-center mb-6 font-medium text-center text-blue-500 hover:text-blue-600">
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

