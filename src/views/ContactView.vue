<template>
    <section>
        <form @submit.prevent="sendTicket">
            <label for="formEmail">Email de contacto</label>
            <input type="text" v-model="formEmail" id="formEmail">
            <label for="formText">Describa su problema</label>
            <textarea v-model="formText" id="formText"></textarea>
            <button @submit="sendTicket">Enviar</button>
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
                console.log(response)
            }
        }
    }
</script>