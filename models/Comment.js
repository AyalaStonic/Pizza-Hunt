const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
  writtenBy: {
    type: String
  },
  commentBody: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ReplySchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment _id
      replyId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      replyBody: {
        type: String,
        required: true
      },
      writtenBy: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
  )

//   addReply({ params, body }, res) 
//   {
//     Comment.findOneAndUpdate(
//       { _id: params.commentId },
//       { $push: { replies: body } },
//       { new: true, runValidators: true }
//     )
//     };

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
