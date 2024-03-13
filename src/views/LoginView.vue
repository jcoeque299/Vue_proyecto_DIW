<template>
    <section>
        <form @submit.prevent="login">
            <label for="formEmail">Email</label>
            <input type="text" v-model="formEmail" id="formEmail">
            <label for="formPassword">Contraseña</label>
            <input type="password" v-model="formPassword" id="formPassword">
            <button @submit="login">Login</button>
        </form>
    </section>
</template>

<script>
    import Cookies from "js-cookie"
    export default {
        data() {
            return {
                formEmail: "",
                formPassword: ""
            }
        },
        methods: {
            async login() {
                    console.log(this.formEmail, this.formPassword)
                    const data = await fetch('http://localhost:8000/api/login', {
                    method: "post",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.formEmail,
                        password: this.formPassword,
                    })
                })
                const response = await data.json()
                window.user = response.token
                Cookies.set("token", response.token, {expires: 1, SameSite: "strict"})
                this.$router.push("/profile")
            }
        }
    }
</script>