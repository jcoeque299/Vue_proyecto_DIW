<template>
    <section class="form__container">
        <h2>Iniciar sesión</h2>
        <form @submit.prevent="login" class="form">
            <fieldset class="form__row">
                <div class="form__column__small">
                    <label for="formEmail" class="form__label">Email</label>
                </div>
                <div class="form__column__big">
                    <input type="text" v-model="formEmail" id="formEmail" class="form__input">
                </div>
            </fieldset>
            <fieldset class="form__row">
                <div class="form__column__small">
                    <label for="formPassword" class="form__label">Contraseña</label>
                </div>
                <div class="form__column__big">
                    <input type="password" v-model="formPassword" id="formPassword" class="form__input">
                </div>
            </fieldset>
            <fieldset class="form__row">
                <button @submit="login" class="form__button">Login</button>
            </fieldset>
        </form>
    </section>
</template>

<script>
    import {useCookies} from '@vueuse/integrations/useCookies'
    const cookies = useCookies(["token"])

    export default {
        data() {
            return {
                formEmail: "",
                formPassword: ""
            }
        },
        methods: {
            async login() {
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
                if (response.statusCode === 200) {
                    cookies.set("token", response.token, {maxAge: 86400, sameSite: "strict", path:"/"})
                    this.$router.push("/profile")
                }
            }
        }
    }
</script>