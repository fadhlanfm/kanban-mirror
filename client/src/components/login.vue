<template>
<div>
    <div class="text-center m-5 title-form">
        <h1>Welcome to the Kanban App</h1>
        <small>For your better project scheduling management</small>
    </div>
    <div class="container">
        <div class="row justify-content-center">
            <div class="card p-5">
                <h5 class="card-title text-center">Sign In</h5>
                <form class="mb-3" @submit.prevent="loginUser">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-control" v-model="login_email" >
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" v-model="login_password" >
                    </div>
                    <button type="submit" class="btn btn-primary">Sign In</button>
                    </form>
                    <div class="card-footer">
                        Don't have an account?
                        <p><a href="" @click.prevent="signUpForm">Sign Up</a> or <a href="" @click.prevent="onSuccess">Sign In with <i class="fab fa-google"></i></a></p>
                    </div>
            </div>
        </div>
    </div>
</div>

</template>


<script>
import Vue from 'vue'
import axios from 'axios'
import GAuth from 'vue-google-oauth2'
const base_url = 'https://nameless-hollows-14961.herokuapp.com'


export default Vue.extend({
    data() {
        return {
            login_email: '',
            login_password: '',
        }
    },
    methods: {
        onSuccess() {
            this.$gAuth.signIn()
            .then(googleUser => {
                let token = googleUser.getAuthResponse().id_token
                this.onSignIn(token)
            }).catch( err => {
                console.log(err)
            })
        },
        onSignIn(token) {
            let obj = { token }
            axios({
                method: 'POST',
                url: base_url + '/googleSignIn',
                data: obj
            })
            .then(({ data }) => {
                this.$emit('loginUser', data)
            }).catch(err => {
                this.$emit('showError', err)
            })
        },
        signUpForm() {
            this.login_email = ''
            this.login_password = ''
            this.$emit('changePage', 'register')
        },
        loginUser() {
            let obj = {
                email: this.login_email,
                password: this.login_password
            }
            axios({
                method: 'POST',
                url: base_url + '/signin',
                data: obj
            })
            .then(({ data }) => {
                this.login_email = ''
                this.login_password = ''
                this.$emit('loginUser', data)
            }).catch(err => {
                this.$emit('showError', err)
            })
        }
    }

})
</script>