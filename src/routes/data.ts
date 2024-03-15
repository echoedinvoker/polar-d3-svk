import { writable } from "svelte/store";


export const data = writable([
  { name: "A", value: 10 },
  { name: "B", value: 20 },
  { name: "C", value: 30 },
])
