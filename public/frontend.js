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
        }
    }
}) 