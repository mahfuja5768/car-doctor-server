// const express = require("express");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mz3fw7v.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//middlewares
const logger = async (req, res, next) => {
  // console.log("called:", req.host, req.originalUrl);
  next();
};



async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const serviceCollection = client.db("carDoctor").collection("services");
    const orderCollection = client.db("carDoctor").collection("orders");

   //jwt
  //  app.post("/jwt", async (req, res) => {
  //   const user = req.body;
  //   const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
  //     expiresIn: "365d",
  //   });
  //   res.send({ token });
  // });

  // const verifyToken = (req, res, next) => {
  //   // console.log("inside verifyToken", req.headers.authorization);
  //   if (!req.headers.authorization) {
  //     return res.status(401).send({ message: "Unauthorized access" });
  //   }
  //   const token = req.headers.authorization.split(" ")[1];
  //   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
  //     if (err) {
  //       return res.status(401).send({ message: "Unauthorized access" });
  //     }
  //     req.decoded = decoded;
  //     next();
  //   });
  // };



    // services related api
    app.get('/services', async (req, res) => {
      const filter = req.query;
      console.log(filter);
      const query = {
          // price: { $lt: 150, $gt: 50 }
          // db.InspirationalWomen.find({first_name: { $regex: /Harriet/i} })
          title: {$regex: filter.search, $options: 'i'}
      };

      const options = {
          sort: {
              price: filter.sort === 'asc' ? 1 : -1
          }
      };

      const cursor = serviceCollection.find(query, options);
      const result = await cursor.toArray();
      res.send(result);
  })

    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = {
        projection: { title: 1, price: 1, service_id: 1, img: 1 },
      };
      const result = await serviceCollection.findOne(query, options);
      res.send(result);
    });

    app.get("/orders", verifyToken, async (req, res) => {
      let query = {};
      if (req.query?.email) {
        query = { email: req.query.email };
      }
      const result = await orderCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/orders", verifyToken, async (req, res) => {
      const order = req.body;
      // console.log(order);
      const result = await orderCollection.insertOne(order);
      res.send(result);
    });

    app.patch("/orders/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedOrder = req.body;
      const updateDoc = {
        $set: {
          status: updatedOrder.status,
        },
      };
      const result = await orderCollection.updateOne(filter, updateDoc);
      // console.log(result);
      res.send(result);
    });
    app.delete("/orders/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await orderCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("doctor is running");
});

app.listen(port, () => {
  console.log(`car doctor server is running on port ${port}`);
});
