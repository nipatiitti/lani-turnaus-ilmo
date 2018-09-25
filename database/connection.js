import mongoose from 'mongoose'
import CONFIG from '../config.js'

// Connect to the database in mongoDB atlas
mongoose.connect(CONFIG.MONGO.URL)

const db = mongoose.connection

export default db
