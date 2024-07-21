const functions = require("firebase-functions");
const logger = require("firebase-functions/logger");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const stripe = require("stripe")(functions.config().stripe.secret_key);

// App configuration
const app = express();

// Middlewares
app.use(cors({origin: true}));
app.use(express.json()); // Parse incoming JSON requests

// API Routes
app.get("/", (req, res) => res.status(200).send("Hello World"));

app.post("/payments/create", async (req, res) => {
  try {
    const total = parseInt(req.query.total, 10);

    if (isNaN(total) || total <= 0) {
      return res.status(400).send({
        error: {
          message: "Invalid amount specified."
        }
      });
    }

    logger.info("Payment Request Received, for this amount >>> ", total);

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // Amount in the smallest currency unit (e.g., cents)
      currency: "usd"
    });

    logger.info("Payment Intent Created:", paymentIntent.id);

    // Send the clientSecret to the client
    res.status(201).send({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    logger.error("Error creating payment intent:", error);
    res.status(500).send({
      error: {
        message: "Internal server error. Please try again later."
      }
    });
  }
});

// Export the API
exports.api = functions.https.onRequest(app);
