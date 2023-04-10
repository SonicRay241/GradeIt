<script lang='ts'>
  import Sidebar from "$lib/components/Sidebar.svelte";
  import SidebarChild from "$lib/components/SidebarChild.svelte";
  import SidebarGroup from "$lib/components/SidebarGroup.svelte";
  import SidebarGroupBorderTop from "$lib/components/SidebarGroupBorderTop.svelte";
  import type { LayoutData } from './$types';

  export let data: LayoutData;
</script>

<main>
    <nav class="fixed top-0 z-40 w-full bg-gradient-to-r from-indigo-700 via-purple-900 to-red-500">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start">
              <a href="/home/dashboard" class="flex ml-2 md:mr-24">
                <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">GradeIt!</span>
              </a>
            </div>
            <div class="flex items-center">
                <div class="flex items-center ml-3">
                  <p class="text-white text-lg font-semibold">{data.user?.name}</p>
                </div>
              </div>
          </div>
        </div>
      </nav>
      <div>
        <div class="pt-14">
          <Sidebar>
            <SidebarGroup>
              <SidebarChild iconClass="fa-regular fa-gauge-high fa-lg" href="/home/dashboard" label="Dashboard"/>
              <SidebarChild iconClass="fa-regular fa-book-open fa-lg" href="/home/courses" label="Courses"/>
              <SidebarChild iconClass="fa-solid fa-list-check fa-xl" href="/home/my-class" label="Grades"/>
            </SidebarGroup>
            {#if data.user?.level == "ADMIN"}
            <SidebarGroupBorderTop>
              <SidebarChild iconClass="fa-solid fa-user-gear fa-lg" href="/home/users" label="Users"/>
              <SidebarChild iconClass="fa-solid fa-table fa-xl" href="/home/classes" label="Classes"/>
            </SidebarGroupBorderTop>
            {/if}
            <SidebarGroupBorderTop>
              <form method="POST" class="flex flex-row items-center justify-start overflow-hidden w-full h-12 mt-2 mx-0 mb-auto rounded hover:bg-red-500 hover:text-white">
                <button formaction="/logout" type="submit" class="flex flex-row items-center justify-start w-full h-full">
                  <i class="fa-regular fa-arrow-right-from-bracket fa-xl mx-3.5"></i>
                  <h1>Logout</h1>
                </button>
              </form>
            </SidebarGroupBorderTop>
          </Sidebar>
        </div>
        <slot/>
      </div>
</main>