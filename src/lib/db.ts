import mongoose from "mongoose"

const mongoUrl = process.env.MONGODB_URL
if (!mongoUrl) {
    throw new Error("MONGODB_URL is not set")
}

let cache = global.mongoose
if (!cache) {
    cache = global.mongoose = { conn: null, promise: null }
}

const connectDb = async () => {
    if (cache.conn) {
        return cache.conn
    }
    if (!cache.promise) {
        cache.promise = mongoose.connect(mongoUrl).then((m) => m.connection)
    }

    cache.conn = await cache.promise
    return cache.conn
}

export default connectDb
