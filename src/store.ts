import { createStore } from "vuex";

// Create a new store instance.
export const store = createStore({
  state() {
    return {
      entries: [
        {
          id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
          text: "First Entry",
          start: "2023-04-08T09:48:46.158Z",
          end: "2023-04-09T10:58:26.158Z",
          tags: ["tag1", "tag2"],
        },
        {
          id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
          text: "Second Entry",
          start: "2023-04-09T09:48:46.158Z",
          end: "2023-04-09T13:18:46.158Z",
          tags: ["tag1", "tag2"],
        },
        {
          id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
          text: "Third Entry",
          start: "2023-04-10T09:48:46.158Z",
          end: "2023-04-10T16:12:12.158Z",
          tags: ["tag1", "tag2"],
        },
      ],
      tags: [
        "work",
        "home",
        "school",
        "training",
        "shopping",
        "other",
      ]
    };
  },
  mutations: {
    addEntry(state, payload) {
      state.entries.push(payload);
      console.log(state.entries);
    },
  },
});
