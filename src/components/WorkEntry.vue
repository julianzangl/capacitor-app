<template>
  <ion-item class="item">
    <ion-label>{{ entry.text }}</ion-label>
    <ion-chip
      v-for="tag in entry.tags"
      :key="tag"
      color="primary"
      @click="toggle"
    >
      {{ tag }}
    </ion-chip>
    <ion-label class="time">{{ time }}</ion-label>
  </ion-item>
</template>
<script lang="ts">
interface Entry {
  text: string;
  start: Date;
  end: Date;
  tags: string[];
}
import { defineComponent } from "vue";
import {
  IonItem,
  IonLabel,
  IonChip,
} from "@ionic/vue";
export default defineComponent({
  name: "WorkEntry",
  components: {
    IonItem,
    IonLabel,
    IonChip,
  },
  props: {
    entry: {
      type: Object as () => Entry,
      required: true,
    },
  },
  data() {
    return {
      time: "00:00:00",
    };
  },

  mounted() {
    const start = new Date(this.entry.start).getTime();
    const end = new Date(this.entry.end).getTime();
    const diff = end - start;
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60 / 60 - hours) * 60);
    const seconds = Math.floor(
      ((diff / 1000 / 60 / 60 - hours) * 60 - minutes) * 60
    );
    this.time = `${hours}:${minutes}:${seconds}`;
    this.time = this.time.replace(
      /(\d{1,2}):(\d{1,2}):(\d{1,2})/,
      function (match, p1, p2, p3) {
        return (
          (p1.length == 1 ? "0" + p1 : p1) +
          ":" +
          (p2.length == 1 ? "0" + p2 : p2) +
          ":" +
          (p3.length == 1 ? "0" + p3 : p3)
        );
      }
    );
  },

  methods: {
    toggle() {
      console.log("toggle");
    },
  },
});
</script>
<style scoped>
.time {
    text-align: right;
}
</style>
