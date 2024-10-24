<template>
  <div class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-bold text-gray-700 mb-4">Edit Post</h2>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="title" class="block text-gray-600 font-medium">Title:</label>
        <input
            type="text"
            id="title"
            v-model="boardData.title"
            required
            class="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label for="content" class="block text-gray-600 font-medium">Content:</label>
        <textarea
            id="content"
            v-model="boardData.content"
            required
            class="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>
      </div>
      <div>
        <label for="files" class="block text-gray-600 font-medium">Attach Files:</label>
        <input
            type="file"
            id="files"
            multiple
            @change="handleFileUpload"
            class="mt-2 text-gray-600"
        />
      </div>
      <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
      >
        Update Post
      </button>
    </form>
  </div>
</template>

<script>
import { putBoardOne } from "../../apis/boardApi";

export default {
  props: {
    boardBno: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      boardData: {
        title: "",
        content: "",
      },
      files: [],
    };
  },
  methods: {
    handleFileUpload(event) {
      this.files = Array.from(event.target.files);
    },
    async submitForm() {
      try {
        const response = await putBoardOne(this.boardBno, this.boardData, this.files);
        console.log("Post updated successfully:", response);
        this.$emit("post-updated");
      } catch (error) {
        console.error("Error updating post:", error);
      }
    },
  },
};
</script>

<style scoped></style>
