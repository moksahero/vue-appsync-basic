import uuidV4 from 'uuid/v4'
import { API, graphqlOperation } from 'aws-amplify'
export default {
  async getTasks () {
    const listTasks = `query listTasks {
      listTasks {
        items {
          id
          title
          completed
        }
      }
    }`
const tasks = await API.graphql(graphqlOperation(listTasks))
    return tasks.data.listTasks.items
  },
  async createTask(taskTitle) {
    const createTask = `
    mutation createTask($id: ID!, $title: String!, $completed: Boolean!) {
      createTask(
        input: {
          id: $id, title: $title, completed: $completed
        }
      ) {
        id
        title
        completed
      }
    }
    `
const taskDetails = {
      id: uuidV4(),
      title: taskTitle,
      completed: false
    }
const newTask = await API.graphql(graphqlOperation(createTask, taskDetails))
    return newTask
  },
  async updateTask(taskDetails) {
    const updateTask = `
    mutation updateTask($id: ID!, $title: String!, $completed: Boolean!) {
      updateTask(
        input: {
          id: $id
          title: $title
          completed: $completed
        }
      ) {
        id
        title
        completed
      }
    }
    `
const updatedTask = await API.graphql(graphqlOperation(updateTask, taskDetails))
    return updatedTask
  },
  async deleteTask(taskId) {
    const deleteTask = `
    mutation deleteTask($id: ID!) {
      deleteTask(
        input: {
          id: $id
        }
      ) {
        id
      }
    }
    `
const taskDetails = {
      id: taskId
    }
return API.graphql(graphqlOperation(deleteTask, taskDetails))
  }
}
