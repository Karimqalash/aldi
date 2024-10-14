<script setup>
import { ref, onMounted } from 'vue';

import AddBookButton from './components/AddBookButton.vue'
import BooksList from './components/BooksList.vue'

import { getBooks } from './services/bookService'

const isLoading = ref(false);
const errorMessage = ref('');
const books = ref([]);

const addBook = (newBook) => {
  books.value.push(newBook);
}

onMounted(async () => {
  try {
    isLoading.value = true;
    books.value = await getBooks();
  } catch (error) {
    errorMessage.value = error.message || 'Failed to load books';
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="c-wrapper">
    <div class="c-header">
      <h1>Home Page</h1>
      <AddBookButton @add-book="addBook" />
    </div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="errorMessage">{{ errorMessage }}</div>
    <BooksList v-else :books="books" />
  </div>
</template>

<style scoped>
.c-header {
  display: flex;
  justify-content: space-between;
}
</style>
