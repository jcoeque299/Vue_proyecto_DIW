<script setup>
    import { RouterLink } from 'vue-router';
</script>

<template>
    <RouterLink to = "/">Inicio</RouterLink>
    <RouterLink to = "/search">Buscar</RouterLink>
    <RouterLink to = "/contact">Soporte</RouterLink>
    <RouterLink v-if="!token" :key="token" to = "/login">Iniciar sesion</RouterLink>
    <RouterLink v-if="!token" :key="token" to = "/register">Registrarse</RouterLink>
    <RouterLink v-if="token" :key="token" to = "/profile">Perfil</RouterLink>
    <button v-if="token" :key="token" @click="logout">Logout</button>
</template>

<script>
    import {useCookies} from '@vueuse/integrations/useCookies'
    const cookies = useCookies(["token"])
    export default {
        data() {
            return {
                token: cookies.get("token")
            }

        },
        mounted() {
            cookies.addChangeListener(() => {
                this.token = cookies.get("token")
                if (this.token === undefined) {
                    this.$router.push("/")
                }
            })
        },
        methods: {
            async logout() {
                    const data = await fetch('http://localhost:8000/api/logout', {
                    method: "post",
                    headers: {
                        'Authorization': 'Bearer ' + cookies.get("token")
                    }
                })
                if (data.ok) {
                    cookies.remove("token")
                }
            }
        }
    }
    
</script>