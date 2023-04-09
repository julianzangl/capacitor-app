import { createStore } from "vuex";

interface Entry {
  id: number;
  text: string;
  start: string;
  end: string;
  tags: string[];
  time: string;
}

// Create a new store instance.
export const store = createStore({
  state() {
    return {
      entries: [
        {
          id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
          text: "SEW ADV 2",
          start: "2023-04-09T09:48:46.158Z",
          end: "2023-04-09T10:58:26.158Z",
          tags: ["school"],
          time: "01:09:40"
        },
        {
          id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
          text: "Laufen",
          start: "2023-04-09T09:48:46.158Z",
          end: "2023-04-09T13:18:46.158Z",
          tags: ["training"],
          time: "03:30:00"
        },
        {
          id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
          text: "Mittagspause",
          start: "2023-04-10T09:48:46.158Z",
          end: "2023-04-10T16:12:12.158Z",
          tags: ["home", "other"],
          time: "06:23:25"
        },
      ] as Entry[],
      init_entries: [
        {
          id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
          text: "SEW ADV 2",
          start: "2023-04-09T09:48:46.158Z",
          end: "2023-04-09T10:58:26.158Z",
          tags: ["school"],
          time: "01:09:40"
        },
        {
          id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
          text: "Laufen",
          start: "2023-04-09T09:48:46.158Z",
          end: "2023-04-09T13:18:46.158Z",
          tags: ["training"],
          time: "03:30:00"
        },
        {
          id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
          text: "Mittagspause",
          start: "2023-04-10T09:48:46.158Z",
          end: "2023-04-10T16:12:12.158Z",
          tags: ["home", "other"],
          time: "06:23:25"
        },
      ],
      filtered_entries: [] as Entry[],
      filtered: false,
      tags: [
        "work",
        "home",
        "school",
        "training",
        "other",
      ]
    };
  },
  mutations: {
    addEntry(state, payload) {
      state.entries.push(payload);
      console.log(state.entries);
    },

    deleteEntry(state, payload) {
      state.entries = state.entries.filter((entry) => entry.id !== payload);
    },

    updateEntry(state, payload) {
      state.entries = state.entries.map((entry) =>
        entry.id === payload.id ? payload : entry
      );
    },
    resetEntries(state) {
      state.entries = state.init_entries;
    },

    filterEntriesByTags(state, tags) {
      state.filtered_entries = state.entries.filter(entry => {
        return entry.tags.some(tag => tags.includes(tag));
      });
      state.filtered = true;
    },

    filterEntriesByDate(state, date) {
      state.filtered_entries = state.entries.filter(entry => {
        const entry_date = new Date(entry.start).getDate();
        const filter_date = new Date(date).getDate();
        return entry_date === filter_date;
      });
      state.filtered = true;
    },

    setFiltered(state, payload) {
      state.filtered = payload;
    }
  },
});
