<template>
  
    <h1>To-Do List</h1>

</template>

<script>


export default {
  name: 'App'

}
/**When you register a component in this way, you're registering it locally.
 *  Locally registered components can only be used inside the components that register them, so you need to import and register them in every component file that uses them.
 *  This can be useful for bundle splitting/tree shaking since not every page in your app necessarily needs every component. */
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
<!--Using Single File Components, Vue lets you group your templates, corresponding script, and CSS all together in a single file ending in .vue.-->
<!--These files are processed by a JS build tool (such as Webpack), which means you can take advantage of build-time tooling in your project-->