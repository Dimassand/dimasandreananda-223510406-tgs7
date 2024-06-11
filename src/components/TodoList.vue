<template>
  <div class="container">
    <h1 class="title">Sparepart Motor</h1>
    <input v-model="newTask" class="input" placeholder="Tambahkan barang" @keyup.enter="addTodo" />
    <button @click="addTodo" class="button">Masukkan barang</button>
    <ul class="todo-list">
      <li v-for="(todo, index) in todos" :key="index" class="todo-item">
        <span :class="{ 'completed-task': todo.completed }" class="todo-text">{{ todo.task }}</span>
        <div class="button-group">
          <button @click="toggleTodo(index)" class="toggle-button">
            {{ todo.completed ? 'Batalkan' : 'Selesai' }}
          </button>
          <button @click="removeTodo(index)" class="remove-button">Hapus</button>
        </div>
      </li>
    </ul>
    <p class="unfinished-count">Barang yang di beli {{ unfinishedTodosCount }}</p>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useTodoStore } from '../stores/todoStore'

export default {
  setup() {
    const todoStore = useTodoStore()
    const newTask = ref('')

    const addTodo = () => {
      if (newTask.value.trim()) {
        todoStore.addTodo(newTask.value)
        newTask.value = ''
      }
    }

    const unfinishedTodosCount = computed(() => todoStore.unfinishedTodosCount)

    return {
      newTask,
      todos: todoStore.todos,
      addTodo,
      removeTodo: todoStore.removeTodo,
      toggleTodo: todoStore.toggleTodo,
      unfinishedTodosCount
    }
  }
}
</script>


<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-image: url(data:image/png;base64,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);
  border-radius: 8px;
  background-position: center;
  background-size: auto;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.title {
  color: rgb(151, 225, 241);
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
  animation: slide 3s infinite alternate; 
  border: 2px solid  rgb(151, 225, 241);
}

@keyframes slide {
  0% {
    transform: translateX(-40px); /* Posisi awal */
  }
  100% {
    transform: translateX(40px); /* Posisi akhir */
  }
}


.input {
  width: calc(100% - 120px);
  padding: 10px;
  border: 2px solid  rgb(151, 225, 241);
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 16px;
}

.button {
  width: 100px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color:  rgb(151, 225, 241);
  color: #1e1717;
  font-size: 16px;
  cursor: pointer;
}

.button:hover {
  background-color:  rgb(151, 225, 241);
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  color: rgb(151, 225, 241);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  font-style: italic;
}

.todo-text {
  flex: 1;
}

.completed-task {
  text-decoration: line-through;
}

.button-group {
  display: flex;
}

.toggle-button,
.remove-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.toggle-button {
  background-color: rgb(151, 225, 241);
  color: #150d0d;
}

.toggle-button:hover {
  background-color: #218838;
}

.remove-button {
  background-color: #dc3545;
  color: #fff;
}

.remove-button:hover {
  background-color: #c82333;
}

.unfinished-count {
  color:  rgb(151, 225, 241);
  margin-top: 20px;
  font-size: 16px;
  text-align: center;
}
</style>
