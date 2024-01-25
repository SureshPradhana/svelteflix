import { writable } from 'svelte/store';

export const successMessage = writable(null);
export const errorMessage = writable(null);