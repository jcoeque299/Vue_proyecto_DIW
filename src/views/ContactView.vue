<template>
    <section class="form__container">
        <h2>Enviar ticket a soporte</h2>
        <form @submit.prevent="sendTicket">
            <fieldset class="form__row">
                <div class="form__column__small">
                    <label for="formEmail" class="form__label">Email de contacto</label>
                </div>
                <div class="form__column__big">
                    <input type="text" v-model="formEmail" id="formEmail" class="form__input">
                </div>
            </fieldset>
            <fieldset class="form__row">
                <div class="form__column__small">
                    <label for="formText" class="form__label">Describa su problema</label>
                </div>
                <div class="form__column__big">
                    <textarea v-model="formText" id="formText" class="form__input"></textarea>
                </div>
            </fieldset>
            <fieldset class="form__row">
                <button @submit="sendTicket" class="form__button">Enviar</button>
            </fieldset>
        </form>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                formEmail: "",
                formText: ""
            }
        },
        methods: {
            async sendTicket() {
                const data = await fetch('http://localhost:8000/api/tickets', {
                    method: "post",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contactEmail: this.formEmail,
                        text: this.formText,
                    })
                })
                const response = await data.json()
                this.$router.push("/")
            }
        }
    }
</script>