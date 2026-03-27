const express = require("express");
const apps = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai"); 

const sendMessage = async (req, res) => {
  try {
    console.log("API key",process.env.API)
    const ai = new GoogleGenerativeAI(process.env.GOOGLE_API);
    const message = req.body.message; 
    const prompt = `
      Here I am going to send you some message and based on that you have to tell me if I am sad, angry, etc. 
      In the next line, if I am happy suggest some positive aspects of being happy, and same for others. 
      If angry or bad reaction, suggest tips to reduce this habit. give a clear space between bullet point

      message: ${message}
      
    `;

        const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    console.log("result", result)
    res.send(result.response.text()); 

  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating response");
  }
};

apps.post("/sendmessage", sendMessage);

module.exports = apps;