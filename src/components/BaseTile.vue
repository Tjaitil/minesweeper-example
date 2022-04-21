<template>
  <div
    class="board-tile"
    :class="[
      { 'tile-flagged': tile.flagged, 'tile-not-clicked': !tile.clicked, 'wrong-bomb': wrongBomb },
      determineColor(tile.nearbyBombNumber),
    ]"
  >
    <p v-if="!tile.clicked"></p>
    <p v-else-if="tile.isBomb" class="tile-bomb">B</p>
    <p v-else>
      {{ tile.nearbyBombNumber > 0 ? tile.nearbyBombNumber : "" }}
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    tile: {
      type: Object,
      required: true,
    },
    gameStatus: {
      type: String,
      required: true,
    }
  },
  setup(props,) {
    const wrongBomb = computed(() => (props.tile.flagged && !props.tile.isBomb && props.gameStatus === "loss"));

    function determineColor(nearbyNumber: number) {
      let colorClass = "color-";
      if(props.tile.isBomb) return false;
      return colorClass += nearbyNumber;
    }

    return {
      determineColor,
      wrongBomb
    };
  },
});
</script>

<style scoped>
.board-tile {
  background-color: #c6c6c6;
  border: 1px solid #808080;
  height: 32px;
  width: 32px;
  cursor: pointer;
  font-weight: 700;
}
.tile-not-clicked {
    border-top: 4px solid #ffffff;
    border-left: 4px solid #ffffff;
    border-right: 4px solid #808080;
    border-bottom: 4px solid #808080;
}
.board-tile > p {
  height: 100%;
  width: 100%;
  /* line-height: 2em; */
  font-size: 1.5rem;
}
.tile-flagged {
  background-color: rgb(107, 106, 32);
}
.tile-bomb,
.wrong-bomb {
  background-color: red;
}
.color-1 {
  color: #0202fe;
}
.color-2 {
  color: #198519;
}
.color-3 {
  color: #fb0a0a;
}
.color-4 {
  color: #01017b;
}
.color-5 {
  color: #7b0000;
}
</style>
