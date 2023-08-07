
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const showKart = writable(false);
export const showfilter = writable(false);
export const showcategories = writable(false);
export let categoryValue = writable();

export let account = writable(false);







if (browser) {
    fetch('https://dummyjson.com/products/categories').then(res => res.json()).then(data => {
        categoryValue.set(data);
    });
}










