<template>
    <h1>Perfil</h1>
    <section v-if="user">
        <p>{{ user.name }}</p>
        <p>{{ user.email }}</p>
    </section>
</template>

<script>
    import Cookies from "js-cookie"
    export default {
        data() {
            return {
                user: null
            };
        },
        async created() {
            const data = await fetch("http://localhost:8000/api/user", {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + Cookies.get("token")
            }})
            const response = await data.json()
            this.user = response
            this.$router.push("/profile")
        }
    }
</script>