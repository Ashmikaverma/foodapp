const mongoose=require('mongoose')
const mongoURI='mongodb+srv://ashmikaverma:aashi123@cluster0.fgvf9qj.mongodb.net/gofoodmern?retryWrites=true&w=majority';


const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const collection = mongoose.connection.db.collection("food_items");
    const fetchedData = await collection.find({}).toArray();
    
    //console.log('Fetched Data:', fetchedData);
const foodCategory= await mongoose.connection.db.collection("foodCategory");
const Category_data=await foodCategory.find({}).toArray();
    
    global.food_items = fetchedData;
    global.foodCategory=Category_data;
    //console.log('Global Food Items:', global.food_items);
} catch (err) {
     console.error('Error connecting to MongoDB:', err.message);
    throw err;
  }
};

module.exports = mongoDB;