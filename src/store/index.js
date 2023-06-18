import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const TASKS_STORAGE_KEY = 'tasks';

export default new Vuex.Store({
  state: {
    tasks: [],
    lastTaskId: 0,
  },
  mutations: {
    addTask(state, task) {
      state.tasks.push({ ...task, id: state.lastTaskId + 1 });
      state.lastTaskId += 1;
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.tasks));
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.tasks));
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.tasks));
      }
    },
    loadTasksFromStorage(state) {
      const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
      if (savedTasks) {
        state.tasks = JSON.parse(savedTasks);
        state.lastTaskId = state.tasks.length > 0 ? state.tasks[state.tasks.length - 1].id : 0;
      }
    },
  },
  actions: {
    addTask({ commit }, task) {
      commit('addTask', task);
    },
    deleteTask({ commit }, taskId) {
      commit('deleteTask', taskId);
    },
    updateTask({ commit }, updatedTask) {
      commit('updateTask', updatedTask);
    },
  },
  getters: {
    getTasks(state) {
      return state.tasks;
    },
  },
  plugins: [
    (store) => {
      store.commit('loadTasksFromStorage'); // Вызываем мутацию при создании хранилища, чтобы загрузить задачи из localStorage
    },
  ],
});
