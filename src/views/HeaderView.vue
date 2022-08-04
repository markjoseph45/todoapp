<template>
    <div class="">
        <h1 class="text-center">{{ appTitle }}</h1>
    </div>
</template>
<script>
export default {
    name: 'HeaderView',
    data() {
        return {
            title: 'Todo App'
        }
    },
    computed:{
        appTitle: function(str){
            return this.title.toUpperCase()
        }
    }
}
</script>

<style scoped>
    h1{
        font-weight: bold;
    }
</style>