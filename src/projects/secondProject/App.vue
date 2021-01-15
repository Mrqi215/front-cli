<template>
    <div id="app">
       <head-title title="第二个项目"/>
    </div>
</template>

<script>

    import HeadTitle from "_c/head-title";
    export default {
        name: 'App',
        components: {
            HeadTitle
        }
    }
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
