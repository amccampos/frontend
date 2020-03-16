<template>
    <div>
        <h2>Results</h2>
        <ul>
            <li v-for="a in answers" :key="a">{{ a }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Results',
    props: ['answers']
}
</script>

<style>

</style>