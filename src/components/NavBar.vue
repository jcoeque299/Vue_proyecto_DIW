<script setup>
    import { RouterLink } from 'vue-router';
</script>

<template>
    <RouterLink to = "/">Inicio</RouterLink>
    <RouterLink to = "/search">Buscar</RouterLink>
    <RouterLink to = "/contact">Soporte</RouterLink>
    <RouterLink v-if="!token" to = "/login">Iniciar sesion</RouterLink>
    <RouterLink v-if="!token" to = "/register">Registrarse</RouterLink>
    <RouterLink v-if="token" to = "/profile">Perfil</RouterLink>
</template>

<script>
    import {useCookies} from '@vueuse/integrations/useCookies'
    import { ref } from 'vue';
    const cookies = useCookies(["token"])
    cookies.addChangeListener()
    const token = cookies.get("token")
</script>