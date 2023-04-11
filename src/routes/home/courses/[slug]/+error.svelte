<script lang="ts">
    import bookImage from "$lib/asset/image/book.png"
    import { page } from "$app/stores"
</script>

<main class="flex items-center justify-center h-full">
    {#if $page.status == 404}
    <div class="flex justify-center mt-24">
        <div class="flex flex-col">
            <div>
                <img src={bookImage} alt="Book" class="w-96 h-auto">
            </div>
            <h1 class="text-5xl font-semibold text-slate-800 mb-4">
                Course not found!
            </h1>
            <div class="flex justify-center">
                <a href="/home/courses" class="inline-flex items-center px-3 py-2 text-lg w-fit font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    Return
                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </a>
            </div>
        </div>
    </div>
    {:else}
    <div>
        <h1 class="text-9xl font-medium">
            {$page.status}
        </h1>
        <h2 class="text-xl">
            {$page.error?.message}
        </h2>
        <div class="flex justify-center">
            <a href="/home/dashboard" class="inline-flex items-center px-3 py-2 mt-4 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                Return
                <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
        </div>
    </div>
    {/if}
</main>
