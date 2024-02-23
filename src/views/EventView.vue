<template>
    <p v-if="event">{{ event.name }}</p>
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
                console.log(result)
                this.event = result
        }
    }
</script>