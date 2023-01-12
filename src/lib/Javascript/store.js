import { writable } from 'svelte/store';

import Photography from '$lib/assets/images/photography2.jpg';
import Unsaplashpic from '$lib/assets/images/unsplash.png';
import Pollspic1 from '$lib/assets/images/polls.jpg';
import Pollspic from '$lib/assets/images/unnamed.jpg';

export const showUl = writable(false);
/**
 * @type {any}
 */
export const activeLi = '';

export let projects = [
    {
        id: 'Picture Fetcher',
        picture: Photography,
        description: "A project to view images of high quality from Unsplash free developer's api." +
            "This project demonsttrates how we can fetch data from a database that is not local.",
        url: '/Projects/Picture-Fetcher',
        Cardfootertitle: 'A huge thanks to Unsplash.',
        cardfooterimageUrl: Unsaplashpic
    },
    {
        id: 'Polls Maker',
        picture: Pollspic1,
        description: 'A project to create polls.' +
            ' I was able to build this project following a youtube tutorial done By The Net Ninja.',
        url: '/Projects/Polls',
        Cardfootertitle: 'A huge thanks to The Net Ninja.',
        cardfooterimageUrl: Pollspic,
    },

];

export const switchUl = writable(activeLi);



