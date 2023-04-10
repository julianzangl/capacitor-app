<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Zangl tracking</ion-title>
        <ion-button slot="end" @click="clear_filters">
          <ion-icon :icon="closeOutline" />
        </ion-button>
        <ion-select
          slot="end"
          placeholder="Select tags"
          ref="filter_tags"
          :multiple="true"
          :value="filterTags"
          @ionChange="filter($event.detail.value)"
        >
          <ion-select-option
            v-for="tag in $store.state.tags"
            :value="tag"
            :key="tag"
          >
            {{ tag }}
          </ion-select-option>
        </ion-select>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-modal :keep-contents-mounted="true">
        <ion-datetime
          ref="filter_date"
          id="datetimeFilter"
          :value="filterTime"
          @ionChange="filter_time($event.detail.value)"
        ></ion-datetime>
      </ion-modal>
      <ion-modal ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="cancel()">Cancel</ion-button>
            </ion-buttons>
            <ion-title class="modal-title">New Entry</ion-title>
            <ion-buttons slot="end">
              <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-label position="stacked"
              >What have you been working on?</ion-label
            >
            <ion-input
              ref="input_text"
              type="text"
              placeholder="Input text..."
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-select
              aria-label="Food"
              placeholder="Select tags"
              :multiple="true"
              @ionChange="currentTags = $event.detail.value"
            >
              <ion-select-option
                v-for="tag in $store.state.tags"
                :value="tag"
                :key="tag"
              >
                {{ tag }}
              </ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Start</ion-label>
            <ion-datetime-button datetime="datetime-start"
              >Yes</ion-datetime-button
            >
          </ion-item>
          <ion-item>
            <ion-label position="stacked">End</ion-label>
            <ion-datetime-button datetime="datetime-end"></ion-datetime-button>
          </ion-item>
          <ion-modal :keep-contents-mounted="true">
            <ion-datetime ref="datetime_start" id="datetime-start" />
          </ion-modal>
          <ion-modal :keep-contents-mounted="true">
            <ion-datetime ref="datetime_end" id="datetime-end" />
          </ion-modal>
        </ion-content>
      </ion-modal>
      <ion-list v-if="!$store.state.filtered">
        <ion-item-divider>
          <ion-label>Your entries</ion-label>
          <ion-datetime-button
            slot="end"
            datetime="datetimeFilter"
            class="filter-time-button"
          ></ion-datetime-button>
        </ion-item-divider>
        <WorkEntry
          v-for="entry in $store.state.entries"
          :key="entry.id"
          :entry="entry"
        />
      </ion-list>
      <ion-list v-else>
        <ion-item-divider>
          <ion-label>Your entries</ion-label>
          <ion-datetime-button
            slot="end"
            datetime="datetimeFilter"
            class="filter-time-button"
          ></ion-datetime-button>
        </ion-item-divider>
        <WorkEntry
          v-for="entry in $store.state.filtered_entries"
          :key="entry.id"
          :entry="entry"
        />
      </ion-list>
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button id="open-modal">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonInput,
  IonItem,
  IonLabel,
  IonDatetime,
  IonDatetimeButton,
  IonSelectOption,
  IonSelect,
  IonList,
  IonItemDivider,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";
import { add, funnelOutline, closeOutline } from "ionicons/icons";
import { OverlayEventDetail } from "@ionic/core/components";
import { defineComponent } from "vue";
import WorkEntry from "@/components/WorkEntry.vue";
export default defineComponent({
  name: "HomePage",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonFab,
    IonFabButton,
    IonIcon,
    IonModal,
    IonInput,
    IonItem,
    IonLabel,
    IonButtons,
    IonButton,
    IonDatetime,
    IonDatetimeButton,
    IonSelectOption,
    IonSelect,
    IonList,
    IonItemDivider,
    WorkEntry,
    IonRefresher,
    IonRefresherContent,
  },
  setup() {
    return { add, funnelOutline, closeOutline };
  },

  data() {
    return {
      currentTags: [],
      filterTags: [],
      filterTime: "",
    };
  },

  methods: {
    cancel() {
      (this.$refs.modal as any).$el.dismiss(null, "cancel");
    },

    confirm() {
      const text = (this.$refs.input_text as any).$el.value;
      let startDateTime = document
        .getElementById("datetime-start")
        ?.getElementsByTagName("input")[0].value;
      let endDateTime = document
        .getElementById("datetime-end")
        ?.getElementsByTagName("input")[0].value;

      if (startDateTime == "") {
        const currentDateTime = new Date();
        const currentDateTimeString = currentDateTime.toISOString();
        startDateTime = currentDateTimeString;
      }
      if (endDateTime == "") {
        const currentDateTime = new Date();
        const currentDateTimeString = currentDateTime.toISOString();
        endDateTime = currentDateTimeString;
      }
      const data = {
        id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
        text: text,
        start: startDateTime,
        end: endDateTime,
        tags: this.currentTags,
      };
      (this.$refs.modal as any).$el.dismiss(data, "confirm");
    },

    onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
      if (ev.detail.role === "confirm") {
        const time = this.generateTimeString(
          ev.detail.data.start,
          ev.detail.data.end
        );
        ev.detail.data.time = time;
        this.$store.commit("addEntry", ev.detail.data);
      }
    },
    handleRefresh(event: CustomEvent) {
      setTimeout(() => {
        this.$store.commit("resetEntries");
        event.detail.complete();
      }, 2000);
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
    filter(data: any) {
      if (data.length == 0) {
        this.filterTags = [];
        this.$store.commit("setFiltered", false);
        return;
      } else {
        this.filterTags = data;
      }
      this.$store.commit("filterEntriesByTags", this.filterTags);
    },
    filter_time(data: any) {
      this.filterTime = data;
      this.$store.commit("filterEntriesByDate", this.filterTime);
    },

    clear_filters() {
      this.filterTags = [];
      this.$store.commit("setFiltered", false);
    },
  },
});
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 16px;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  margin: 0;
}
.modal-title {
  text-align: center;
}
</style>
