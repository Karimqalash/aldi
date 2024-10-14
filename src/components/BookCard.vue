<template>
  <div class="c-card">
    <h2>{{ book.name }}</h2>
    <div>
      <div><b>Author: </b>{{ book.author }}</div>
      <div><b>Category: </b>{{ book.category }}</div>
      <div><b>Publish Year: </b>{{ book.publishYear }}</div>
    </div>
    
    <div v-if="ratings?.length > 0">
      <b>Ratings:</b>
      <ul>
        <li v-for="(rating, index) in ratings" :key="index">
          <b v-if="rating.value">{{ rating.source || 'Unknown Source' }}:</b> {{ rating.value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  book: Object,
})

const ratings = computed(() => {
  return Array.isArray(props.book?.ratings) && props.book?.ratings?.filter((rating) => rating.value !== null)
})
</script>

<style>
.c-card {
  display: flex;
  flex-direction: column;
  width: 350px;
  padding: 1rem;
  background-color: #FFF;
  border: solid #000 1px;
  border-radius: 4px;
}

ul {
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
}
</style>