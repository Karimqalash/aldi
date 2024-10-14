<template>
  <div>
    <div v-for="(decade, i) in decades" :key="i" class="c-decades">
      <h2>{{ decade?.range }}</h2>
      <div>
        <div v-if="decade?.books?.length" class="c-cards">
          <BookCard v-for="book in decade.books" :key="book.id" :book="book" />
        </div>
        <div v-else>
          No Publication
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCategorizeBooksByDecade } from '@/composables/useCategorizeBooksByDecade';
import BookCard from './BookCard.vue';
const props = defineProps({
  books: Array,
})
const books = computed(() => props.books)

const { decades } = useCategorizeBooksByDecade(books);
</script>

<style scoped>
.c-decades {
    display: flex;
    flex-direction: column;
    padding: 2rem 0;
    gap: 1rem;
    border-bottom: solid 1px #CCC;
}
.c-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;
}
</style>
