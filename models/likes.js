const mongoose = require('mongoose'),
Schema = mongoose.Schema;


const likeSchema = new Schema ({
    _flix: {type: Schema.Types.ObjectId, ref: "Flix"},
    _user: {type: Schema.Types.ObjectId, ref: "User"}
})



const Like = mongoose.model('Like', likeSchema);


module.exports = Like;