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
    <RouterLink v-if="token" :key="token" to = "/watched">Guardados</RouterLink>
    <RouterLink v-if="adminView === 'admin'" :key="adminView" to = "/admin">Administracion</RouterLink>
    <button v-if="token" :key="token" @click="logout">Logout</button>
</template>

<script>
    import {useCookies} from '@vueuse/integrations/useCookies'
    const cookies = useCookies(["token"])
    export default {
        data() {
            return {
                token: cookies.get("token"),
                adminView: null
            }

        },
        mounted() {
            this.checkRole()
            cookies.addChangeListener(() => {
                this.token = cookies.get("token")
                this.checkRole()
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
                    cookies.remove("token", {path:"/"})
                    this.$router.push("/")
                }
            },
            async checkRole() {
                if (this.token) {
                    const data = await fetch('http://localhost:8000/api/user/role', {
                        headers: {
                            'Authorization': 'Bearer ' + cookies.get("token")
                        },
                    })
                    const response = await data.json()
                    this.adminView = response.role
                    return
                }
                this.adminView = null
            }
        }
    }
    
</script>