

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  let clientId = 'oODACv19bvg6jOUDaRv-KSgz9mtlMaG5ib10d0rP50A';
  const res = await fetch(`https://api.unsplash.com/search/photos?client_id=${clientId}&query=photos&per_page=30`);
  const data = await res.json()
  // console.log(data);


  return {
    items: data.results
  };
}













// export async function load({ fetch }) {
//   const res = await fetch(`https://api.unsplash.com/photos?client_id=oODACv19bvg6jOUDaRv-KSgz9mtlMaG5ib10d0rP50A&per_page=32`);
//   const data = await res.json()


//   return {
//     items: data
//   };
// }


