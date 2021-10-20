export const setProductScreenItem = (item) => {
    localStorage.setItem('productScreenItem', JSON.stringify(item))
};

export const getProductScreenItem = () =>{
    const ProductScreenItem = localStorage.getItem('productScreenItem') ?
        JSON.parse(localStorage.getItem('productScreenItem')) : {};
    return ProductScreenItem;
}

export const setCartItems = (cartItems) => {
    console.log('UUU__', cartItems);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

export const getCartItems = () => {
    const cartItems = localStorage.getItem('cartItems') ?
        JSON.parse(localStorage.getItem('cartItems')) : [];
    return cartItems;
}