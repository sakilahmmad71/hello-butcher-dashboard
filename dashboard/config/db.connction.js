// importing/requiring external dependencies
const mongoose = require('mongoose');

// MongoDB connection string/URI
const mongoURI = `mongodb+srv://hello-butcher:butcher123@hello-butcher.cb3zi.mongodb.net/hello-butcher?retryWrites=true&w=majority`;

// MongoDB has some depricated warning this options ignore the warnings
const connectionOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
};

const dataBaseConnection = async () => {
    try {
        await mongoose.connect(mongoURI, connectionOptions);
        console.log('MongoDB Connected Successfully.');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = dataBaseConnection;
