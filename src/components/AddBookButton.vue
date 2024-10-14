<template>
  <div>
    <button @click="openModal">Add a Book</button>

    <AddBookModal v-if="isModalOpen" @close="closeModal" @add-book="(addedBook) => $emit('add-book', addedBook)" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AddBookModal from './AddBookModal.vue';

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};
const closeModal = () => {
  isModalOpen.value = false;
};
</script>
