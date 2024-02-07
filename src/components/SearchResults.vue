<script setup>
const props = defineProps({
    results: Array
})
</script>

<template>
    <ul>
        <li v-for="result of results" :key="tarea.id"></li>
    </ul>
</template>