import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

import '../styles/css/StripeContainer.css';

const PUBLIC_KEY = "pk_test_51M4cQtF8BTMOqBJGnKcLEzIKc7e2DfFvGSf4ZKXxR5pqaRwe47eBK4oQMFnuXgjJq1HVNWTpOQG7mtaIR8lGCFxH00egt6j9VQ";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer(props) {
	return (
		<div className="stripecontainer">
			<h2>Purchase Credits</h2>
			<Elements stripe={stripeTestPromise}>
				<PaymentForm credits={props.credits} studentId={props.studentId} subtotal={props.subtotal} setPaymentDetails={props.setPaymentDetails}/>
			</Elements>
		</div>
	)
}
