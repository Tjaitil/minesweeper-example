<template>
  <Overlay
    v-if="showOverlay"
    :gameStatus="gameStatus"
    :gameStatusText="gameStatusText"
    @reset-board="resetBoard()"
    @closeOverlay="toggleOverlay()"
  />
  <DifficultyBar @set-difficulty="setDifficulty" :currentDifficulty="currentDifficulty" />
  <HUD :remainingBombs="remainingBombs" @reset-board="resetBoard()" />
  <div id="board-container">
    <TheBoard :board="board" :gameStatus="gameStatus" @check-tile="checkTile" @flag-tile="flagTile" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from "vue";
import { gameState } from "../types";
import { GAME_ENGINE, GAME_PIECES, EVENT_HANDLERS } from "../gameengine";
import HUD from "./HUD.vue";
import Overlay from "./Overlay.vue";
import DifficultyBar from "./DifficultyBar.vue";
import TheBoard from "./TheBoard.vue";

export default defineComponent({
  components: {
    HUD,
    Overlay,
    DifficultyBar,
    TheBoard,
  },
  setup() {
    const { setup } = GAME_ENGINE;
    const { checkTile, flagTile } = EVENT_HANDLERS;
    const { board } = GAME_PIECES;
    const { status: gameStatus, gameId } = GAME_ENGINE;
    const showOverlay = ref(false);
    const gameStatusText = ref("");
    const currentDifficulty = ref("expert");
    setDifficulty("expert");
    const remainingBombs = computed(() => {
      let bombs = board.bombs - GAME_PIECES.flags.value;
      if (bombs > 0) {
        return bombs;
      } else {
        return 0;
      }
    });
    const progress = computed(
      () => GAME_PIECES.tilesClicked.value + GAME_PIECES.flags.value
    );

    function resetBoard() {
      setDifficulty(currentDifficulty.value);
    }

    function setDifficulty(difficulty: string) {
      let difficultyLower = difficulty.toLowerCase();
      toggleOverlay(false);
      GAME_PIECES.board.tiles = [];
      switch (difficultyLower) {
        case "beginner":
          setup(9, 9, 10);
          currentDifficulty.value = "beginner";
          break;
        case "intermediate":
          setup(16, 16, 40);
          currentDifficulty.value = "intermediate";
          break;
        case "expert":
          setup(16, 30, 99);
          currentDifficulty.value = "expert";
          break;
      }
    }

    watch(gameStatus, (newValue, oldValue) => {
      if (gameStatus.value === "playing") return;
      toggleOverlay(true);
      if (newValue === "win") {
        gameStatusText.value = "You win!";
      } else if (newValue === "loss") {
        gameStatusText.value = "You lose!";
      }
    });

    watch(progress, (newVal, oldVal) => {
      if (remainingBombs.value === 0 && progress.value === board.tiles.length) {
        gameStatus.value = gameState.WIN;
      }
    });
    
    function toggleOverlay(newValue:boolean=false) {
      if(newValue) {
        showOverlay.value = !showOverlay.value;
      } else {
        showOverlay.value = newValue;
      }
    }
    return {
      gameId,
      board,
      gameState,
      gameStatus,
      remainingBombs,
      checkTile,
      flagTile,
      setDifficulty,
      resetBoard,
      progress,
      showOverlay,
      gameStatusText,
      currentDifficulty,
      toggleOverlay,
    };
  },
});
</script>

<style scoped>
#board-container {
  max-width: 704px;
  max-height: 80vh;
  overflow: scroll;
}
#board {
  display: grid;
  grid-template-columns: repeat(auto-fill, 32px);
  margin-inline: auto;
  width: 100%;
  max-height: 512px;
  border: 5px inset #c6c6c6;
  box-sizing: content-box;
}
</style>
