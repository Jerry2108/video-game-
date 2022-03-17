import StripeCheckout from 'react-stripe-checkout';
//import 'dotenv/config';

const onToken = (user,checkout) => token => checkout(user, token.id);
const STRIPE_PUBLISHABLE = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

var Checkout = ({user, checkout, amount})=>{
    return (<StripeCheckout
        amount = {amount*100}
        token = {onToken(user, checkout)}
        currency = "USD"
        stripeKey = {STRIPE_PUBLISHABLE}
    />)
}
export default Checkout;
