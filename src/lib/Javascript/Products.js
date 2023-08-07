
import { writable } from 'svelte/store';

export let categoryNewValue = writable('');

export const productsStore = writable([]);



export function calculateTotal() {
    let total = 0;
    cartProducts.subscribe((productList) => {
        // @ts-ignore
        total = productList.reduce((acc, product) => acc + product.itemTotal, 0);
    });
    return total;
}



// Function to fetch data from the API and create a new writable array
const storedProductsString = typeof localStorage !== 'undefined' ? localStorage.getItem('products') : null;
const storedProducts = storedProductsString ? JSON.parse(storedProductsString) : [];

export const Products = writable(storedProducts);

/**
 * @param {any} newProducts
 */
function updateProducts(newProducts) {
    Products.set(newProducts);
    sessionStorage.setItem('products', JSON.stringify(newProducts));
}

export async function fetchProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products?limit=100');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();


        const productsWithItemAdded = data.products.map((/** @type {any} */ item) => ({
            ...item,
            isAdded: false,
        }));

        updateProducts(productsWithItemAdded);

    } catch (error) {
        console.error(error);
    }



}

export const filteredProducts = writable([]);
export const isLoading = writable(false);

export function filterProductsByCategory() {
    var mystring = sessionStorage.getItem('myString');
    var filterprods = sessionStorage.getItem('products');
    // @ts-ignore
    var filterprodsArray = JSON.parse(filterprods);
    // @ts-ignore
    var filtered = filterprodsArray.filter(product => product.category === mystring);

    // Update the value of the writable store
    filteredProducts.set(filtered);
    // @ts-ignore
    categoryNewValue.set(mystring);

    // isLoading.set(false);

}

/**
 * @param {any} productId
 */
export function removeFromCart(productId) {
    // Remove the product from the writable array
    // @ts-ignore
    cartProducts.update((products) => {
        /**
         * @type {never[]}
         */
        // @ts-ignore
        const updatedProducts = products.filter((product) => product.id !== productId);
        sessionStorage.setItem('cartItems', JSON.stringify(updatedProducts)); // Update cartItems in session storage
        return updatedProducts;
    });

    if (typeof Storage !== "undefined") {
        // Retrieve the data from local storage
        var data = sessionStorage.getItem("products");

        // Check if the data exists
        if (data !== null) {
            // Parse the data from a string to an object
            var parsedData = JSON.parse(data);

            // Iterate through the array of objects
            for (var i = 0; i < parsedData.length; i++) {
                var item = parsedData[i];

                // Check if the productId exists
                if (item.id === productId) {
                    // Update the isAdded property to false
                    item.isAdded = false;
                    sessionStorage.setItem("products", JSON.stringify(parsedData));
                    updateProducts(parsedData);
                }
            }
        } else {
            // Data does not exist
            console.log("No data found.");
        }
    } else {
        // Local storage is not supported
        console.log("Local storage is not supported by your browser.");
    }
    calculateTotal();
    filterProductsByCategory()
}


export const cartProducts = writable([]);

/**
 * @param {{id: any;name: any;price: any;image: any;itemQuantity: number;itemIndex: any;}} PRODUCT
 * @param {any} productId
 */
export function addToCart(PRODUCT, productId) {

    // @ts-ignore
    cartProducts.update((products) => {
        // Add the product to the existing array
        const updatedProducts = [...products, PRODUCT];

        // Save the updated array to local storage
        sessionStorage.setItem('cartItems', JSON.stringify(updatedProducts));

        return updatedProducts;
    });

    if (typeof (Storage) !== "undefined") {
        // Retrieve the data from local storage
        var data = sessionStorage.getItem("products");

        // Check if the data exists
        if (data !== null) {
            // Parse the data from a string to an object
            var parsedData = JSON.parse(data);

            // Iterate through the array of objects
            for (var i = 0; i < parsedData.length; i++) {
                var item = parsedData[i];

                // Check if the productId exists
                if (item.id === productId) {
                    // Update the isAdded property to true
                    item.isAdded = true;
                    sessionStorage.setItem("products", JSON.stringify(parsedData));
                    updateProducts(parsedData);


                }

            }



        }
        else {
            // Data does not exist
            console.log("No data found.");
        }
    } else {
        // Local storage is not supported
        console.log("Local storage is not supported by your browser.");
    }
    calculateTotal();
    filterProductsByCategory();



}

export function initializeCartProducts() {
    const storedProducts = sessionStorage.getItem('cartItems');

    if (storedProducts) {
        cartProducts.set(JSON.parse(storedProducts));
    }
}

export function initializeProducts() {
    const storedProducts = sessionStorage.getItem('products');

    if (storedProducts) {
        Products.set(JSON.parse(storedProducts));
    }
}

/**
 * @param {any} productId
 * @param {number} newQuantity
 */
export function updateProductQuantity(productId, newQuantity) {
    cartProducts.update((products) => {
        // @ts-ignore
        const productIndex = products.findIndex((product) => product.id === productId);

        if (productIndex !== -1) {
            if (newQuantity <= 0) {
                return products;
            }

            if (newQuantity >= 10) {
                alert("More than 9 of the same items cannot be purchased all at once, please inquire for wholesale promotions.");
                return products;
            }

            // @ts-ignore
            products[productIndex].itemQuantity = newQuantity;

            /**
             * @type {{ price: number; }}
             */
            const product = products[productIndex];
            const price = product.price * newQuantity;
            // @ts-ignore
            products[productIndex].itemTotal = price;
        }

        sessionStorage.setItem('cartItems', JSON.stringify(products));
        calculateTotal(); // Update the total after updating the quantity

        return products;
    });
}








