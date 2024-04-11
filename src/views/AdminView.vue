<template>
    <section >
        <article v-if="tickets" v-for="ticket in tickets">
            <p>{{ ticket.contactEmail }}</p>
            <p>{{ ticket.text }}</p>
        </article>
        <article v-else-if="tickets === false">
            <p>Acceso no autorizado</p>
        </article>
    </section>
    
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
            if(data.status === 200) {
                this.tickets = await data.json()
            }
            else {
                this.tickets = false
            }
        }
    }
</script>