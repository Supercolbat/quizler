import { writable } from 'svelte/store';

// https://stackoverflow.com/a/61300826
const createWritableStore = (key: string, startValue: any): any => {
  const { subscribe, set } = writable(startValue);
  
  return {
    subscribe,
    set,
    useLocalStorage: () => {
      const json = localStorage.getItem(key);
      if (json) {
        set(JSON.parse(json));
      }
      
      subscribe(current => {
        localStorage.setItem(key, JSON.stringify(current));
      });
    }
  };
}


// Theme
export const theme = createWritableStore('theme', { mode: 'dark' });
