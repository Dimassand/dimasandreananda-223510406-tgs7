// stores/todostore.js
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([])

  const addTodo = (task) => {
    todos.value.push({ task, completed: false })
  }

  const removeTodo = (index) => {
    todos.value.splice(index, 1)
  }

  const toggleTodo = (index) => {
    todos.value[index].completed = !todos.value[index].completed
  }

  const unfinishedTodosCount = computed(() => {
    return todos.value.filter(todo => !todo.completed).length
  })

  return {
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
    unfinishedTodosCount
  }
})