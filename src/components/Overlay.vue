<template>
  <div id="overlay">
    <span @click="closeOverlay()" id="overlay-exit">X</span>
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
      context.emit("reset-board");
    }
    function closeOverlay() {
      context.emit("close-overlay");
    }
    return {
      resetBoard,
      closeOverlay,
    };
  },
});
</script>

<style scoped>
#overlay {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 200px;
  max-width: 200px;
  max-height: 400px;
  min-height: 200px;
  max-height: 200px;
  background-color: rgb(224, 223, 223);
  border-radius: 10px;
}
#overlay-exit {
  position: absolute;
  top: 5px;
  right: 10px;
  font-weight: 900;
  cursor: pointer;
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
