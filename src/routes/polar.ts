import { Polar } from "polar-d3";
import { writable } from "svelte/store";

export const polar = writable<Polar | null>(null)
