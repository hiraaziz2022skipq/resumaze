import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getGroqChatCompletion(prompt) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a professional resume evaluator skilled in calculating ATS scores based on provided resume data.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama3-8b-8192",
  });
}

export async function POST(request) {
  const { experience, education } = await request.json();

  // Define a prompt to send to Groq to calculate the ATS score
  const prompt = `Calculate the ATS score for the following resume data. Consider the following sections: personal info, education, experience, skills, certifications, projects. 
  Return only the ATS score as a percentage (0-100) and a list of tags indicating which sections are missing or lacking.

  Resume Data: 
    Experience: ${JSON.stringify(experience)}
    Education: ${JSON.stringify(education)}
  
  The response should be in valid JSON format with the following structure:
  {
      "atsScore": "number",
      "tags": ["string", "string"]
  }
  `;

  const atsResult = await getGroqChatCompletion(prompt);
  const atsData = JSON.parse(atsResult.choices[0]?.message?.content || "{}");

  return NextResponse.json({
    atsScore: atsData.atsScore || 0,
    tags: atsData.tags || [],
  });
}
