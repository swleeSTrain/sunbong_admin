<script setup>

</script>

<template>
  <div class="min-h-screen flex bg-gradient-to-r from-gray-50 to-white">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-800 text-white p-6 space-y-8 shadow-xl">
      <h1 class="text-3xl font-bold text-white uppercase tracking-widest">ERP System</h1>
      <nav class="space-y-4">
        <!-- RouterLink로 링크를 연결 -->
        <RouterLink to="/notice/list" class="block py-4 px-6 text-white bg-gray-700 hover:bg-gray-600 hover:shadow-lg transition duration-300 rounded-lg">
          NOTICE
        </RouterLink>
        <RouterLink to="/qna/question/list" class="block py-4 px-6 text-white bg-gray-700 hover:bg-gray-600 hover:shadow-lg transition duration-300 rounded-lg">
          QnA
        </RouterLink>
        <RouterLink to="/qna/question/add" class="block py-4 px-6 text-white bg-gray-700 hover:bg-gray-600 hover:shadow-lg transition duration-300 rounded-lg">
          QnA Register
        </RouterLink>
        <!--        <RouterLink to="/sales-management" class="block py-4 px-6 text-white bg-gray-700 hover:bg-gray-600 hover:shadow-lg transition duration-300 rounded-lg">-->
        <!--          QNA-->
        <!--        </RouterLink>-->
        <!--        <RouterLink to="/reports" class="block py-4 px-6 text-white bg-gray-700 hover:bg-gray-600 hover:shadow-lg transition duration-300 rounded-lg">-->
        <!--          FAQ-->
        <!--        </RouterLink>-->
      </nav>
    </aside>
    <!-- Main Content -->
    <main class="flex-1 p-8 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg">
      <!-- Header -->


      <!-- 페이지의 동적인 콘텐츠가 렌더링될 영역 -->
      <RouterView></RouterView>
    </main>
  </div>

</template>

<style scoped>

</style>