import { writable } from "svelte/store";

interface Inputs {
  name: string;
  value: number | null;
}

export const inputs = writable<Inputs>({
  name: "",
  value: null
})
