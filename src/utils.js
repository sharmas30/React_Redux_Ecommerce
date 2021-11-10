import './css/utils.css';

export const checkoutSteps = (_state) => {
    console.log("STEP ", _state);
    return (
        <div className='checkout-steps'>
            <div className = {`${_state.step1 ? "active" : ""}`}>Signin</div>
            <div className = {`${_state.step2 ? "active" : ""}`}>Shipping</div>
            <div className = {`${_state.step3 ? "active" : ""}`}>Payment</div>
            <div className = {`${_state.step4 ? "active" : ""}`}>Place Order</div>
        </div>
    )
}
