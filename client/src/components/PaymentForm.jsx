import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PaymentForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:8080/stripe/charge",
          {
            amount: props.subtotal * 100,
            id: id,
          }
        );

        props.setPaymentDetails(response.data);
        console.log("Stripe 35 | data", response.data.success);
        if (response.data.success) {
          console.log("PaymentForm.js 25 | payment successful!");

          let student = (await axios.get(`/students/${props.studentId}`)).data[0];
          let currentCredits = Number(student.credits);

          await axios.put(`/students/${props.studentId}`, null, { params: {
            credits: currentCredits + Number(props.credits)
          }})

          await axios.get(`/students/send/${student.email}/receipt/${props.credits}/${props.subtotal}`)

          navigate('/purchase/success');
        } else {
          navigate('/purchase/error');
        }
      } catch (error) {
        console.log("CheckoutForm.js 28 | ", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <CardElement />
      <button>Pay</button>
    </form>
  );
};