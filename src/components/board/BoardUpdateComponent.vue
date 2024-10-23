<template>
  <div>
    <h2>Edit Post</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="title">Title</label>
        <input type="text" id="title" v-model="boardData.title" required />
      </div>
      <div>
        <label for="content">Content</label>
        <textarea id="content" v-model="boardData.content" required></textarea>
      </div>
      <div>
        <label for="files">Attach Files</label>
        <input type="file" id="files" @change="handleFileUpload" multiple />
      </div>
      <button type="submit">Update Post</button>
    </form>
  </div>
</template>

<script>
import { putBoardOne } from "../../apis/boardApi"; // 게시글 수정 API 호출 함수

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
      files: [], // 첨부된 파일을 저장할 배열
    };
  },
  methods: {
    handleFileUpload(event) {
      this.files = Array.from(event.target.files); // 선택된 파일을 배열로 저장
    },
    async submitForm() {
      try {
        const response = await putBoardOne(this.boardBno, this.boardData, this.files); // 게시글 수정 API 호출
        console.log("Post updated successfully:", response);
        this.$emit("post-updated"); // 부모 컴포넌트로 수정 완료 이벤트 전달
      } catch (error) {
        console.error("Error updating post:", error);
      }
    },
  },
  created() {
    // 기존 게시글 데이터를 API를 통해 불러오는 로직이 있을 경우 여기에 추가
    // 예시:
    // axios.get(`/api/board/${this.editBno}`).then(response => {
    //   this.boardData = response.data;
    // });
  },
};
</script>

<style scoped>
/* 스타일 필요 시 추가 */
</style>
