<script setup>

</script>

<template>
    <form>
        <input type="text" id="userInput" v-model="formValues.userInput">
        <button type="submit">Buscar</button>
    </form>
</template>

<script>
export default {
    name: "SearchForm",
    data() {
        return {
            formValues: {
                userInput: ""
            }
        }
    }
}
</script>