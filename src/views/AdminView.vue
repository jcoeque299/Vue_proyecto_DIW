<template>
    <article v-for="ticket in tickets">
        <p>{{ ticket.contactEmail }}</p>
        <p>{{ ticket.text }}</p>
    </article>
</template>

<script>
    import {useCookies} from '@vueuse/integrations/useCookies'
    const cookies = useCookies(["token"])
    export default {
        data() {
            return {
                tickets: null
            }
        },
        async created() {
            const data = await fetch("http://localhost:8000/api/tickets", {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + cookies.get("token")
            }})
            if(data.status === 403) {
                this.tickets = "Acceso no autorizado"
                return
            }
            this.tickets = await data.json()
        }
    }
</script>