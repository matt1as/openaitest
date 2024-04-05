// Rest API that that takes a text field as input and  uses openAI chatgpt4-preview to proofread the it
import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { ChatCompletionMessageParam, ChatCompletionTool } from "openai/resources/index.mjs";

const openai = new OpenAI();

function getOrderFromSAP(order_id : String ) {
    if ( order_id == '' ) {
        return "No order id provided"
    } else {
        return "Order status is in progress"
    }

}

// Function that that takes a text field as input and  uses openAI chatgpt4-preview to proofread the it
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Get query from a url parameter called text
    const text = req.query.text as string || '';

    //OpenAI message string for a helpful language teacher using the type ChatCompletionMessageParam
    const messages : ChatCompletionMessageParam[] = [{
        role: "system",
        content: `You are a helpful proof reader that will responde in JSON that should look liket this:
            { "original_text : "xxxxx", "proofread_text": "xxxxx", "errors" : [{"start": 0, "end": 1, "message": "xxxxxx"}]}
        `
        }, 
        {
            role: "user",
            content: text,
        }]


    const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo-0125",
        response_format: {type : "json_object"}
      });


      res.status(200).send(completion.choices[0].message.content);


 

}