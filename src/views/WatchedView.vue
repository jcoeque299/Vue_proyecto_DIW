<template>
    <p>Watched Events</p>
    <p v-if="saved">{{ saved }}</p>
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

            const savedData = await fetch(`http://localhost:8000/api/saved/${this.user.id}`, {
            method: 'get',
            })
            const savedResponse = await savedData.json()
            this.saved = savedResponse
        }
    }
</script>