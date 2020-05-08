<template>
<div v-if="task.category === category">
    <div class="card mb-2">
        <div class="card-body">
            <h6 class="card-title">{{ task.title }}</h6>
            <small><p class="card-text"><i class="fas fa-user-alt"></i> {{ task.User.email }}</p></small>
            <small><p class="card-text"><i class="far fa-building"></i> {{ task.User.organization }}</p></small>
            <small><p class="card-text"><i class="far fa-clock"></i> {{ task.User.createdAt.slice(0,10) }}</p></small>
        </div>
        <div class="card-footer text-muted" v-if="task.User.id === this.UserId">
            <a href="" v-on:click.prevent="editDataForm(task.id)" style="color: #ADD8E6"><i class="far fa-edit"></i></a>
            <a href="" v-on:click.prevent="deleteData(task.id)" style="color: #ff4500"><i class="far fa-trash-alt"></i></a>
        </div>
    </div>
</div>
</template>

<script>
import { getUserData } from '../../helpers/token'
export default {
    props: ['task', 'category'],
    data() {
        return {
            UserId: getUserData(localStorage.getItem('access_token')).id
        }
    },
    methods: {
        editDataForm(id) {
            this.$emit('editDataForm', id)
        },
        deleteData(id) {
            this.$emit('deleteData', id)
        }
    }
}
</script>