<template>
    <section>
        <form @submit.prevent="register">
            <label for="formName">Nickname</label>
            <input type="text" v-model="formName" id="formName">
            <label for="formEmail">Email</label>
            <input type="text" v-model="formEmail" id="formEmail">
            <label for="formPassword">Contraseña</label>
            <input type="password" v-model="formPassword" id="formPassword">
            <button @submit="register">Registrarse</button>
        </form>
    </section>
</template>

<script>
    import {useCookies} from '@vueuse/integrations/useCookies'
    const cookies = useCookies(["token"])
    export default {
        data() {
            return {
                formName: "",
                formEmail: "",
                formPassword: ""
            }
        },
        methods: {
            async register() {
                const data = await fetch('http://localhost:8000/api/register', {
                    method: "post",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.formName,
                        email: this.formEmail,
                        password: this.formPassword,
                    })
                })
                const response = await data.json()
                cookies.set("token", response.token, 1)
                this.$router.push("/profile")
            }
        }
    }
</script>