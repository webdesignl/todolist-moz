<template>
<div>
    <input type="checkbox" id="to-do-item"/>
   <label for = "to-do-item">{{label}}</label>
</div>
<!--{{}}lets us print the result of JavaScript expressions defined in our class, inside our template, including values and methods-->
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
    props: {
        label: { required:true, type:String},
        done: { default: false,type: Boolean}
    }
};
</script>