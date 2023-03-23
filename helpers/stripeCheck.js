import {loadStripe} from "@stripe/stripe-js"

export async function checkout({prodItems}) {
    let stripePromise = null;

    const getStripe = () => {
        if(!stripePromise){
            stripePromise = loadStripe(process.env.STRIPE_PUBLISHER_KEY)
        }
        return stripePromise;
    }

    const stripe = await getStripe();

    await stripe.redirectToCheckout({
        mode: "payment",
        prodItems,
        
    })
}