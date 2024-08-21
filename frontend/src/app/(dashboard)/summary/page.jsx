'use client'
import React, { useState, useEffect } from 'react'

const Page = () => {
  const [summaries, setSummaries] = useState([])

  useEffect(() => {
    const fetchSummaries = async () => {
      const response = await fetch('/api/generatesummary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
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

      const data = await response.json()
      try {
        console.log('data : ', data)
        const parsedSummaries = JSON.parse(data.summaries)
        console.log('parse : ', parsedSummaries)
        setSummaries(parsedSummaries)
      } catch (error) {
        console.error('Failed to parse summaries:', error)
        setSummaries([data.summaries])
      }
    }

    fetchSummaries()
  }, [])

  return (
    <div>
      <h1>Professional Summaries</h1>
      {summaries.map((summary, index) => (
        <div key={index}>
          <h2>Summary {index + 1}</h2>
          <p>{summary}</p>
        </div>
      ))}
    </div>
  )
}

export default Page
