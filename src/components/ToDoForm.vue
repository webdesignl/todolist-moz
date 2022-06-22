<template>

<!--Vue has a special directive for event handling: v-on. The v-on directive works via the v-on:event="method"shorthand syntax: @event="method"-->
    <!--When you run this, the app posts the data to the server, causing a refresh. Since processing on the client, there's no server to handle the postback. 
    To prevent the browser from posting to the server, we need to stop the event's default action while bubbling up through the page 
    Vue has a special syntax called event modifiers @event.modifier
    .prevent: Prevents the event's default behavior. Equivalent to Event.preventDefault().-->

<form @submit.prevent="onSubmit">
    <label for="new-todo-input">
        Whats needs to be done?
    </label>
    <!--to attach the value of the new-todo-input <input> field to the label field. Vue has a special directive for this: v-model
      v-model binds to the data property you set on it and keeps it in sync with the <input>. 
      v-model works across all the various input types, including check boxes, radios, and select inputs. 
      To use v-model, you add an attribute with the structure v-model="variable" to the <input>. 
      You can also sync data with <input> values through a combination of events and v-bind attributes. In fact, this is what v-model does behind the scenes.
       -->
    <input
      type="text"
      id="new-todo-input"
      name="new-todo"
      autocomplete="off"
      v-model.trim.lazy="label"
    />
    <!--.trim, will remove whitespace from before or after the input.
     Vue is syncing the data after every keystroke. The .lazy modifier causes v-model to use the change event instead.
      This means that Vue will only sync data when the input loses focus or the form is submitted.-->
    <button type="submit" >
      Add
    </button>
</form>
</template>

<script>
export default{
    /**The methods property holds any methods we might need to call in our component. 
     * When referenced, methods are fully run, so it's not a good idea to use them to display information inside the template.
     *  For displaying data that comes from calculations, you should use a computed property, */
    methods: {
       onSubmit() {

          console.log('label value:',this.label);
          //pass the newly-created to-do item to our App component via ToDoForm emit a custom event.
          /**Custom events are emitted like this: this.$emit("event-name"). It's important to know that event handlers are case sensitive and cannot include spaces. */
          if(this.label===""){
            return;
          }
          this.$emit('to-do-added',this.label);
           this.label = "";
       }
    },
    //data property in our form to track the value of the new-to-do-item.
    data(){
        return{
            label: ""
        };
    }

};
</script>