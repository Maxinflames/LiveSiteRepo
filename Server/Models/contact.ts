/**
 * File: contact.ts
 * Author: Maximus Vanhaarlem
 * Author Id: 100758975
 * Date: 4/24/2022
 */
 import mongoose from 'mongoose';
const Schema = mongoose.Schema; // alias

const ContactSchema = new Schema
({
    FullName: String,
    ContactNumber: String,
    EmailAddress: String
},
{
    collection: "contacts"
});

const Model = mongoose.model("Contact", ContactSchema);
export default Model;