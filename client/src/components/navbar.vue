<template>
    <div id="navbar-page">
        <nav class="navbar navbar-expand-sm navbar-expand-xs navbar-light bg-dark mb-3">
            <a class="navbar-brand text-light" v-on:click.prevent="mainPage" href="">Kanban App</a>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="btn btn-primary mr-2" href="" v-on:click.prevent="addTaskForm"><i class="fas fa-plus"></i> Task</a>
                    </li>
                </ul>
            </div>
            <button class="btn btn-primary" v-on:click.prevent="logOutUser"><i class="fas fa-sign-out-alt"></i> Sign Out</button>
        </nav>
    </div>
</template>

<script>
export default {
    methods: {
        mainPage() {
            this.$emit('mainPage')
        },
        logOutUser() {
            this.$emit('logOutUser', 'login')
        },
        addTaskForm() {
            this.$emit('addTaskForm', 'createTask')
        }
    }
}
</script>