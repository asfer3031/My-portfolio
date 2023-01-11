import { writable } from 'svelte/store';

export const showUl = writable(false);
/**
 * @type {any}
 */
export const activeLi = '';

export let projects = [
    {
        id: 'Picture Fetcher',
        picture: '../src/lib/assets/images/photography2.jpg',
        description: "A project to view images of high quality from Unsplash free developer's api." +
            "This project demonsttrates how we can fetch data from a database that is not local.",
        url: '/Projects/Picture-Fetcher',
        Cardfootertitle: 'A huge thanks to Unsplash.',
        cardfooterimageUrl: '../src/lib/assets/images/unsplash.png'
    },
    {
        id: 'Polls Maker',
        picture: '../src/lib/assets/images/polls.jpg',
        description: 'A project to create polls.' +
            ' I was able to build this project following a youtube tutorial done By The Net Ninja.',
        url: '/Projects/Polls',
        Cardfootertitle: 'A huge thanks to The Net Ninja.',
        cardfooterimageUrl: '../src/lib/assets/images/unnamed.jpg'
    },

];

export const switchUl = writable(activeLi);



