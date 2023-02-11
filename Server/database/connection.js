const mongoose = require('mongoose')

const connectDB = async (url) => {
    mongoose.set('strictQuery', true);
    mongoose.connect(url, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log(err);
        else {
            console.log("connected");
            // taken data direct to mongodb
            const fetchData = await mongoose.connection.db.collection("foodData");
            fetchData.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("foodCategory")
                foodCategory.find({}).toArray(function (err, catdata) {
                    if (err) console.log(err);
                    else {
                        // assign to global variable
                        global.foodData = data;
                        global.foodCategory = catdata;
                    }
                });

            });
        }
    });
};

module.exports = connectDB;