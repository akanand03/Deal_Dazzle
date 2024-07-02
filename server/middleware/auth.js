import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "No authorization token provided" });
    }
    
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500; // You might want to clarify or adjust this logic

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }    

    next();
  } catch (error) {
    console.log("Authentication middleware error:", error);
    res.status(403).json({ message: "Unauthorized" });
  }
};

export default auth;
