<template>
  <div id="difficultyBar">
    <p
      @click="setDifficulty('Beginner')"
      :class="{ 'current-difficulty': checkDifficulty('beginner') }"
    >
      Beginner
    </p>
    <p
      @click="setDifficulty('Intermediate')"
      :class="{ 'current-difficulty': checkDifficulty('intermediate') }"
    >
      Intermediate
    </p>
    <p
      @click="setDifficulty('Expert')"
      :class="{ 'current-difficulty': checkDifficulty('expert') }"
    >
      Expert
    </p>
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
#difficultyBar > p {
  cursor: pointer;
  padding-inline: 2px;
}
.current-difficulty {
    border-bottom: 4px solid rgb(77, 74, 74);
}
</style>
