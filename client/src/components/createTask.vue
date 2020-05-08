<template>

    <div>
        <navbar
            @mainPage="mainPage"
            @logOutUser="logOutUser"
            @addTaskForm="addTaskForm"
        ></navbar>
        <!--  NAVBAR DIATAS  -->
        <div class="text-center m-5 title-form">
            <h1>Create A New Task</h1>
        </div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="card p-4">
                    <form class="mb-3" v-on:submit.prevent="createTask">
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" class="form-control" v-model="task_title" >
                        </div>
                        <div class="form-group">
                            <label>Category</label>
                            <select v-model="task_category" class="custom-select mr-sm-2">
                                <option value="back-log">Back-Log</option>
                                <option value="to-do">To-Do</option>
                                <option value="done">Done</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <button class="btn btn-danger" v-on:click.prevent="mainPage">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios'
import navbar from './navbar.vue'
const base_url = 'https://nameless-hollows-14961.herokuapp.com'

export default {
    components: {
        navbar
    },
    data() {
        return {
            task_title: '',
            task_category: 'Back-Log'
        }
    },
    methods: {
        createTask() {
            let obj = {
                title: this.task_title,
                category: this.task_category
            };
            axios({
                method: 'POST',
                url: base_url + '/tasks',
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data: obj
            })
            .then(() => {
                this.$emit('changePage', 'main')
            }).catch(err => {
                this.$emit('showError', err)
            });
        },
        mainPage() {
            this.$emit('changePage', 'main')
        },
        logOutUser() {
            this.$emit('logOutUser', 'login')
        },
        addTaskForm() {
            this.$emit('changePage', 'createTask')
        }
    }
}
</script>