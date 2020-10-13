const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    "sk_test_51HbPFTLDSvWIoAxq7mrM1bUFynHbIyNyfKIOcfZWFi5XQLtCsCTrnFAjF8SHyLiZHiCEOOj7RwQZPeHlLXqAiECm00bc4EV8TF"
)

// API setup

// API configuration
    const app = express();

// middlewares
app.use(cors ({ origin: true }));
app.use(express.json());

// API routes
app.get("/", (request, response) => response.status(200).send("deon is here!"));

// Listener commands for routes
exports.api = functions.https.onRequest(app);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
