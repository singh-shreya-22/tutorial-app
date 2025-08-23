
import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const mealName = "Chicken Tikka";
const quantity = "1 cup";

const message = `You are a nutritionist coach and plan diet for professionals.
You will be asked to provide the calories, protein, carbs, and fat content of a given food item.
For food item ${mealName} of quantity ${quantity},
You will respond with a plain JSON object in the following format without the markdown block:
{
  "food": "food item",
  "quantity": "quantity in units provided",
  "nutritionalInfo": {
    "calories": "calories in kcal",
    "protein": "protein in grams",
    "carbs": "carbs in grams",
    "fat": "fat in grams"
  }
}`;

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: message,
  });
  console.log(response.text);
  if(response?.text != undefined) {
    const jsonResponse = JSON.parse(response.text);
    console.log("Parsed JSON Response:", jsonResponse);
  }
}

main();