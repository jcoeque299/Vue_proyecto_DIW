<script setup>
    import { RouterLink } from 'vue-router';
</script>

<template>
    <ul class="navbar">
        <li class="logo"><img src=""></li>
        <input type="checkbox" id="check">
        <span class="menu">
            <li><RouterLink to = "/">Inicio</RouterLink></li>
            <li><RouterLink to = "/search">Buscar</RouterLink></li>
            <li><RouterLink to = "/contact">Soporte</RouterLink></li>
            <li v-if="!token" :key="token"><RouterLink to = "/login">Iniciar sesion</RouterLink></li>
            <li v-if="!token" :key="token"><RouterLink to = "/register">Registrarse</RouterLink></li>
            <li v-if="token" :key="token"><RouterLink to = "/profile">Perfil</RouterLink></li>
            <li v-if="token" :key="token"><RouterLink to = "/watched">Guardados</RouterLink></li>
            <li v-if="adminView === 'admin'" :key="adminView"><RouterLink to = "/admin">Administracion</RouterLink></li>
            <li v-if="token" :key="token"><a @click="logout">Logout</a></li>
            <label for="check" class="menu--close"><i class="fas fa-times"></i></label>
        </span>
        <label for="check" class="menu--open"><i class="fas fa-bars"></i></label>
    </ul>
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