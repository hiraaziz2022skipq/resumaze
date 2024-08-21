'use client'
import { Grid } from "@mui/material";
import CreateCoverLetter from "./CreateCoverLetter";
import CoverGeneratedDetail from "./CoverGeneratedDetail";
import { useState } from "react";

const CoverLetterPage = () =>{



    const [coverLetter, setCoverLetter] = useState({ title: '', content: '' })

    const sanitizeJsonString = (jsonString) => {
        // Remove trailing commas before closing braces or brackets
        return jsonString
            .replace(/,\s*([\]}])/g, '$1') // Remove trailing commas
            .replace(/[\x00-\x1F\x7F-\x9F]/g, ''); // Remove unescaped control characters
    };


    const fetchSummaries = async (jobDes) => {
        const response = await fetch('/api/coverletter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            jobDescription:
            jobDes,
            experiences: [
              {
                title: ''
              }
            ],
            skills: [''],
            Projects: [
              {
                title: ''
              }
            ],
            Certifications: [
              {
                title: ''
              }
            ]
          })
        })
  
        let data = await response.json()
      try {
            // Sanitize the coverletter JSON string
            const sanitizedCoverLetter = sanitizeJsonString(data.coverletter);
            // Parse the sanitized coverletter JSON string
            const parsedCoverLetter = JSON.parse(sanitizedCoverLetter);
            setCoverLetter(parsedCoverLetter); // Set the state with parsed JSON object
        } catch (error) {
            console.error('Error parsing coverletter JSON:', error);
            setCoverLetter(''); // Handle errors and clear state if necessary
        }
      }


    const onSubmit = (title) =>{
        fetchSummaries(title)
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
            <Grid container spacing={6}>
              <Grid item xs={12}> 
                <CreateCoverLetter onSubmit={onSubmit}/>
              </Grid>
      
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <CoverGeneratedDetail data={coverLetter.content} title={coverLetter.title}/>
              </Grid>
            
            </Grid>
          </Grid>
        </Grid>
      )
}

export  default CoverLetterPage