export const setProductScreenItem = (item) => {
    localStorage.setItem('productScreenItem', JSON.stringify(item))
};

export const getProductScreenItem = () =>{
    const ProductScreenItem = localStorage.getItem('productScreenItem') ?
        JSON.parse(localStorage.getItem('productScreenItem')) : {};
    return ProductScreenItem;
}