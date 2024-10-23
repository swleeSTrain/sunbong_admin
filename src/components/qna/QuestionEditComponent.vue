<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold mb-4">Question Edit Component</h1>

    <form @submit.prevent="handleEdit" enctype="multipart/form-data">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
        <input
            type="text"
            id="title"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            required
        />
      </div>

      <div class="mb-4">
        <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
        <input
            type="text"
            id="content"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            required
        />
      </div>

      <div class="mb-4">
        <label for="writer" class="block text-sm font-medium text-gray-700">Writer</label>
        <input
            type="text"
            id="writer"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            required
        />
      </div>

      <div class="mb-4">
        <label for="tags" class="block text-sm font-medium text-gray-700">Tags</label>
        <input
            type="text"
            id="tags"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
      </div>

      <div class="mb-4">
        <label for="files" class="block text-sm font-medium text-gray-700">Files</label>
        <input
            ref="fileInput"
            type="file"
            id="files"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            multiple
        />
      </div>

      <div class="flex space-x-4">

        <button
            type="button"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          List
        </button>

        <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit
        </button>

        <button
            type="button"
            @click="handleDelete"
            class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>


</script>
