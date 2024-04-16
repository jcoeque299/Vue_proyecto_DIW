<template>
    <p>Search</p>
    <form @submit.prevent="searchEvents">
        <label for="eventQuery">Evento</label>
        <input type="text" id="eventQuery" name="eventQuery" v-model="eventQuery" placeholder="Cualquiera">
        <label for="eventCountry">Pais</label>
        <select id="eventCountry" name="eventCountry" v-model="eventCountry">
            <option value="" selected>-Cualquiera-</option>
            <option v-for="country in countryData" v-bind:value="country.code">{{ country.name }}</option>
        </select>
        <label for="eventType">Tipo de evento</label>
        <select id="eventType" name="eventType" v-model="eventType">
            <option value="" selected>-Cualquiera-</option>
            <option value="Sports">Deportes</option>
            <option value="Music">Música</option>
            <option value="Arts & Theatre">Artes y teatro</option>
            <option value="Film">Cine</option>
            <option value="Merchandise">Merchandising</option>
            <option value="Donation">Donaciones</option>
        </select>
        <label for="eventDate">Fecha</label>
        <input type="date" id="eventDate" name="eventDate" v-model="eventDate">
        <button type="button" v-on:click="searchEvents">Buscar</button>
    </form>
    <section v-if="events" class="event__card__container">
        <article class="event__card" v-for="event in events" :key="event.id">
            <router-link  :to="{name: 'event', params: {id: event.id}}">
                <img v-if="event.images" :src="event.images[0].url">
                <div class="event__card__content">
                    <h3>
                        {{ event.name }}
                    </h3>
                    <p v-if="!event.dates.start.dateTBD && !event.dates.start.dateTBA">{{ event.dates.start.localDate }}</p>
                    <p v-if=" event._embedded && event._embedded.venues">{{ event._embedded.venues[0].country.name }}, {{ event._embedded.venues[0].city.name }}</p>
                </div>
            </router-link> 
        </article>
    </section>
    <p v-else>No hay resultados</p>
</template>

<script>
    import countryData from "/src/data.json"
    export default {
        data() {
            return {
                events: null,
                eventType: "",
                eventQuery: "",
                eventCountry: "",
                eventDate: `${new Date().getFullYear()}-01-01`,
                countryData: countryData
            }
        },
        methods: {
            async searchEvents() {
                const data = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${this.eventQuery}&countryCode=${this.eventCountry}&classificationName=${this.eventType}&startDateTime=${this.eventDate}T00:00:00Z&apikey=S1sDAS05dZI5JmtvdarQaZN5tFxkOUpr`)
                const results = await data.json()
                if (results._embedded) {
                    this.events = results._embedded.events
                    return
                }
                this.events = null
            },
        }
    }
</script>