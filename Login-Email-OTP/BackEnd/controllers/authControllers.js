const Usermodel = require('../models/usresmodels');
const bcrypt = require('bcryptjs');
const crypto = require('crypto')
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie');
const { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail ,sendResetSuccessEmail} = require('../Mailtrap/emails'); 

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const userAlreadyExists = await Usermodel.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new Usermodel({
            username,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });

        await user.save();

        generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            message: 'User created successfully',
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const verifyEmail = async (req, res) => {
    const { code } = req.body;

    try {
        const user = await Usermodel.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or Expired verification code" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();

        await sendWelcomeEmail(user.email, user.username);

        res.status(200).json({
            message: "Verification is Successful",
            user: {
                ...user._doc,
                password: undefined
            }
        });
    } catch (error) {
        console.error("Error verifying email:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    const {email,password}= req.body

    try{
      const user = await Usermodel.findOne({email})
      if(!user){
        return res.status(400).json({message:"Invalid credentials"})
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)

      if(!isPasswordValid){
        return res.status(400).json({message:"Invalid password"})
      }

      generateTokenAndSetCookie(res, user._id);
     
         user.lastLogin = new Date()
         await user.save()

         res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
    }catch(err){
        console.log("Error in login ", err);
		res.status(400).json({ success: false, message: err.message });
    }
};

const logout = async (req, res) => {
    res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};

const forgotPassword = async (req,res)=>{
    const {email}= req.body

    try{
         const user = await Usermodel.findOne({email})

         if(!user){
            return res.status(400).json({message:"User not found"})
         }

         const resetToken = crypto.randomBytes(20).toString("hex")
         const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000

         user.resetPasswordToken = resetToken
         user. resetPasswordExpiresAt =resetTokenExpiresAt
   
   await user.save()

   //sendemail
   await sendPasswordResetEmail(user.email, `http://localhost:3115/reset-password/${resetToken}`)
  
res.status(200).json({message:"Password reset link sent to your Email"})
        }catch(err){
            console.log("Error in login ", err);
            res.status(400).json({ success: false, message: err.message });
    }
}

const resetPassword = async(req,res) =>{
    try{
        const { token } = req.params;
		const { password } = req.body;

        const user = await Usermodel.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt:{$gt: Date.now()}
            })
            if (!user) {
                return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
            }

            //update password
        const hashedPassword = await bcrypt.hash(password,10)

        user.password = hashedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpiresAt = undefined
        await user.save()

        await sendResetSuccessEmail(user.email)
        res.status(200).json({ success: true, message: "Password reset successful" }); 

    }catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ message: error.message });
	}
}

module.exports = { signup, login, logout, verifyEmail, forgotPassword, resetPassword };
