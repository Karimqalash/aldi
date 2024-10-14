<template>
  <div class="c-card">
    <h2>{{ book.name }}</h2>
    <div>
      <div><b>Author: </b>{{ book.author }}</div>
      <div><b>Category: </b>{{ book.category }}</div>
      <div><b>Publish Year: </b>{{ book.publishYear }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  book: Object,
})
</script>

<style>
.c-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 350px;
  padding: 1rem;
  background-color: #FFF;
  border: solid #000 1px;
  border-radius: 4px;
}
</style>