export default {
  getTodos: function () {
    return JSON.parse(localStorage.getItem('todos_key') || '[]')
  },
  setTodos: function (val) {
    localStorage.setItem('todos_key', JSON.stringify(val))
  }
}
