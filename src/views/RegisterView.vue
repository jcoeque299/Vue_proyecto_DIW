<template>
    <section class="form__container">
        <h2>Registrarse</h2>
        <form @submit.prevent="register" class="form">
            <fieldset class="form__row">
                <div class="form__column__small">
                    <label for="formName" class="form__label">Nickname</label>
                </div>
                <div class="form__column__big">
                    <input type="text" v-model="formName" id="formName" class="form__input">
                </div>
            </fieldset>
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
                <div class="form__column__small">
                    <label for="formLocation" class="form__label">Ubicacion</label>
                </div>
                <div class="form__column__big">
                    <select v-model="formLocation" id="formLocation" class="form__input">
                        <option v-for="country in countryData" v-bind:value="country.code">{{ country.name }}</option>
                    </select>
                </div>
            </fieldset>
            <fieldset class="form__row">
                <button @submit="register" class="form__button">Registrarse</button>
            </fieldset>
        </form>
    </section>
</template>

<script>
    import {useCookies} from '@vueuse/integrations/useCookies'
    import countryData from "/src/data.json"
    const cookies = useCookies(["token"])
    export default {
        data() {
            return {
                formName: "",
                formEmail: "",
                formPassword: "",
                formLocation: countryData[0].code,
                countryData: countryData
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
                        location: this.formLocation
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