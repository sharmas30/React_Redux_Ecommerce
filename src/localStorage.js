import { isAdmin } from "@firebase/util";

// PRODUCT SCREEN //

export const setProductScreenItem = (item) => {
    localStorage.setItem('productScreenItem', JSON.stringify(item))
};

export const getProductScreenItem = () =>{
    const ProductScreenItem = localStorage.getItem('productScreenItem') ?
        JSON.parse(localStorage.getItem('productScreenItem')) : {};
    return ProductScreenItem;
}


// CART SCREEN //

export const setCartItems = (cartItems) => {
    console.log('UUU__', cartItems);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

export const getCartItems = () => {
    const cartItems = localStorage.getItem('cartItems') ?
        JSON.parse(localStorage.getItem('cartItems')) : [];
    return cartItems;
}

export const cleanCart = () => {
    localStorage.removeItem('cartItems');
};

// SIGNIN and REGISTER SCREEN //

export const setUserInfo = ({
    fname = '',
    lname = '',
    mobile = '',
    email = '',
    password = '',
    userId = '',
    isAdmin = ''
}) => {
    localStorage.setItem('userInfo', JSON.stringify({
        fname, lname, mobile, email, password, userId, isAdmin
    }))
}

export const clearUser = () => {
    localStorage.removeItem('userInfo');
};

export const getUserInfo = () => {
    return localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo')) : {};
}


// SHIPPING SCREEN //

export const setShippingInfo = ({
    fullName = '',
    mobile = '',
    address = '',
    city = '',
    postalCode = '',
    country = ''
}) =>{
    localStorage.setItem('shippingDetails', JSON.stringify({
        fullName, mobile, address, city, postalCode, country
    }))
}

export const getShippingInfo = () => {
    return localStorage.getItem('shippingDetails') ? JSON.parse(localStorage.getItem('shippingDetails')) : {};
}

// PAYMENT SCREEN //

export const setPayment = ({paymentMethod = 'Google Pay'}) => {
    localStorage.setItem('payment', JSON.stringify({paymentMethod}))
}

export const getPayment = () => {
    const payment = localStorage.getItem('payment') ?
        JSON.parse(localStorage.getItem('payment')) : {
            paymentMethod: 'Google Pay'
    }
    return payment
}

// product create img //

export const setImaget = (img) => {
    console.log("LLL ", img)
    localStorage.setItem('image', JSON.stringify({img}))
}

export const getImage = () => {
    const productImage =  JSON.parse(localStorage.getItem('image'))
    console.log("MMM ", productImage)
    return productImage;
}