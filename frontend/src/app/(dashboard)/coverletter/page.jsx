'use client'
import React, { useState, useEffect } from 'react'

const Page = () => {
  const [coverLetter, setCoverLetter] = useState({ title: '', content: '' })

  useEffect(() => {
    const fetchSummaries = async () => {
      const response = await fetch('/api/coverletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jobDescriptio:
            'we want someone expert in nextjs and reactjs to handle the frontend work with testing and can handle backend also',
          experiences: [
            {
              title: 'full stack developer'
            }
          ],
          skills: ['Javascript'],
          Projects: [
            {
              title: 'Resume application web app'
            }
          ],
          Certifications: [
            {
              title: 'Reactjs mastery'
            }
          ]
        })
      })

      let data = await response.json()
      data = JSON.parse(data.coverletter)
      setCoverLetter(data)
    }

    fetchSummaries()
  }, [])

  return (
    <div>
      <h1>Cover Letter</h1>
      <h2>{coverLetter.title}</h2>
      <p>{coverLetter.content}</p>
    </div>
  )
}

export default Page
