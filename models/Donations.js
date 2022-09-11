import mongoose from "mongoose";

const DonationSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  quantity: { type: String, required: true },
  city: { type: String, required: true },
  verificationKey: { type: String, required: true },
});

const Donation = mongoose.model("donation", DonationSchema);

export default Donation;
