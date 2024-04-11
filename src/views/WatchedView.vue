<template>
    <p>Watched Events</p>
    <article v-for="savedEvent in saved" :key="savedEvent.eventId">
        <router-link :to="{name: 'event', params: {id: savedEvent.eventId}}">
            <li>{{ savedEvent.eventId }}</li>
        </router-link>
        <button @click="deleteSaved(savedEvent.id)">Borrar</button>
    </article>
</template>

<script>
    import {useCookies} from '@vueuse/integrations/useCookies'
    const cookies = useCookies(["token"])
    export default {
        data() {
            return {
                user: null,
                saved: null
            };
        },
        async created() {
            const userData = await fetch("http://localhost:8000/api/user", {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + cookies.get("token")
            }})
            const userResponse = await userData.json()
            if (userResponse.message) {
                cookies.remove("token", {path:"/"})
                this.$router.push("/")
                return
            }
            this.user = userResponse

            this.updateSaved()
        },
        methods: {
            async deleteSaved(eventId) {
                const deleteSaved = await fetch(`http://localhost:8000/api/saved/${eventId}`, {
                method: 'delete',
                headers: {
                    'Authorization': 'Bearer ' + cookies.get("token")
                }})
                this.updateSaved()
            },
            async updateSaved() {
                const savedData = await fetch(`http://localhost:8000/api/saved/${this.user.id}`, {
                method: 'get',
                })
                const savedResponse = await savedData.json()
                this.saved = savedResponse
            }
        }
    }
</script>