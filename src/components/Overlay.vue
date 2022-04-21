<template>
  <div id="overlay">
    <button @click="resetBoard">New game</button>
    <p>
      <span v-if="gameStatus !== 'playing'" :class="[gameStatus]">
        {{ gameStatusText }}
      </span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    gameStatus: {
      type: String,
      required: true,
    },
    gameStatusText: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    function resetBoard() {
    console.log('reset');
      context.emit("reset-board");
    }
    return {
      resetBoard,
    };
  },
});
</script>

<style scoped>
#overlay {
  position: absolute;
  left: 50%; /* position the left edge of the element at the middle of the parent */
  transform: translateX(-50%);
  width: 30%;
  height: 200px;
  max-width: 350px;
  max-height: 400px;
  min-height: 200px;
  max-height: 200px;
  background-color: rgb(224, 223, 223);
  border-radius: 10px;
}
button {
  max-width: 100px;
  padding: 10px;
  font-size: 1rem;
  margin: 1rem auto 1.3rem;
  border: 2px outset whitesmoke;
}
.win {
  color: rgb(17, 184, 17);
}
.loss {
  color: red;
}
</style>
