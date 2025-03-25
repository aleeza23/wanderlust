const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./reviews.js")

//define schema
const listingSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    image: {
        url: String,
        filename: String
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

//post middleware to delete reviews from review model when delete a list
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } })
    }
})

//create collection
const Listing = mongoose.model("Listing", listingSchema)

//export collection to insert documents in it
module.exports = Listing;