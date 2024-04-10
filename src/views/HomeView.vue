<template>
    <section v-if = "eventRecomendations && user">
        <ul>
            <router-link v-for="event in eventRecomendations" :key="event.id" :to="{name: 'event', params: {id: event.id}}">
                <li>
                    {{ event.name }}
                </li>
            </router-link>
        </ul>
    </section>
    
</template>

<script>
    import {useCookies} from '@vueuse/integrations/useCookies'
    import countryData from "/src/data.json"
    const cookies = useCookies(["token"])
    export default {
        data() {
            return {
                user: null,
                countryData: countryData,
                eventRecomendations: null
            }
        },
        async created() {
            const data = await fetch("http://localhost:8000/api/user", {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + cookies.get("token")
            }})
            const response = await data.json()
            if (response.message) {
                cookies.remove("token", {path:"/"})
                this.$router.push("/")
                return
            }
            this.user = response
            this.user.locationName = countryData.find(country => country.code === this.user.location).name
            if (this.user) {
                const data = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${this.user.location}&apikey=S1sDAS05dZI5JmtvdarQaZN5tFxkOUpr&size=3`)
                const results = await data.json()
                if (results._embedded) {
                    this.eventRecomendations = results._embedded.events
                    return
                }
                this.eventRecomendations = null
            }
        }
    }
</script>