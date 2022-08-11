import mongoose from "mongoose";
import { Password } from "../services/password";

// An interface that describes the properties
// that are required to create a new User

interface UserAttrs {
    email: string;
    password: string;
}

// An interface that describes the properties that a User model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc
}

// An interface that describes the properties that a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}




const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        //restructure return "NEW USERS"
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }
    done();
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

// <> as being types provided to a function as arguments
// Allow us to custonmise the types being used inside of a function, a class or an interface
const User = mongoose.model<UserDoc, UserModel>('User', userSchema)



export { User };