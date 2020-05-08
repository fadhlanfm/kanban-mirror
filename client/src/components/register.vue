<template>

<div>
    <div class="text-center m-5 title-form">
        <h1>Welcome to the Kanban App</h1>
        <small>For your better project scheduling management</small>
    </div>
    <div class="container">
        <div class="row justify-content-center">
            <div class="card p-5">
                <h5 class="card-title text-center">Sign Up</h5>
                <form class="mb-3" v-on:submit.prevent="registerUser">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-control" v-model="register_email" >
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" v-model="register_password" >
                    </div>
                    <button type="submit" class="btn btn-primary">Sign Up</button>
                </form>
                <div class="card-footer">
                    <a href="" @click.prevent="loginForm">Already have an account?</a>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import Vue from 'vue'
import axios from 'axios'
const base_url = 'http://localhost:3000'


export default Vue.extend({
    data() {
        return {
            register_email: '',
            register_password: '',
            register_password_confirm: ''
        }
    },
    methods: {
        loginForm() {
            this.$emit('changePage', 'login')
        },
        registerUser() {
            let obj = {
                email: this.register_email,
                password: this.register_password
            }
            axios({
                method: 'POST',
                url: base_url + '/signup',
                data: obj
            })
            .then(() => {
                this.$emit('changePage', 'login')
            }).catch(err => {
                this.$emit('showError', err)
            })
        }
    }
})
</script>