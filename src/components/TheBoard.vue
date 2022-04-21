<template>
  <div
    id="board"
    :style="{
      width: board.width + 'px',
    }"
  >
    <BaseTile
      v-for="tile in currentTiles"
      :key="tile.id"
      :tile="tile"
      :gameStatus="gameStatus"
      @click="checkTile(tile)"
      @contextmenu.prevent="flagTile(tile)"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { tile } from "../types";
import BaseTile from "./BaseTile.vue";

export default defineComponent({
  components: {
    BaseTile,
  },
  props: {
    board: {
      type: Object,
      required: true,
    },
    gameStatus: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    const checkTile = (tile: tile) => context.emit("check-tile", tile);
    const flagTile = (tile: tile) => context.emit("flag-tile", tile);
    
    const currentTiles = computed(() => props.board.tiles.slice(0, props.board.maxTiles));

    return {
      checkTile,
      flagTile,
      currentTiles,
    };
  },
});
</script>

<style scoped></style>
