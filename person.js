const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/person', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connection open")
    })
    .catch(err =>{
        console.log('Oh no Err');
    })

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

personSchema.virtual('fullName')
    .get(function (){
        return `${this.first} ${this.last}`
    })

personSchema.pre('save' , async function (){        //before saved
    console.log("About to save");
})
personSchema.post('save' , async function () {      //after saved
    console.log("Just Saved");
})

const person = mongoose('person' , personSchema)
const k= new person({first: 'Kristen' , last: 'Sun'});
k.save();