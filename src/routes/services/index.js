const express = require("express");
const router = express.Router();
const Service = require("../../models/Service");

router.get('/services', async (req, res) => {
    const filter = req.query;
    console.log(filter);
    const query = {
        // price: { $lt: 150, $gt: 50 }
        // db.InspirationalWomen.find({first_name: { $regex: /Harriet/i} })
        title: {$regex: `${filter.search}`, $options: 'i'}
    };

    // const options = {
    //     sort: {
    //         price: filter.sort === 'asc' ? 1 : -1
    //     }
    // };

    const cursor = await Service.find(query);
    console.log(cursor);
    res.send(cursor);
})


module.exports = router;