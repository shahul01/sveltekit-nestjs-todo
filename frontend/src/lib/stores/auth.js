import { writable } from 'svelte/store';


export const authStore = writable({
  isAuth: false
});
