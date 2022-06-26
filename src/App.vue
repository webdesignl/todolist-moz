<template>
  
    <h1>To-Do List</h1>
    <ToDoFormVue @to-do-added="addToDo"></ToDoFormVue>
    <h2 id="list-summary">{{listSummary}}</h2>
    <ul aria-labelledby="list-summary" class="stack-large">
      <!--Vue is updating a list of elements rendered with v-for, by default it uses an "in-place patch" strategy.
      Vue will patch each element in-place and make sure it reflects what should be rendered at that particular index.
      This default mode is efficient, but only suitable when your list render output does not rely on child component state or temporary DOM state (e.g. form input values)
      .To give Vue a hint so that it can track each node's identity, and thus reuse and reorder existing elements, you need to provide a unique key attribute for each item:
      key here is a special attribute being bound with v-bind. It should not be confused with the property key variable when using v-for with an object.
      -->
      <li v-for="item in ToDoItems" :key="item.id">
        <ToDoItem :label="item.label" :done="item.done" :id="item.id"
         @checkbox-changed="updateDoneStatus(item.id)" @item-deleted="deleteToDo(item.id)" @item-edited="editToDo(item.id,$event)">
        </ToDoItem>
        <!-- $event variable is a special Vue variable used to pass event data to methods-->
      </li>
    </ul>
    
</template>

<script>
import ToDoItem from './components/ToDoItem.vue';


import uniqueId from 'lodash.uniqueid';
import ToDoFormVue from './components/ToDoForm.vue';

export default {
  name: 'App',
  components:{
    ToDoFormVue,
    ToDoItem
  },
  data(){
    return{
      //key binding expects primitive values - i.e. strings and numbers here we use id as key
      ToDoItems:[
        { id: uniqueId('todo-'), label: 'Learn Vue', done: false },
        { id: uniqueId('todo-'), label: 'Create a Vue project with the CLI', done: true },
        { id: uniqueId('todo-'), label: 'Have fun', done: true },
        { id: uniqueId('todo-'), label: 'Create a to-do list', done: false }
      ]
    }
  },
  // a method invocation will always run the function whenever a re-render happens.
  methods:{
    addToDo(toDoLabel) {
      this.ToDoItems.push({id: uniqueId('todo-'),label: toDoLabel,done: false});
    },

    updateDoneStatus(toDoId) {
    const toDoToUpdate = this.ToDoItems.find(item => item.id === toDoId)
    toDoToUpdate.done = !toDoToUpdate.done
    },
    deleteToDo(toDoId) {
      const itemIndex = this.ToDoItems.findIndex(item => item.id === toDoId);
      this.ToDoItems.splice(itemIndex, 1);
    },
    editToDo(toDoId, newLabel) {
      const toDoToEdit = this.ToDoItems.find(item => item.id === toDoId);
      toDoToEdit.label = newLabel;
    }
  },
  //computed properties are cached based on their reactive dependencies. 
  //Computed Properties work similarly to methods, but only re-run when one of their dependencies changes.
  computed: {
    listSummary(){
      const numberOfFinishedItems = this.ToDoItems.filter(item => item.done).length;
      return `${numberOfFinishedItems} out of ${this.ToDoItems.length} items completed`

    },
  // advantage of computed properties is that they preserve reactivity, meaning (among other things) that their state is saved when the template changes
    isDone() {
    return this.done;
    }
  }
}
/**When you register a component in this way, you're registering it locally.
 *  Locally registered components can only be used inside the components that register them, so you need to import and register them in every component file that uses them.
 *  This can be useful for bundle splitting/tree shaking since not every page in your app necessarily needs every component. */
</script>

<style>
/* Global styles */
.btn {
  padding: 0.8rem 1rem 0.7rem;
  border: 0.2rem solid #4d4d4d;
  cursor: pointer;
  text-transform: capitalize;
}
.btn__danger {
  color: #fff;
  background-color: #ca3c3c;
  border-color: #bd2130;
}
.btn__filter {
  border-color: lightgrey;
}
.btn__danger:focus {
  outline-color: #c82333;
}
.btn__primary {
  color: #fff;
  background-color: #000;
}
.btn-group {
  display: flex;
  justify-content: space-between;
}
.btn-group > * {
  flex: 1 1 auto;
}
.btn-group > * + * {
  margin-left: 0.8rem;
}
.label-wrapper {
  margin: 0;
  flex: 0 0 100%;
  text-align: center;
}
[class*="__lg"] {
  display: inline-block;
  width: 100%;
  font-size: 1.9rem;
}
[class*="__lg"]:not(:last-child) {
  margin-bottom: 1rem;
}
@media screen and (min-width: 620px) {
  [class*="__lg"] {
    font-size: 2.4rem;
  }
}
.visually-hidden {
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
}
[class*="stack"] > * {
  margin-top: 0;
  margin-bottom: 0;
}
.stack-small > * + * {
  margin-top: 1.25rem;
}
.stack-large > * + * {
  margin-top: 2.5rem;
}
@media screen and (min-width: 550px) {
  .stack-small > * + * {
    margin-top: 1.4rem;
  }
  .stack-large > * + * {
    margin-top: 2.8rem;
  }
}
/* End global styles */
#app {
  background: #fff;
  margin: 2rem 0 4rem 0;
  padding: 1rem;
  padding-top: 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2.5rem 5rem 0 rgba(0, 0, 0, 0.1);
}
@media screen and (min-width: 550px) {
  #app {
    padding: 4rem;
  }
}
#app > * {
  max-width: 50rem;
  margin-left: auto;
  margin-right: auto;
}
#app > form {
  max-width: 100%;
}
#app h1 {
  display: block;
  min-width: 100%;
  width: 100%;
  text-align: center;
  margin: 0;
  margin-bottom: 1rem;
}
</style>
<!--Using Single File Components, Vue lets you group your templates, corresponding script, and CSS all together in a single file ending in .vue.-->
<!--These files are processed by a JS build tool (such as Webpack), which means you can take advantage of build-time tooling in your project-->