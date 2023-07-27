const mongoose = require('mongoose')


const blogSchema = mongoose.Schema({
    url: {
        type:String,
        required: true
    },
    title: {
        type:String,
        required: true
    },
    author: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: Number,
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        return {
            url: returnedObject.url,
            title: returnedObject.title,
            author: returnedObject.author,
            user: returnedObject.user,
            likes: returnedObject.likes,
            id: returnedObject._id.toString()
        }
        /*
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        */
    }
})

module.exports = mongoose.model('Blog', blogSchema)


