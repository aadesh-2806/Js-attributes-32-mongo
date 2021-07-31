const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movieApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connection open")
    })
    .catch(err =>{
        console.log('Oh no Err');
    })
// const db = mongoose.connection;
// db.on('error' , console.error.bind(console , 'connection error'));
// db.once('open' , function() {
//     console.log('connection open');
// })

/*Movie = {
        title: "nfdjnjas",
        year: 1968,
        rating: 9.2,
        score: '100%'
    }*/

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    rating: Number,
    score: String
})     

const Movie = mongoose.model('Movie' , movieSchema)

//--------------const amadeus = new Movie({ title: "amadeus", year: 1968,  rating: 9.2,  score: '100%'});
//amadeus.save();

//amadeus gives the class
//in mongo mongoApp is used as db and amadeus passed in it by using amadeus.save()  saves it and form a data in mongoApp database
//to make changes do amadeus.score = "231" and than amadeus.save()  changes score in db

Movie.insertMany([
    { title: "amadeus", year: 1968,  rating: 9.2,  score: '90%'},
    { title: "sdznjlfn m", year: 1969,  rating: 9.3,  score: '95%'},
    { title: "mcnvnje jvxd", year: 1970,  rating: 9.4,  score: '96%'},
    { title: "nfdjnjas njdsn", year: 1971,  rating: 9.5,  score: '1sd'},
    { title: "nfdjnjasdnf df n", year: 1972,  rating: 9.2,  score: 'jsnd'}
])
//direct save or  can say direct append

//for finding in mongoose
Movie.findOne({title: "amadeus"}).then(data => console.log(data));
Movie.find({_id: '32444rfdnj43878347njfn38bu48' }).then( data => console.log(data));
Movie.findById('32444rfdnj43878347njfn38bu48').then( data => console.log(data));

//for updating in mongoose
Movie.updateOne({title: 'amadeus'} , {year: 1984}).then(res => console.log(res));
//gives updated amadeus
Movie.updateMany({title: {$in: ['amadeus' , 'mcnvnje jvxd']}} , {score: "85%"}).then(res => console.log(res));
//update both

////
Movie.findOneAndUpdate({title: 'amadeus'} , {year: 1982}).then(res => console.log(res));
//gives old version on screen but in mongo data is updated    so,
Movie.findOneAndUpdate({title: 'amadeus'} , {year: 1982} , {new: true}).then(res => console.log(res));

Movie.find({title: {$in: ['amadeus' , 'mcnvnje jvxd']}} , {score: "85%"}).then(res => console.log(res));

//removing
Movie.remove({title: 'nfdjnjas njdsn'}).then(msg => console.log(msg));
Movie.deleteMany({year: {$gte: 1970}}).then(msg => console.log(msg));
Movie.findOneAndDelete({title: 'mcnvnje jvxd'}).then(msg => console.log(msg));//return deleted one and delete again or can say give glimpse