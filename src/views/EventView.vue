<template>
    <section v-if="event">
        <h1>
        {{ event.name }}
        </h1>
        <img v-if="event.images" :src="event.images[0].url">
        <img v-if="event.seatmap" :src="event.seatmap.staticUrl">
        <p v-if="!event.dates.start.dateTBD && !event.dates.start.dateTBA">Fecha del evento: {{ event.dates.start.localDate }}</p>
        <p v-if="event._embedded.venues">En: {{ event._embedded.venues[0].country.name }}, {{ event._embedded.venues[0].city.name }}</p>
        <p v-if="event.info">{{ event.info }}</p>
        <button v-if="event.seatmap">Ver mapa del recinto</button>
        <a v-if="event.url" :href="event.url" target="_blank">Comprar entradas</a>
    </section>  
</template>

<script>
    export default {
        data() {
            return {
                event: null
            }
        },
        props: {
            id: {type: String, required: true}
        },
        async created() {
                const data = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${this.id}.json?apikey=S1sDAS05dZI5JmtvdarQaZN5tFxkOUpr`)
                const result = await data.json()
                this.event = result
        }
    }
</script>