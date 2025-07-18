import mongoose , {Schema , model} from "mongoose";

const videoSchema = Schema(
    {
        videoFile: {
            type: String,
            required: true
        },

        thumbnail: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: true
        },

        duration: {
            type: Number,
            required: true
        },

        views: {
            type: Number,
            default: 0
        },

        isPublished: {
            type: Boolean,
            default: true
        },

        videoOwner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }

    },

    {timestamps : true}
)



export const Video = new model("Video", videoSchema)