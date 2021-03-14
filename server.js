const app = require('./app')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Vijay:hqjh3WjLbeR0I9xB@cluster0.hjhk3.mongodb.net/Bank?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(
    console.log('connection successful')
)

const port = process.env.PORT || 3850;

app.listen(port, () => {
    console.log('Listening at 3850')
})