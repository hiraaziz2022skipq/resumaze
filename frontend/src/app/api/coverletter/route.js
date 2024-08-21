import { NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function getGroqChatCompletion(prompt) {
  return groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'You are a professional resume writer, skilled in creating compelling cover letters tailored to specific job descriptions.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    model: 'llama3-8b-8192'
  })
}

export async function POST(request) {
  const { jobDescription, experience, education, skills, projects, certifications } = await request.json()

  const prompt = `Generate a cover letter based on the following information:
  
    Job Description: ${jobDescription}
    Experience: ${JSON.stringify(experience)}
    Education: ${JSON.stringify(education)}
    Skills: ${JSON.stringify(skills)}
    Projects: ${JSON.stringify(projects)}
    Certifications: ${JSON.stringify(certifications)}
    
    Create a compelling cover letter with a title and description. The cover letter should highlight the candidate's relevant skills and experiences that match the job description. The response should be in valid JSON format with no additional text with the following structure:
    {
        "title": "Cover Letter Title",
        "content": "Cover Letter Content"
    }
    
    The content should be a well-structured paragraph of about 200-250 words.`

  const chatCompletion = await getGroqChatCompletion(prompt)
  console.log(chatCompletion.choices[0]?.message?.content || '{}')
  return NextResponse.json({
    coverletter: chatCompletion.choices[0]?.message?.content || '{}'
  })
}
