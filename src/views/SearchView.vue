<template>

    <!--SearchForm.vue-->

    <section class="form__container">
        <form @submit.prevent="searchEvents">
            <fieldset class="form__row">
                <div class="form__column__small">
                    <label for="eventQuery" class="form__label">Evento</label>
                </div>
                <div class="form__column_big">
                    <input type="text" id="eventQuery" name="eventQuery" v-model="eventQuery" placeholder="Cualquiera" class="form__input">
                </div>
            </fieldset>
            <fieldset class="form__row">
                <div class="form__column__small">
                    <label for="eventCountry" class="form__label">Pais</label>
                </div>
                <div class="form__column_big">
                    <select id="eventCountry" name="eventCountry" v-model="eventCountry" class="form__input">
                        <option value="" selected>-Cualquiera-</option>
                        <option v-for="country in countryData" v-bind:value="country.code">{{ country.name }}</option>
                    </select>
                </div>
            </fieldset>
            <fieldset class="form__row">
                <div class="form__column__small">
                    <label for="eventType" class="form__label">Tipo de evento</label>
                </div>
                <div class="form__column_big">
                    <select id="eventType" name="eventType" v-model="eventType" class="form__input">
                        <option value="" selected>-Cualquiera-</option>
                        <option value="Sports">Deportes</option>
                        <option value="Music">Música</option>
                        <option value="Arts & Theatre">Artes y teatro</option>
                        <option value="Film">Cine</option>
                        <option value="Merchandise">Merchandising</option>
                        <option value="Donation">Donaciones</option>
                    </select>
                </div>
            </fieldset>
            <fieldset class="form__row">
                <div class="form__column__small">
                    <label for="eventDate" class="form__label">Fecha</label>
                </div>
                <div class="form__column_big">
                    <input type="date" id="eventDate" name="eventDate" v-model="eventDate" class="form__input">
                </div>
            </fieldset>
            <fieldset class="form__row">
                <button type="button" v-on:click="searchEvents" class="form__button">Buscar</button>
            </fieldset>
        </form>
    </section>

    <!--EventResults.vue-->

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
    <section v-else-if="events === false">
        <h2>No hay resultados</h2>
    </section>
    
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
                this.events = false
            },
        }
    }
</script>