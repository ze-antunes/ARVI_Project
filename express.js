const express = require("express");
require("dotenv").config();
const { OpenAI } = require("openai");

const app = express();
let cors = require("cors");
app.use(cors());

app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

app.post("/find-complexity", async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await await openai.completions.create({
            model: "text-davinci-003",
            prompt: `
                    ${prompt}
                    ###
                    `,
            max_tokens: 2048,
        });

        return res.status(200).json({
            success: true,
            data: response.choices[0].text
        })
    } catch (error) {
        if (error.response) {
            console.log(error.response.status); // e.g. 401
            console.log(error.response.data.message); // e.g. The authentication token you passed was invalid...
            console.log(error.response.data.code); // e.g. 'invalid_api_key'
            console.log(error.response.data.type); // e.g. 'invalid_request_error'
        } else {
            console.log(error);
        }

        return res.status(400).json({
            success: false,
            error: error.response ? error.response.data : `There was an issue on the server - ` + error,
        })
    }
});

const port = process.env.Port || 5000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});