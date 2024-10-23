<template>
  <div>
    <BoardReadComponent :boardNo="boardNo" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import BoardReadComponent from "../../components/board/BoardReadComponent.vue";

// Using defineProps for props declaration in script setup
const props = defineProps({
  boardNo: {
    type: Number,
    required: true
  }
});
</script>
