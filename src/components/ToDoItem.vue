<template>
<!--. v-ifThe block will only be rendered if the directive's expression returns a truthy value.
v-if is "real" conditional rendering because it ensures that event listeners and child components inside the conditional block are properly destroyed and re-created during toggles.
The difference is that an element with v-show will always be rendered and remain in the DOM; v-show only toggles the display CSS property of the element.
v-if is also lazy: if the condition is false on initial render, it will not do anything
v-show doesn't support the <template> element, nor does it work with v-else.
  v-if has higher toggle costs while v-show has higher initial render costs. So prefer v-show if you need to toggle something very often, and 
  prefer v-if if the condition is unlikely to change at runtime.-->
<div class="stack-small" v-if="!isEditing">
<div class="custom-checkbox">
    <input type="checkbox" class="checkbox" :id="id" :checked= "isDone" @change="$emit('checkbox-changed')" />
   <label :for = "id" class="checkbox-label">{{label}}</label>
</div>
<div class="btn-group">
    <button type="button" class="btn" @click="toggleToItemEditForm">Edit
        <span class="visually-hidden">{{label}}</span>
    </button>
    <button type="button" class="btn btn__danger" @click="deleteToDo">
        Delete <span class="visually-hidden">{{label}}</span>
     </button>
</div>

</div>
<to-do-item-edit-form v-else :id="id" :label="label" @item-edited="itemEdited"
                      @edit-cancelled="editCancelled" ></to-do-item-edit-form>
<!--{{}}lets us print the result of JavaScript expressions defined in our class, inside our template, including values and methods-->
<!--Vue has a special syntax to bind JavaScript expressions to HTML elements and components: v-bind:attribute="expression"-->
</template>


<script>
//To acheive component state and make things dyanamic like to set the label text for to-do-item ,register the props
/*The first way is to just list props out as an array of strings. Each entry in the array corresponds to the name of a prop.
*The second way is to define props as an object, with each key corresponding to the prop name. 
*Listing props as an object allows you to specify default values, mark props as required, perform basic object typing (specifically around JavaScript primitive types)
perform simple prop validation.*/
 import ToDoItemEditForm from "./ToDoItemEditForm";                                                                                                                                                                   

export default{

    name:"ToDoItem",
    //With these props defined inside the component object, we can now use these variable values inside our template. 
    /**bind the component's done prop to the checked attribute on the <input> element, so that it can serve as a record of whether the checkbox is checked or not.
     * props serve as one-way data binding — a component should never alter the value of its own props. 
     *components editing props can make debugging a challenge*
     * changing props can cause components to re-render.*/
    components: {
        ToDoItemEditForm
    },
    props: {
        label: { required:true, type: String},
        done: { default: false,type: Boolean},
        id: { required: true, type: String}
    },
    // The data property is where you can manage local state in a component,to declare reactive state of a component
    /**the data property is a function.
     *  This is to keep the data values unique for each instance of a component at runtime — the function is invoked separately for each component instance.
     *   If you declared data as just an object, all instances of that component would share the same values.  */
    data(){
        return{
            //this to access a component's props
            //this works in arrow functions (binding to the parent's context), you wouldn't be able to access any of the necessary attributes from inside data if you used an arrow function. 
            //So don't use an arrow function for the data property
           
            isEditing: false
        };
    },
    methods:{
        deleteToDo(){
            this.$emit('item-deleted');
        
        },
        toggleToItemEditForm(){
            this.isEditing = true;
        },
        itemEdited(newLabel) {
            this.$emit('item-edited', newLabel);
            this.isEditing = false;
        },
        editCancelled() {
         this.isEditing = false;
        }
        

    },
    computed:{
// advantage of computed properties is that they preserve reactivity, meaning (among other things) that their state is saved when the template changes
     isDone() {
        return this.done;
     }
    }
    

    /**Vue binds all of its attributes like props , data,methods directly to its instance 
     * keep the keys unique across these attributes.
    */
};
</script>
<style scoped>
.custom-checkbox > .checkbox-label {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 400;
  font-size: 16px;
  font-size: 1rem;
  line-height: 1.25;
  color: #0b0c0c;
  display: block;
  margin-bottom: 5px;
}
.custom-checkbox > .checkbox {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 400;
  font-size: 16px;
  font-size: 1rem;
  line-height: 1.25;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  height: 2.5rem;
  margin-top: 0;
  padding: 5px;
  border: 2px solid #0b0c0c;
  border-radius: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.custom-checkbox > input:focus {
  outline: 3px dashed #fd0;
  outline-offset: 0;
  box-shadow: inset 0 0 0 2px;
}
.custom-checkbox {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.25;
  display: block;
  position: relative;
  min-height: 40px;
  margin-bottom: 10px;
  padding-left: 40px;
  clear: left;
}
.custom-checkbox > input[type="checkbox"] {
  -webkit-font-smoothing: antialiased;
  cursor: pointer;
  position: absolute;
  z-index: 1;
  top: -2px;
  left: -2px;
  width: 44px;
  height: 44px;
  margin: 0;
  opacity: 0;
}
.custom-checkbox > .checkbox-label {
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  display: inline-block;
  margin-bottom: 0;
  padding: 8px 15px 5px;
  cursor: pointer;
  touch-action: manipulation;
}
.custom-checkbox > label::before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border: 2px solid currentcolor;
  background: transparent;
}
.custom-checkbox > input[type="checkbox"]:focus + label::before {
  border-width: 4px;
  outline: 3px dashed #228bec;
}
.custom-checkbox > label::after {
  box-sizing: content-box;
  content: "";
  position: absolute;
  top: 11px;
  left: 9px;
  width: 18px;
  height: 7px;
  transform: rotate(-45deg);
  border: solid;
  border-width: 0 0 5px 5px;
  border-top-color: transparent;
  opacity: 0;
  background: transparent;
}
.custom-checkbox > input[type="checkbox"]:checked + label::after {
  opacity: 1;
}
@media only screen and (min-width: 40rem) {
  label,
  input,
  .custom-checkbox {
    font-size: 19px;
    font-size: 1.9rem;
    line-height: 1.31579;
  }
}

</style>