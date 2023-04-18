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
              <SidebarChild href="/home/dashboard" label="Dashboard">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                </svg>                
              </SidebarChild>
              <SidebarChild href="/home/courses" label="Courses">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>                               
              </SidebarChild>
              {#if data.user?.class != ""}
              <SidebarChild href="/home/my-class" label="Grades">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>                
              </SidebarChild>
              {/if}
            </SidebarGroup>
            {#if data.user?.level == "ADMIN"}
            <SidebarGroupBorderTop>
              <SidebarChild href="/home/users" label="Users">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>                          
              </SidebarChild>
            </SidebarGroupBorderTop>
            {/if}
            <SidebarGroupBorderTop>
              <form method="POST" class="flex flex-row items-center justify-start overflow-hidden w-full h-12 mt-2 mx-0 mb-auto rounded hover:bg-red-500 hover:text-white">
                <button formaction="/logout" type="submit" class="flex flex-row items-center justify-start w-full h-full">
                  <div class="mx-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>      
                  </div>
                              
                  <h1>Logout</h1>
                </button>
              </form>
            </SidebarGroupBorderTop>
          </Sidebar>
        </div>
        <main class="overflow-hidden">
          <slot/>
        </main>
      </div>
</main>