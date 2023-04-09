<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="cancel()">Cancel</ion-button>
      </ion-buttons>
      <ion-title class="modal-title">Update Entry</ion-title>
      <ion-buttons slot="end">
        <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-item>
      <ion-label position="stacked">Text</ion-label>
      <ion-input
        v-model="currentText"
        ref="input_text"
        type="text"
        placeholder="Input text..."
      ></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Tags</ion-label>
      <ion-select
        placeholder="Select Tags"
        :multiple="true"
        :value="currentTags"
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
      <ion-label class="date-label" position="stacked">Start</ion-label>
      <ion-datetime-button
        class="date-button"
        datetime="datetime-start"
      ></ion-datetime-button>
    </ion-item>
    <ion-item>
      <ion-label class="date-label" position="stacked">End</ion-label>
      <ion-datetime-button
        class="date-button"
        datetime="datetime-end"
      ></ion-datetime-button>
    </ion-item>
    <ion-button
      class="delete-button"
      color="danger"
      @click="deleteEntry()"
      expand="block"
    >
      Delete Entry
    </ion-button>
    <ion-modal :keep-contents-mounted="true">
      <ion-datetime :value="currentStart" ref="datetime_start" id="datetime-start" />
    </ion-modal>
    <ion-modal :keep-contents-mounted="true">
      <ion-datetime :value="currentEnd" ref="datetime_end" id="datetime-end" />
    </ion-modal>
  </ion-content>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  IonDatetimeButton,
  modalController,
} from "@ionic/vue";
interface Entry {
  text: string;
  start: string;
  end: string;
  tags: string[];
  id: number;
}

export default defineComponent({
  name: "EntryModal",
  components: {
    IonButton,
    IonButtons,
    IonContent,
    IonDatetime,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonModal,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar,
    IonDatetimeButton,
  },
  props: {
    entry: {
      type: Object as () => Entry,
      required: true,
    },
  },
  data() {
    return {
      currentText: this.entry.text,
      currentStart: this.entry.start,
      currentEnd: this.entry.end,
      currentTags: this.entry.tags,
    };
  },
  methods: {
    cancel() {
      modalController.dismiss(null, "cancel");
    },
    confirm() {
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
        id: this.entry.id,
        text: this.currentText,
        start: startDateTime,
        end: endDateTime,
        tags: this.currentTags,
      };
      modalController.dismiss(data, "confirm");
    },

    deleteEntry() {
      modalController.dismiss(this.entry.id, "delete");
    },
  },
});
</script>
<style scoped>
.date-label {
  margin-bottom: 0.5rem;
}

.date-button {
  margin-bottom: 0.5rem;
}

.modal-title {
  text-align: center;
}
</style>
