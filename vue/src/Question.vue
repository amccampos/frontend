<template>
    <div>
        <h2>{{ statement }}</h2>
        <button v-for="opt in options" :key="opt" @click="selected(opt)">{{ opt }}</button>
    </div>
</template>

<script>
export default {
    name: 'Question',
    props: ['statement', 'options'],
    methods: {
        selected: function(option) {
            console.log('você clicou em ', option);
            this.$emit('selection', option)
        }
    }
}
</script>

<style>

</style>