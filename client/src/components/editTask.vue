<template>
    
    <div>
        <navbar
            @mainPage="mainPage"
            @logOutUser="logOutUser"
            @addTaskForm="addTaskForm"
        ></navbar>
        <!--  NAVBAR DIATAS  -->
        <div class="text-center m-5 title-form">
            <h1>Edit Task</h1>
        </div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="card p-4">
                    <form class="mb-3" v-on:submit.prevent="editData">
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" class="form-control" v-model="edit_title" >
                        </div>
                        <div class="form-group">
                            <label>Category</label>
                            <select v-model="edit_category" class="custom-select mr-sm-2">
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
const base_url = 'http://localhost:3000'

export default {
    components: {
        navbar
    },
    props: ['editId'],
    data(){
        return {
            edit_title: '',
            edit_category: ''
        }
    },
    created() {
        axios({
            method: 'GET',
            url: base_url + `/tasks/${this.editId}`,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .then(({ data }) => {
            this.edit_title = data.title
            this.edit_category = data.category
        }).catch(err => {
            this.$emit('showError', err)
        })
    },
    methods: {
        editData() {
            let obj = {
                title: this.edit_title,
                category: this.edit_category
            }
            axios({
                method: 'PUT',
                url: base_url + `/tasks/${this.editId}`,
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data: obj
            })
            .then(() => {
                this.$emit('changePage', 'main')
            }).catch(err => {
                this.$emit('showError', err)
            })
        },
        mainPage() {
            this.$emit('changePage', 'main')
        },
        logOutUser() {
            this.$emit('logOutUser', 'login')
        },
        addTaskForm() {
            this.$emit('changePage', 'createTask')
        },
    }
}
</script>