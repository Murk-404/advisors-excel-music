import { GPTResponse, Choice } from "../types/GPT.ts";
import dotenv from "dotenv";

dotenv.config();

export class GPTClient {
  apiKey: string;
  apiUrl: string;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY as string;
    this.apiUrl = "https://api.openai.com/v1/images/generations";
  }

  public async getResponse(
    prompt: string,
    n: number = 1,
    size: string = "1024x1024"
  ): Promise<Choice[] | []> {
    const requestBody = {
      prompt,
      n,
      size,
    };

    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });
    if (response.ok) {
      const data = (await response.json()) as GPTResponse;
      // const choiceArr = data.data.map((choice) => choice.url);
      const choiceArr = data.data;
      console.log("choiceArr: ", choiceArr);
      return choiceArr;
    } else {
      console.error("Error:", response.statusText);
      return [];
    }
    // .catch((error) => {
    //   console.error("Error:", error);
    // });

    // data.map((choice: any) => choice.url)

    // const response = await fetch(this.apiUrl, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${this.apiKey}`,
    //   },
    //   body: JSON.stringify(requestBody),
    // });

    // if (response.ok) {
    //   const data = (await response.json()) as GPTResponse;
    //   const contentArray = ['hello', 'world']
    //   // const contentArray = data.choices.map((choice) => choice.message.content);
    //   console.log("contentArray: ", contentArray);
    //   return contentArray;
    // } else {
    //   console.error("Error:", response.statusText);
    // }
  }
}
