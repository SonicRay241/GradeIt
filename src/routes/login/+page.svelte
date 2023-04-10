<main class="flex items-center justify-center h-screen md:px-64 md:py-32">
    <div class="grid grid-cols-3 w-full h-full p-0 bg-white border border-gray-200 rounded-2xl shadow">
        <div class="col-span-1 bg-indigo-700 rounded-2xl shadow hidden md:block"/>
        <div class="col-span-2 pt-8 pl-8 md:p-16 xl:p-20 w-full">
            <h1 class="text-5xl font-semibold text-gray-800">
                Login
            </h1>

        <form class="mt-8 xl:max-w-xl" method="POST">
            <div class="mb-6">
              <label for="username" class="block mb-2 text-lg font-medium text-gray-900 ">Username</label>
              <input type="username" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Username" required>
            </div>
            <div class="mb-8">
              <label for="password" class="block mb-2 text-lg font-medium text-gray-900 ">Password</label>
              <input type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="••••••••••" required>
              <slot/>
            </div>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center ">Login</button>
          </form> 
        </div>
    </div>
</main>