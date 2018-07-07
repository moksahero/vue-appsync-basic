<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs4 />
      <v-flex xs4 text-xs-center>
        <h3>AppSync Tasks</h3>
        <v-form>
          <v-text-field
          v-model="taskTitle"
          label="タスク名"
          ></v-text-field>
        </v-form>
        <v-btn round color="primary" @click="createTask()">タスク追加</v-btn>
      </v-flex>
      <v-flex xs4 />
      <v-flex xs4 v-for="(task, index) in tasks" :key="index">
        <v-card>
          <v-card-title primary-title>
            <div>
              <h4 class="headline mb-0">{{ task.title }}</h4>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon v-if="task.completed" @click="toggleComplete(task)">check_box</v-icon>
              <v-icon v-else @click="toggleComplete(task)">check_box_outline_blank</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon @click="deleteTask(task)">clear</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import taskService from '../services/taskService'
export default {
  name: 'Home',
  data () {
    return {
      taskTitle: '',
      tasks: [],
      deleteDialog: false
    }
  },
  methods: {
    async createTask () {
      await taskService.createTask(this.taskTitle)
      this.tasks = await taskService.getTasks()
      this.taskTitle = ''
    },
    async toggleComplete (task) {
      const taskDetails = {
        id: task.id,
        title: task.title,
        completed: !task.completed
      }
      await taskService.updateTask(taskDetails)
      this.tasks = await taskService.getTasks()
    },
    async deleteTask (task) {
      await taskService.deleteTask(task.id)
      this.tasks = await taskService.getTasks()
    }
  },
  async mounted () {
    this.tasks = await taskService.getTasks()
  }
}
</script>
