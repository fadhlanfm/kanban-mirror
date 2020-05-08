<template>
<div>
    <!--LOGIN-->
    
    <login 
        v-if="page === 'login'"
        @changePage="changePage"
        @loginUser="loginUser"
        @showError="showError"
    ></login>

    <!--REGISTER-->

    <register
        v-if="page === 'register'"
        @changePage="changePage"
        @showError="showError"
    ></register>

    <!--MAIN PAGE-->
    
    <mainPage v-if="page === 'main'"
        @changePage="changePage"
        @showError="showError"
        @logOutUser="logOutUser"
        @editDataForm="editDataForm"
    ></mainPage>

    <!-- EDIT TASK -->

    <editTask
        v-if="page === 'editTask'"
        :editId="editId"
        @changePage="changePage"
        @showError="showError"
        @logOutUser="logOutUser"
    ></editTask>

    <!--CREATE TASK-->

    <createTask
        v-if="page === 'createTask'"
        @changePage="changePage"
        @logOutUser="logOutUser"
        @showError="showError"
    ></createTask>

</div>


</template>


<script>
import Vue from 'vue'
import axios from 'axios'
import login from './components/login.vue'
import register from './components/register.vue'
import mainPage from './components/main.vue'
import createTask from './components/createTask.vue'
import editTask from './components/editTask.vue'

export default {
    name: 'App',
    components: {
        login,
        register,
        mainPage,
        createTask,
        editTask
    },
    data() {
        return {
            page:'login',
            editId: null
        }
    },
    created() {
        if (localStorage.getItem('access_token')) {
            this.page = 'main';
        }
    },
    methods: {
        changePage(page) {
            this.page = page
        },
        loginUser(data){
            localStorage.setItem('access_token', data.access_token)
            this.page = 'main'
            console.log(data)
        },
        logOutUser(page) {
            this.$gAuth.signOut()
            this.page = page
            localStorage.removeItem('access_token')
        },
        editDataForm(id){
            this.editId = id
            this.page = 'editTask'
        },
        showError(err) {
            console.log(err)
        }
    }
}
</script>