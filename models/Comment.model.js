const { Schema, model } = require("mongoose");

const commentSchema = new Schema ({


    commenter: {

        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    
     },   
    
     user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },


      comment:String,



},

{
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }

);

const Comment = model("Comment", commentSchema);

module.exports = Comment;