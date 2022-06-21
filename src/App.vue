<template>
  
    <h1>To-Do List</h1>
    <ul>
      <li v-for="item in ToDoItems" :key="item.id">
        <ToDoItem label="item.label" :done="item.done"></ToDoItem>
      </li>
    </ul>
    
</template>

<script>
import ToDoItem from './components/ToDoItem.vue';
import uniqueId from 'lodash.uniqueid';

export default {
  name: 'App',
  components:{
    ToDoItem
  },
  data(){
    return{
      ToDoItems:[
        { id: uniqueId('todo-'), label: 'Learn Vue', done: false },
        { id: uniqueId('todo-'), label: 'Create a Vue project with the CLI', done: true },
        { id: uniqueId('todo-'), label: 'Have fun', done: true },
        { id: uniqueId('todo-'), label: 'Create a to-do list', done: false }
      ]
    }
  }
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