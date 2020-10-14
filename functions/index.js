const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51HbPFTLDSvWIoAxq7mrM1bUFynHbIyNyfKIOcfZWFi5XQLtCsCTrnFAjF8SHyLiZHiCEOOj7RwQZPeHlLXqAiECm00bc4EV8TF"
)

// API setup

// API configuration
    const app = express();

// middlewares
app.use(cors ({ origin: true }));
app.use(express.json());

// API routes
app.get("/", (request, response) => response.status(200).send("BreadWorks is in the HOUSE!"));


// /payment/create is from payment.js from the use effect
// total is also from payment.js but note that this is a jsquery
app.post(`/payments/create`, async (request, response) => {
    const total = request.query.total;

    console.log("Payment Request Received! AMAZING RIGHT!? the amount is right here ===>", total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // this will be in subunits since we multiplied in the payment.js
        currency: "usd",
    });
    // 201 means its created or the state is ok
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

// Listener commands for routes
exports.api = functions.https.onRequest(app);


//heres the endpoint API http://localhost:5001/clone-c221c/us-central1/api


