<template>
  <div class="task-list-page">
    <h2>Task List</h2>
    <ul class="task-list">
      <li v-for="task in tasks" :key="task.id" class="task-item">
        {{ task.title }} - {{ task.description }}
        <div class="task-actions">
          <button @click="editTask({ ...task })">Edit</button>
          <button @click="deleteTask(task.id)">Delete</button>
        </div>
      </li>
    </ul>
    <form @submit.prevent="createTask" class="task-form">
      <label for="taskTitle">
        Task Title:
        <input id="taskTitle" v-model="newTask.title" type="text" required>
      </label>

      <label for="taskDescription">
        Task Description:
        <input id="taskDescription" v-model="newTask.description" type="text" required>
      </label>

      <button type="submit">Create Task</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      editingTaskId: null,
      newTask: {
        title: '',
        description: '',
      },
    };
  },
  computed: {
    ...mapGetters(['getTasks']),
    tasks() {
      return this.getTasks;
    },
  },
  methods: {
    ...mapActions(['addTask', 'deleteTask', 'updateTask']),
    createTask() {
      console.log(this.editingTaskId);
      if (this.editingTaskId) {
        const updatedTask = {
          id: this.editingTaskId,
          title: this.newTask.title,
          description: this.newTask.description,
        };
        this.updateTask(updatedTask);
        this.editingTaskId = null;
      } else {
        // Создание новой задачи
        this.addTask({ ...this.newTask });
      }
      this.resetForm();
    },
    editTask(task) {
      console.log(task);
      this.editingTaskId = task.id;
      this.newTask.title = task.title;
      this.newTask.description = task.description;
    },
    resetForm() {
      this.newTask.title = '';
      this.newTask.description = '';
    },
  },
};
</script>

<style>
.task-list-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.task-list {
  list-style-type: none;
  padding: 0;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.task-item:last-child {
  border-bottom: none;
}

.task-actions button {
  margin-left: 10px;
}

.task-form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.task-form label {
  margin-bottom: 10px;
}

.task-form input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.task-form button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.task-form button:hover {
  background-color: #45a049;
}

.task-form button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
