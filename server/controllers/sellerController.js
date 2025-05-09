import jwt from "jsonwebtoken";

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "null" : "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return res.json({ success: true, message: "Logged In" });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message});
  }
};

export const isSellerAuth=async(req,res)=>{
    try {
        return res.json({success:true})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message})
    }
}

export const sellerLogout=async(req,res)=>{
  try {
    res.clearCookie('sellerToken',{
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "null" : "strict",
    })

    return res.json({success:true, message: "Logged Out"})
    
} catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: "error.message" });
}
}