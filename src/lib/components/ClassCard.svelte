<script lang="ts">
    export let className: string
    export let classUrl: string
    export let name: string = ""
</script>

<main>
    <div class="p-6 bg-white border border-gray-200 rounded-lg shadow">
        <h5 class="mb-3 text-4xl font-bold tracking-tight text-gray-900">{className}</h5>
        <p class="mb-3 font-normal text-lg text-gray-700 ">{name}</p>
        <div class="flex justify-end w-full">
            <a href="/home/classes/{classUrl}" class="inline-flex items-center px-3 py-2 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                View
                <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
        </div>
    </div>
</main>
