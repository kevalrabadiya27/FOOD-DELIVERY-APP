const express = require('express');
const router = express.Router();

router.post('/foodData', async (req, res) => {
    try {
        res.send([global.foodData, global.foodCategory]);
    } catch (error) {
        console.error(error.message);
        res.send({ error: true }, "DisplayData.js file");
    }
})

module.exports = router;