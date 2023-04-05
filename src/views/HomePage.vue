<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Zangl tracking</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-modal ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="cancel()">Cancel</ion-button>
            </ion-buttons>
            <ion-title>Welcome</ion-title>
            <ion-buttons slot="end">
              <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-label position="stacked">Enter your name</ion-label>
            <ion-input
              ref="input"
              type="text"
              placeholder="Your name"
            ></ion-input>
          </ion-item>
        </ion-content>
      </ion-modal>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button id="open-modal">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-input placeholder="Enter text..."></ion-input>
        <ion-button slot="end">Cat fact</ion-button>
      </ion-toolbar>
    </ion-footer>
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
  IonFooter,
} from "@ionic/vue";
import { add } from "ionicons/icons";
import { OverlayEventDetail } from "@ionic/core/components";
import { defineComponent, ref } from "vue";
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
    IonFooter,
    IonButtons,
    IonButton,
  },
  setup() {
    return { add };
  },
  methods: {
    cancel() {
      //check the type of the ref
      console.log(this.$refs.modal);
    },
    confirm() {
      // const name = this.$refs.input.$el.value;
      // this.$refs.modal.$el.dismiss(name, "confirm");
    },
    onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
      if (ev.detail.role === "confirm") {
        // this.message = `Hello, ${ev.detail.data}!`;
      }
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
</style>
