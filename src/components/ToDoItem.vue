<template>
<div>
    <input type="checkbox" :id="id" :checked= "isDone"/>
   <label :for = "id">{{label}}</label>
</div>
<!--{{}}lets us print the result of JavaScript expressions defined in our class, inside our template, including values and methods-->
<!--Vue has a special syntax to bind JavaScript expressions to HTML elements and components: v-bind:attribute="expression"-->
</template>


<script>
//To acheive component state and make things dyanamic like to set the label text for to-do-item ,register the props
/*The first way is to just list props out as an array of strings. Each entry in the array corresponds to the name of a prop.
*The second way is to define props as an object, with each key corresponding to the prop name. 
*Listing props as an object allows you to specify default values, mark props as required, perform basic object typing (specifically around JavaScript primitive types)
perform simple prop validation.*/
                                                                                                                                                                    

export default{

    name:"ToDoItem",
    //With these props defined inside the component object, we can now use these variable values inside our template. 
    /**bind the component's done prop to the checked attribute on the <input> element, so that it can serve as a record of whether the checkbox is checked or not.
     * props serve as one-way data binding — a component should never alter the value of its own props. 
     *components editing props can make debugging a challenge*
     * changing props can cause components to re-render.*/
    props: {
        label: { required:true, type: String},
        done: { default: false,type: Boolean},
        id: { required: true, type: String}
    },
    // The data property is where you can manage local state in a component
    /**the data property is a function.
     *  This is to keep the data values unique for each instance of a component at runtime — the function is invoked separately for each component instance.
     *   If you declared data as just an object, all instances of that component would share the same values.  */
    data(){
        return{
            //this to access a component's props
            //this works in arrow functions (binding to the parent's context), you wouldn't be able to access any of the necessary attributes from inside data if you used an arrow function. 
            //So don't use an arrow function for the data property
            isDone: this.done,
            
        };
    }

    /**Vue binds all of its attributes like props , data,methods directly to its instance 
     * keep the keys unique across these attributes.
    */
};
</script>