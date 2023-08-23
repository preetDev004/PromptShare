import { Schema, models, model } from "mongoose";

const PromptSchema = new Schema({
    creator:{
        type: Schema.Types.ObjectId, // a creator going to be document in the database more specifically a user type
        ref:'User', // one user can create many prompts
    },
    prompt:{
        type :String ,
        require:[true, "Prompt is required!"]
    },
    tag:{
        type: String,
        require:[true, "Tag is required!"]
    }
})
const Prompt = models.Prompt || model("Prompt", PromptSchema);
export default Prompt;
