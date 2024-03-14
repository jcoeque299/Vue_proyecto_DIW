<template>
    <h1>Perfil</h1>
    <section v-if="user">
        <p>{{ user.name }}</p>
        <p>{{ user.email }}</p>
    </section>
</template>

<script>
    import {useCookies} from '@vueuse/integrations/useCookies'
    const cookies = useCookies(["token"])

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
                'Authorization': 'Bearer ' + cookies.get("token")
            }})
            const response = await data.json()
            if (response.message) {
                cookies.remove("token", {path:"/"})
                this.$router.push("/")
                return
            }
            this.user = response
        }
    }
</script>