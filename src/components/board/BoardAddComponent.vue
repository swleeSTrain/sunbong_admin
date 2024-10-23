<template>
  <div>
    <h2>Create New Post</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="title">Title:</label>
        <input type="text" v-model="postForm.title" id="title" required />
      </div>
      <div>
        <label for="author">Author:</label>
        <input type="text" v-model="postForm.author" id="author" required />
      </div>
      <div>
        <label for="content">Content:</label>
        <textarea v-model="postForm.content" id="content" required></textarea>
      </div>
      <div>
        <label for="files">Attach Files:</label>
        <input type="file" id="files" multiple @change="handleFiles" />
      </div>
      <button type="submit">Submit Post</button>
    </form>
  </div>
</template>

<script>
import { postBoardOne } from '../../apis/boardAPI';

export default {
  data() {
    return {
      postForm: {
        title: '',
        author: '',
        content: '',
      },
      files: [],  // 첨부 파일 리스트
    };
  },
  methods: {
    handleFiles(event) {
      this.files = Array.from(event.target.files); // 파일을 배열로 변환
    },
    async handleSubmit() {
      try {
        const response = await postBoardOne(this.postForm, this.files);
        alert('Post created with ID: ' + response);
        this.resetForm();
      } catch (error) {
        console.error('Error creating post:', error);
        alert('Failed to create post');
      }
    },
    resetForm() {
      this.postForm = { title: '', author: '', content: '' };
      this.files = [];
    },
  },
};
</script>

<style scoped>
/* 스타일 */
h2 {
  font-size: 1.5em;
}
form {
  margin-top: 1em;
}
form div {
  margin-bottom: 1em;
}
</style>
