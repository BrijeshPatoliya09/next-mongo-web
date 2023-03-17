import mongoose from "mongoose"

const initDB = () => {
    if(mongoose.connections[0].readyState) {
        console.log("already connected");
        return;
    }

    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
    });

    mongoose.connection.on('connected', () => {
        console.log("connected to mongo");
    });

    mongoose.connection.on('error', (err) => {
        console.log("error in connecting", err);
    });
}

export default initDB;

