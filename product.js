const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shop', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connection open")
    })
    .catch(err =>{
        console.log('Oh no Err');
    })

const productSchema = new mongoose.Schema({
    name: { 
        type: String,
        maxlength: 20
    },
    price: {
        type: Number,       //if having string than err but if string an be converted to number than ok like "999"
        required: true,
        min: 0   //but if use
        // min: [0 , 'shows error but take min 0 i.e, start one']
    } ,
    onSale: {
        type: Boolean,
        default: false  //gives default if not given
    },
    category: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S' , 'M' , "L"]  //take value from this not anything else
    }
})

// productSchema.methods.greet = function (){
//     console.log("Hello Hi Howdy");
//     console.log(`${this.name}`)
// }

productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();                             //this refer to particular instance like  foundproduct
}

productSchema.statics.fireSale = function(){
    this.updateMany({} , {onSale: true , price: 0}) // but this refer to Product directly
}

productSchema.methods.addCategory = function (newCat) {
    this.category.push(newCat);
    return this.save();
}

const Product = mongoose.model('Product' , productSchema);

const findProduct = async()=>{
    const foundProduct = await Product.findOne({name: 'Helmet'});
    console.log(foundProduct);
    await findProduct.toggleOnSale();
    console.log(foundProduct)
    await findProduct.addCategory('Outdoors');
    console.log(foundProduct)
    // findProduct.greet();
    // findProduct.save();
}

findProduct();
Product.fireSale().then(res => console.log(res));

//const bike = new Product({ name: 'MOuntain Blue' , price: 590 , category: ["hi" , "hello" , "hethere"]});
// bike.save()
// .then(data => {
//     console.log("Completed Task")
//     console.log(data)
// })
// .catch(err =>{
//     console.log("Oh no error!!");
// })

//Product.findOneAndUpdate({name: 'Tire Pump'} , {price: -100} , {new: true})//donot give error than try
Product.findOneAndUpdate({name: 'Tire Pump'} , {price: -100} , {new: true , runValidators: true})
.then(data => {
    console.log("Completed Task")
    console.log(data)
})
.catch(err =>{
    console.log("Oh no error!!");
})