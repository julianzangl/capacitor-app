<template>
  <ion-item @click="openModal()" class="item">
    <ion-label>{{ entry.text }}</ion-label>
    <ion-chip v-for="tag in entry.tags" :key="tag" color="primary">
      {{ tag }}
    </ion-chip>
    <ion-label class="time">{{ entry.time }}</ion-label>
  </ion-item>
</template>
<script lang="ts">
interface Entry {
  text: string;
  start: Date;
  end: Date;
  tags: string[];
  id: number;
  time: string;
}
import { defineComponent } from "vue";
import { IonItem, IonLabel, IonChip, modalController } from "@ionic/vue";
import EntryModal from "./EntryModal.vue";
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
      currentTags: [],
    };
  },

  mounted() {
    console.log(this.entry);
  },

  methods: {
    async openModal() {
      const modal = await modalController.create({
        component: EntryModal,
        componentProps: {
          entry: this.entry,
        },
      });
      modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === "confirm") {
        const time = this.generateTimeString(data.start, data.end);
        data.time = time;
        this.$store.commit("updateEntry", data);
      }

      if (role === "delete") {
        this.$store.commit("deleteEntry", data);
      }
    },

    generateTimeString(start_date: string, end_date: string): string {
      const start = new Date(start_date).getTime();
      const end = new Date(end_date).getTime();
      const diff = end - start;
      const hours = Math.floor(diff / 1000 / 60 / 60);
      const minutes = Math.floor((diff / 1000 / 60 / 60 - hours) * 60);
      const seconds = Math.floor(
        ((diff / 1000 / 60 / 60 - hours) * 60 - minutes) * 60
      );
      let time = `${hours}:${minutes}:${seconds}`;
      time = time.replace(
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
      return time;
    },
  },
});
</script>
<style scoped>
.time {
  text-align: right;
}
</style>
