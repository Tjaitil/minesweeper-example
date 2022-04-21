<template>
  <div id="hudBar">
    <p>Remaining bombs: {{ remainingBombs }}</p>
    <button @click="resetBoard">Restart</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    remainingBombs: {
      type: Number,
      required: true,
    },
  },
  setup(props, context) {
    function resetBoard() {
      context.emit("reset-board");
    }
    return {
      resetBoard,
    }
  },
});
</script>

<style scoped>
#hudBar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-block: 0.5rem;
  align-content: center;
  gap: 10px;
}
button {
  max-width: 100px;
  padding: 10px;
  font-size: 1rem;
  margin: 0.5rem 0;
  border: 2px outset whitesmoke;
}
p {
  align-self: center;
}
</style>
