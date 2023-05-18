new Vue({
    el: '#app',
    data() {
        return {
            tasks: [],
            newTask: {
                title: '',
                description: '',
            },
            editTask: {
                id: '',
                title: '',
                description: '',
            },
        }
    },
    created() {
        this.loadTasks()
    },
    methods: {
        async loadTasks() {
            try {
                const response = await fetch('/api/tasks')
                if (response.ok) {
                    const data = await response.json()
                    this.tasks = data
                } else {
                    console.log('Error al cargar tareas')
                }
            } catch (error) {
                console.error(error)
            }
        },
        async addTask() {
            if (this.newTask.title.trim() === '' || this.newTask.description.trim() === '') {
                return
            }
            const task = {
                title: this.newTask.title,
                description: this.newTask.description,
            }
            try {
                const response = await fetch('/api/task', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(task)
                })
                if (response.ok) {
                    const data = await response.json()
                    this.tasks.push(data)
                    this.newTask.title = this.newTask.description = ''
                } else {
                    console.log('Error al crear tarea')
                }
            } catch (error) {
                console.error(error)
            }
        },
        async deleteTask(taskId) {
            try {
                const response = await fetch(`/api/task/${taskId}`, {
                    method: 'DELETE',
                })
                if (response.ok) {
                    this.tasks = this.tasks.filter(task => task._id !== taskId)
                } else {
                    console.log('Error al eliminar tarea')
                }
            } catch (error) {
                console.error(error)
            }
        },
        async editTaskModal(task) {
            this.editTask = {
                id: task._id,
                title: task.title,
                description: task.description,
            }
        },
        async updateTask() {
            try {
                const { id, title, description } = this.editTask
                const response = await fetch(`/api/task/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, description })
                })
                const data = await response.json()
                const index = this.tasks.findIndex(task => task._id === id)
                this.tasks.splice(index, 1, data)
                this.editTask = { id: '', title: '', description: '' }
            } catch (error) {
                console.error(error)
            }
        }
    }
}) 