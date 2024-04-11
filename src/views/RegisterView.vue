<template>
    <section>
        <form @submit.prevent="register">
            <label for="formName">Nickname</label>
            <input type="text" v-model="formName" id="formName">
            <label for="formEmail">Email</label>
            <input type="text" v-model="formEmail" id="formEmail">
            <label for="formPassword">Contraseña</label>
            <input type="password" v-model="formPassword" id="formPassword">
            <label for="formLocation">Ubicacion</label>
            <select v-model="formLocation" id="formLocation">
                <option v-for="country in countryData" v-bind:value="country.code">{{ country.name }}</option>
            </select>
            <button @submit="register">Registrarse</button>
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