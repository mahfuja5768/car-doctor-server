const { Schema, model } = require("mongoose");

const ServiceSchema = new Schema({
  service_id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  facility: [
    {
      name: {
        type: String,
        required: true,
      },
      details: {
        type: String,
        required: true,
      },
    },
  ],
});

const Service = model("Service", ServiceSchema);
console.log(Service);

module.exports = Service;
