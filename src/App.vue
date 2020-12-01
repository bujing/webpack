<template>
  <input
    v-model="todo"
    type="text"
    @keyup.enter="addTodoItem"
  >

  <ul>
    <li
      v-for="(v, k) in todoList"
      :key="k"
      @click="delTodoItem(k)"
    >
      <span v-if="v.status">{{ v.name }}</span>
      <del v-else>{{ v.name }}</del>
    </li>
  </ul>
  <p v-if="todoList.length === 0">
    请添加待办事项
  </p>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  name: 'App',
  setup () {
    const todo = ref('')
    const todoList = reactive([] as TodoItemType[])

    function addTodoItem () {
      todoList.push({
        name: todo.value,
        status: 1
      })
      todo.value = ''
    }

    function delTodoItem (index: number) {
      todoList[index].status ^= 1
    }

    return {
      todo,
      todoList,
      addTodoItem,
      delTodoItem
    }
  }
})
</script>

<style lang="scss">
@import '@/scss/index.scss';
</style>
