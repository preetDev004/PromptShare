import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
    email:{
        type: String,
        unique:[true, 'Email already exists!'],
        required: [ true,'Please enter an Email!']
    },
    username:{
        type: String,
        unique:[true, 'username already exists!'],
        required: [ true,'Please enter Username!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image:{
        type:String
    }
})
// normal express
// const User = model("User", userSchema);
// export default  User;

const User = models.User || model("User", userSchema);
export default User;