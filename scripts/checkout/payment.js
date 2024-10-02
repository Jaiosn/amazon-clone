import { cart } from "../../data/cart.js";
import { getDeliveryOptionId } from "../../data/deliveryOption.js";
import { getProducts } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

export function paymentSummary(){
    let price = 0;
    let deliveyprice = 0;
    cart.forEach(cartItem => {
       const matchingProduct = getProducts(cartItem.productId);

        price += matchingProduct.priceCents * cartItem.quantity;
        
        const deliveryOptionid = getDeliveryOptionId(cartItem.deliveryOptionId);
        deliveyprice += deliveryOptionid.price

                

    })
 
    const beforeTax = price + deliveyprice;
    const tax = beforeTax * 0.1;
    const afterTax = beforeTax-tax
       
    const paymentSummaryHTML = `
    <div class="payment-summary">
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">$ ${formatCurrency(price)} </div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(deliveyprice)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(beforeTax)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(tax)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(afterTax)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
    </div>
    `;
    document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML;
    

    
}