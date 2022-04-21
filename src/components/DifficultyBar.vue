<template>
  <div id="difficultyBar">
    <button
      @click="setDifficulty('beginner')"
      :class="{ 'current-difficulty': checkDifficulty('beginner') }"
    >
      Beginner
    </button>
    <button
      @click="setDifficulty('intermediate')"
      :class="{ 'current-difficulty': checkDifficulty('intermediate') }"
    >
      Intermediate
    </button>
    <button
      @click="setDifficulty('expert')"
      :class="{ 'current-difficulty': checkDifficulty('expert') }"
    >
      Expert
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    currentDifficulty: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    function setDifficulty(difficulty: string) {
      context.emit("set-difficulty", difficulty);
    }
    const checkDifficulty = (difficulty: string): boolean => difficulty === props.currentDifficulty;
    return {
      setDifficulty,
      checkDifficulty,
    };
  },
});
</script>

<style scoped>
#difficultyBar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  margin-top: 1rem;
}
button {
  background-color: transparent;
  border: none;
  font-size: 1rem;
  color: unset;
  height: 26px;
  box-sizing: content-box;
  padding-inline: 2px;
}
.current-difficulty {
    border-bottom: 4px solid rgb(77, 74, 74);
}
</style>
