<template>
    <section v-if = "eventRecomendations && user" class="event__card__container">
        <h2>Eventos en {{ this.user.locationName }}</h2>
        <article class="event__card" v-for="event in eventRecomendations" :key="event.id">
            <router-link  :to="{name: 'event', params: {id: event.id}}">
                <img v-if="event.images" :src="event.images[0].url">
                <div class="event__card__content">
                    <h3>
                        {{ event.name }}
                    </h3>
                    <p v-if="!event.dates.start.dateTBD && !event.dates.start.dateTBA">{{ event.dates.start.localDate }}</p>
                    <p v-if=" event._embedded && event._embedded.venues">{{ event._embedded.venues[0].city.name }}</p>  
                </div>
            </router-link> 
        </article>
        
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
                const data = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${this.user.location}&apikey=S1sDAS05dZI5JmtvdarQaZN5tFxkOUpr&size=5`)
                const results = await data.json()
                if (results._embedded) {
                    this.eventRecomendations = results._embedded.events
                    console.log(this.eventRecomendations)
                    return
                }
                this.eventRecomendations = null
            }
        }
    }
</script>