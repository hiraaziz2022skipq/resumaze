import { NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function getGroqChatCompletion(prompt) {
  return groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are a professional resume writer, skilled in creating impactful professional summaries.'
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
  const { experiences, skills, projects, certifications } = await request.json()

  let promptParts = []
  let responseParts = {}

  if (experiences) {
    promptParts.push(`Experiences: ${JSON.stringify(experiences)}`)
    responseParts.experiences = experiences
  }
  if (skills) {
    promptParts.push(`Skills: ${JSON.stringify(skills)}`)
    responseParts.skills = skills
  }
  if (projects) {
    promptParts.push(`Projects: ${JSON.stringify(projects)}`)
    responseParts.projects = projects
  }
  if (certifications) {
    promptParts.push(`Certifications: ${JSON.stringify(certifications)}`)
    responseParts.certifications = certifications
  }

  const prompt = `Based on the following information, generate 3 different professional summaries for a resume:

  ${promptParts.join('\n')}

  Each summary should be 2-3 sentences long, no more than 60 words.
  Only return a valid JSON array of 3 strings, with no additional text. Each string should contain one summary, 
  highlighting the candidate's key strengths, experiences, and achievements. Make each summary unique and 
  tailored to different aspects of the candidate's profile.`

  const chatCompletion = await getGroqChatCompletion(prompt)
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || '')
  return NextResponse.json({
    summaries: chatCompletion.choices[0]?.message?.content || ''
  })
}
