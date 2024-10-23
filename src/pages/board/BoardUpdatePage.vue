<template>
  <div>
    <h2>Edit Post (Board No: {{ boardNo }})</h2>
    <BoardUpdateComponent :boardBno="boardNo" @post-updated="handlePostUpdated" />
  </div>
</template>

<script>
import BoardUpdateComponent from "../../components/board/BoardUpdateComponent.vue";

export default {
  props: ['boardNo'],  // 라우터로부터 받은 게시글 번호
  components: {
    BoardUpdateComponent,
  },
  methods: {
    handlePostUpdated() {
      // 게시글 수정 완료 후 리다이렉트나 알림 처리
      this.$router.push('/');  // 예시: 수정 후 홈으로 이동
    },
  },
};
</script>