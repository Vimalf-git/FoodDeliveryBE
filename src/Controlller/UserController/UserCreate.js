import auth from "../../Common/Auth/Auth.js";
// import postModel from "../../Model/Post/Post.js";
import userModel from "../../Model/UserModel/User.js"
import cloudnary from 'cloudinary'


const create = async (req, res) => {
    try {
        let data = await userModel.findOne({ email: req.body.email })
        if (!data) {
            req.body.password = await auth.hashPassword(req.body.password)
            await userModel.create(req.body)
            res.status(201).send({ message: 'successfully userCreated' })
        } else {
            res.status(400).send({ message: 'user exist' })
        }
    } catch (error) {
        res.status(500).send({ message: 'failed store data', error: error.message })
    }

}



const updateUserInfo = async (req, res) => {
    try {
        cloudnary.config({
            cloud_name: "dfjc0pkpp",
            api_key: "588969669952431",
            api_secret: "SaArGafJGobXIJzjmYNoAKwaEY8"
        })
        let UserData = await userModel.findOne({ email: req.body.email })
        // let postData = await postModel.find({ mail: req.body.email })
        // if (postData) {
        //     await postData.forEach((e) => {
        //         e.name = req.body.username;
        //         e.save();
        //     })
        // }

        if (UserData) {
            if (req.file) {
                const result = await cloudnary.v2.uploader.upload(req.file.path)
                UserData.username = req.body.username ? req.body.username : UserData.username
                UserData.profileImgUrl = result.url;
                UserData.public_id = result.public_id;
                await UserData.save()
            }
            else {
                UserData.username = req.body.username
                await UserData.save()

            }
            res.status(200).send({ message: 'profile updated successfully' })
        }

        else {
            res.status(400).send({ message: 'please update later' })
        }
    } catch (error) {
        res.status(500).send({ message: error })
    }
}
const getuser = async (req, res) => {
    try {
        let dbdata = await userModel.findOne({ email: req.params.email });
        if (dbdata) {
            res.status(200).send({ message: 'data fetched', user: dbdata })
        }
    } catch (error) {
        res.status(500).send({ message: error })
    }
}
const getUserList = async (req, res) => {
    try {
        let dbRes = await userModel.find();
        if (dbRes) {
            let userList = dbRes.map((e) => {return{
                name:e.username,
                profilePic:e.profileImgUrl,
                mail:e.email
            }});
            res.status(200).send({ message: 'data fetched successfully', userList })
        } else {
            res.status(404).send({ message: 'No Friends' })
        }
    } catch (error) {
        res.status(500).send({ message: error })
    }
}

export default { create, getUserList, updateUserInfo, getuser }