export default {
  getTodos () {
    return JSON.parse(localStorage.getItem('todos_key')) || []
  },
  setTodos (todos) {
    localStorage.setItem('todos_key', JSON.stringify(todos))
  }
}
