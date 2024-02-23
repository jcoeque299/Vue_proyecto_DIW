<template>
    <p>Search</p>
    <form @submit.prevent="searchEvents">
        <label for="eventQuery">Evento</label>
        <input type="text" id="eventQuery" name="eventQuery" v-model="eventQuery">
        <label for="eventCountry">Codigo de pais</label>
        <select id="eventCountry" name="eventCountry" v-model="eventCountry">
            <option v-for="country in countryData" v-bind:value="country.code">{{ country.name }}</option>
        </select>
        <button type="button" v-on:click="searchEvents">Buscar</button>
    </form>
    <ul v-if="events">
        <li v-for="event in events" :key="event.id">
        {{ event.name }}
        </li>
    </ul>
    <p v-else>No hay resultados</p>
</template>

<script>
    import countryData from "/src/data.json"
    export default {
        data() {
            return {
                events: null,
                eventQuery: "",
                eventCountry: "",
                countryData: countryData
            }
        },
        methods: {
            async searchEvents() {
                const data = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${eventQuery.value}&countryCode=${eventCountry.value}&apikey=S1sDAS05dZI5JmtvdarQaZN5tFxkOUpr`)
                const results = await data.json()
                if (results._embedded) {
                    this.events = results._embedded.events
                }
            },
        }
    }
    // const searchEvents = async(searchData) => {
    //     const data = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${searchData}&apikey=S1sDAS05dZI5JmtvdarQaZN5tFxkOUpr`)
    //     let events = await data.json()
    //     results = events
    //     console.log(results)
    // }

</script>