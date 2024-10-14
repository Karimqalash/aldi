<template>
  <div class="c-modal">
    <div class="c-modal-content">
      <div class="c-modal-headers">
        <h2>Add a New Book</h2>
        <button type="button" class="c-modal-headers__close-btn" @click="closeModal">X</button>
      </div>

      <form class="c-modal-form" @submit.prevent="submitForm">
        <div v-for="group in form" :key="group.key" class="c-modal-form__group">
          <label :for="group.key">{{ group.label }}</label>
          <input v-model="group.value" :type="group.type" :id="group.key" maxlength="48" required />
        </div>
        <div class="c-modal-form__group">
          <label>Ratings</label>
          <button type="button" @click="addRating">Add Rating</button>
          <div v-for="(rating, index) in ratings" :key="index" class="c-modal-form__group-rating">
            <input v-model="rating.source" placeholder="Source (optional)" />
            <input v-model="rating.value" type="number" placeholder="Value" required />
            <button type="button" @click="removeRating(index)">Remove</button>
          </div>
        </div>

        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

        <button type="submit" :disabled="isLoading">Add Book</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, onUnmounted } from 'vue';

import { addBook } from '../services/bookService';

const formGroups = {
  name: {
    label: 'Name',
    key: 'name',
    type: 'text',
    value: ''
  },
  author: {
    label: 'Author',
    key: 'author',
    type: 'text',
    value: ''
  },
  publishYear: {
    label: 'Published Year',
    key: 'publishYear',
    type: 'number',
    value: null
  },
  category: {
    label: 'Genre',
    key: 'category',
    type: 'text',
    value: ''
  },
};

const form = ref(formGroups);
const ratings = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');

const emits = defineEmits(['close','add-book']);
const closeModal = () => {
  emits('close');
};

const addRating = () => {
  ratings.value.push({ source: '', value: null });
};

const removeRating = (index) => {
  ratings.value.splice(index, 1);
};

const validateForm = () => {
  if (!form.value.name.value || !form.value.author.value || !form.value.category.value) {
    errorMessage.value = 'All fields are required except for ratings.';
    return false;
  }
  return true;
};

const submitForm = async () => {
  if (!validateForm()) {
    return;
  }

  isLoading.value = true;

  const newBook = {
    name: form.value.name.value,
    author: form.value.author.value,
    publishYear: form.value.publishYear.value,
    category: form.value.category.value,
    ratings: ratings.value || [],
  };

  try {
    const addedBook = await addBook(newBook);
    emits('add-book', addedBook);
    closeModal();
  } catch (error) {
    errorMessage.value = error || 'Failed to add the book. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

onUnmounted(() => {
  errorMessage.value = '';
  form.value = formGroups;
  ratings.value = [];
});
</script>


<style scoped>
.c-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.c-modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 538px;
  width: 100%;
}

.c-modal-headers {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.c-modal-headers__close-btn {
  background: none;
  border: none;
  cursor: pointer;
}

.c-modal-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
}

.c-modal-form__group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 1rem;
  width: 100%;
}

.c-modal-form__group label {
  width: 120px;
  font-weight: 500;
}

.c-modal-form__group input {
  height: 32px;
  padding: 0.5rem;
  flex: 1 1 auto;
}

.c-modal-form__group-rating {
  display: flex;
  gap: 12px;
  margin: 10px 0;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
