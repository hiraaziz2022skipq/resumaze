'use client'
import HorizontalLinearAlternativeLabelStepper from '@/components/stepper/StepperMui'
import { Button, Card, CardContent, Divider, Grid } from '@mui/material'
import PersonalDetail from './personal-details/Index'
import Template1 from '@/components/templates/template1'
import resumeFakeData from '@/fake-data/resume-fake-data'
import { useEffect, useState } from 'react'
import PersonalSummary from './personal-summary/Index'
import EmploymentHistory from './employment-history/Index'
import Skills from './skills/Index'
import dynamic from 'next/dynamic'
import { options } from '@/utils/create-resume/profileCompletionPercentage'
import axiosInstance from '@/utils/axiosInstance'
import Languages from './languages'
import Education from './education'
import Project from './project'
import Certificates from './certifications'
import SocialMedia from './social-media'
import References from './reference'
import {
  addCertificationsService,
  addEducationService,
  addExperienceService,
  addProjectsService,
  getCertificationsService,
  getEducationService,
  getExperienceService,
  getProfessionalInfoService,
  getProjectsService,
  getReferencesService,
  getSkillsService,
  getSocialMediaService,
  getStepsService,
  postProfessionalInfoService,
  postSkillsService,
  postSocialMediaService,
  updateCertificationsService,
  updateEducationService,
  updateExperienceService,
  updateProfessionalInfoService,
  updateProjectsService,
  updateSkillsService,
  updateSocialMediaService
} from '@/redux/create-resume/service'

// Next Imports
import { useRouter } from 'next/navigation'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const CreateResume = () => {
  // STATES

  const router = useRouter();
  const { id } = router.query; // Access the 'id' from the URL
  const resumeId = id
  const [currentStep, setCurrentStep] = useState(0)
  const [firstTimeVisit, setFirstTimeVisit] = useState({
    professional_info: false,
    skills: false,
    social_media: false
  })

  const [stepCompleted, setStepCompleted] = useState({
    professional_info: false,
    experience: false,
    projects: false,
    languages: false,
    social_media: false,
    education: false,
    certifications: false
  })

  const [professional_info, setProfessionalInfo] = useState({
    name: '',
    image: '/images/avatars/1.png',
    email: '',
    phone: '',
    address: '',
    nationality: '',
    date_of_birth: '',
    job_title: '',
    professional_summary: ''
  })

  const [experience, setExperience] = useState([])

  const [skill_set, setSkillsSet] = useState([])

  const [projects, setProjects] = useState([])

  const [education, setEduction] = useState([])

  const [certifications, setCertifications] = useState([])

  const [extra_info, setExtraInfo] = useState({
    key: '',
    value: ''
  })

  const [references, setReferences] = useState([])

  const [social_media, setSocialmedia] = useState({
    linkedin: '',
    github: '',
    twitter: '',
    facebook: '',
    instagram: '',
    youtube: '',
    website: ''
  })

  const [languages, setLanguages] = useState([])

  const [progress, setProgress] = useState(0)

  const series = [0]

  const onExpAdd = newExperience => {
    addExperienceService(resumeId, newExperience).then(res => {
      if (res.status === 200) {
        const newExp = res.data.experience
        setExperience([...experience, newExp])
        calculatePercentageOfSteps(res.data.steps)
      }
    })
  }
  const onExpEdit = (expId, data) => {
    updateExperienceService(resumeId, expId, data).then(res => {
      if (res.status === 200) {
        const updatedExperience = res.data.experience
        setExperience(prevExperience => prevExperience.map(exp => (exp.id === expId ? updatedExperience : exp)))
        calculatePercentageOfSteps(res.data.steps)
      }
    })
  }

  const onEducationAdd = newEducation => {
    addEducationService(resumeId, newEducation).then(res => {
      if (res.status === 200) {
        const newEdu = res.data.education
        setEduction([...education, newEdu])
        calculatePercentageOfSteps(res.data.steps)
      }
    })
  }
  const onEducationEdit = (eduId, data) => {
    updateEducationService(resumeId, eduId, data).then(res => {
      if (res.status === 200) {
        const updatedEdu = res.data.education
        setEduction(prevEdu => prevEdu.map(edu => (edu.id === eduId ? updatedEdu : edu)))
        calculatePercentageOfSteps(res.data.steps)
      }
    })
  }

  const onProjectAdd = newProj => {
    addProjectsService(resumeId, newProj).then(res => {
      if (res.status === 200) {
        const newProject = res.data.projects
        setProjects([...projects, newProject])
        calculatePercentageOfSteps(res.data.steps)
      }
    })
  }
  const onProjectEdit = (projId, data) => {
    updateProjectsService(resumeId, projId, data).then(res => {
      if (res.status === 200) {
        const updatedProjects = res.data.projects
        setProjects(prevProj => prevProj.map(pro => (pro.id === projId ? updatedProjects : pro)))
        calculatePercentageOfSteps(res.data.steps)
      }
    })
  }

  const onCertificationAdd = newCert => {
    addCertificationsService(resumeId, newCert).then(res => {
      if (res.status === 200) {
        const newCertification = res.data.certifications
        setCertifications([...certifications, newCertification])
        calculatePercentageOfSteps(res.data.steps)
      }
    })
  }
  const onCertificationEdit = (certId, data) => {
    updateCertificationsService(resumeId, certId, data).then(res => {
      if (res.status === 200) {
        const updatedCertifications = res.data.certifications
        setCertifications(prevCert => prevCert.map(cert => (cert.id === certId ? updatedCertifications : cert)))
        calculatePercentageOfSteps(res.data.steps)
      }
    })
  }

  const allData = {
    experiences: experience,
    skills: skill_set
  }
  const currentContent = [
    <PersonalDetail professional_info={professional_info} setProfessionalInfo={setProfessionalInfo} />,
    <EmploymentHistory
      experience={experience}
      setExperience={setExperience}
      onExpAdd={onExpAdd}
      onExpEdit={onExpEdit}
    />,
    <Education education={education} setEduction={setEduction} onEduAdd={onEducationAdd} onEduEdit={onEducationEdit} />,
    <Project projects={projects} setProjects={setProjects} onProjectAdd={onProjectAdd} onProjectEdit={onProjectEdit} />,
    <Certificates
      certifications={certifications}
      setCertifications={setCertifications}
      onCertAdd={onCertificationAdd}
      onCertEdit={onCertificationEdit}
    />,
    <Skills skill_set={skill_set} setSkillsSet={setSkillsSet} />,
    <Languages languages={languages} setLanguages={setLanguages} />,
    <PersonalSummary
      allData={allData}
      professional_info={professional_info}
      setProfessionalInfo={setProfessionalInfo}
    />,
    <SocialMedia social_media={social_media} setSocialmedia={setSocialmedia} />,
    <References references={references} setReferences={setReferences} />
  ]

  const calculatePercentageOfSteps = data => {
    const totalSteps = Object.keys(data).length
    const completedSteps = Object.values(data).filter(status => status).length
    const percentage = Math.round((completedSteps / totalSteps) * 100)
    setProgress(percentage)
  }
  const handleNext = () => {
    if (currentStep === currentContent.length - 1) {
      router.push('/home')
    } else {
      if (currentStep === 0) {
        if (firstTimeVisit.professional_info) {
          updateProfessionalInfoService(resumeId, professional_info).then(res => {
            if (res.status === 200) {
              setCurrentStep(currentStep + 1)
            }
          })
        } else {
          postProfessionalInfoService(resumeId, professional_info).then(res => {
            if (res.status === 200) {
              setCurrentStep(currentStep + 1)
              setFirstTimeVisit({
                ...firstTimeVisit,
                professional_info: true
              })
            }
          })
        }
      } else if (currentStep === 5) {
        if (firstTimeVisit.skills) {
          updateSkillsService(resumeId, skill_set).then(res => {
            if (res.status === 200) {
              setCurrentStep(currentStep + 1)
              calculatePercentageOfSteps(res.data.steps)
            }
          })
        } else {
          postSkillsService(resumeId, skill_set).then(res => {
            if (res.status === 200) {
              setCurrentStep(currentStep + 1)
              setFirstTimeVisit({
                ...firstTimeVisit,
                skills: true
              })
              calculatePercentageOfSteps(res.data.steps)
            }
          })
        }
      }
      if (currentStep === 8) {
        if (firstTimeVisit.social_media) {
          updateSocialMediaService(resumeId, { social_media: social_media }).then(res => {
            if (res.status === 200) {
              setCurrentStep(currentStep + 1)
            }
          })
        } else {
          postSocialMediaService(resumeId, { social_media: social_media }).then(res => {
            if (res.status === 200) {
              setCurrentStep(currentStep + 1)
              setFirstTimeVisit({
                ...firstTimeVisit,
                social_media: true
              })
            }
          })
        }
      } else {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handlePrev = () => {
    if (currentStep === 0) {
      return null
    }

    setCurrentStep(currentStep - 1)
  }

  useEffect(() => {
    if (currentStep === 0) {
      getStepsService(resumeId).then(resp => {
        if (resp.status === 200) {
          if (resp.data) {
            calculatePercentageOfSteps(resp.data)
          }
        }
      })
      getProfessionalInfoService(resumeId).then(resp => {
        if (resp.status === 200) {
          if (resp.data?.professional_info) {
            setProfessionalInfo({
              ...resp.data.professional_info
            })
            setFirstTimeVisit({
              ...firstTimeVisit,
              professional_info: true
            })
          }
        }
      })
    }
    if (currentStep === 1) {
      getExperienceService(resumeId).then(resp => {
        if (resp.status === 200) {
          if (resp.data.length > 0) {
            const allExp = resp.data
            setExperience([...allExp])
          }
        }
      })
    }
    if (currentStep === 2) {
      getEducationService(resumeId).then(resp => {
        if (resp.status === 200) {
          if (resp.data.length > 0) {
            const allEdu = resp.data
            setEduction([...allEdu])
          }
        }
      })
    }
    if (currentStep === 3) {
      getProjectsService(resumeId).then(resp => {
        if (resp.status === 200) {
          if (resp.data.length > 0) {
            const allProjs = resp.data
            setProjects([...allProjs])
          }
        }
      })
    }
    if (currentStep === 4) {
      getCertificationsService(resumeId).then(resp => {
        if (resp.status === 200) {
          if (resp.data.length > 0) {
            const allCert = resp.data
            setEduction([...allCert])
          }
        }
      })
    }
    if (currentStep === 5) {
      getSkillsService(resumeId).then(resp => {
        if (resp.status === 200) {
          if (resp.data.skills?.length > 0) {
            const skills = resp.data.skills
            setSkillsSet([...skills])
            setFirstTimeVisit({
              ...firstTimeVisit,
              skills: true
            })
          }
        }
      })
    }
    if (currentStep === 8) {
      getSocialMediaService(resumeId).then(resp => {
        if (resp.status === 200) {
          const newData = resp.data.social_media
          setSocialmedia({
            ...newData
          })
          setFirstTimeVisit({
            ...firstTimeVisit,
            social_media: true
          })
        }
      })
    }
    if (currentStep === 9) {
      getReferencesService(resumeId).then(resp => {
        if (resp.status === 200) {
          if (resp.data.references?.length > 0) {
            const newRefs = resp.data.references
            setReferences([...newRefs])
          }
        }
      })
    }
  }, [currentStep])
  return (
    <>
      <Grid
        container
        sx={{
          mt: 4,
          ml: 2,
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Grid item xs={10}>
          <Card>
            <CardContent>
              <Grid container alignItems='center' spacing={2}>
                <Grid item xs={10}>
                  <HorizontalLinearAlternativeLabelStepper currentStep={currentStep} setCurrentStep={setCurrentStep} />
                </Grid>
                <Grid item xs={2}>
                  <AppReactApexCharts
                    type='radialBar'
                    height={124}
                    width='100%'
                    options={options}
                    series={[progress]}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider variant='middle' />
            {currentContent[currentStep]}
            {/* <Grid container spacing={2} sx={{ p: 2, justifyContent: 'flex-end' }}>
              <Button variant='outlined' color='secondary' sx={{ mr: 1 }} onClick={handlePrev}>
                Back
              </Button>
              <Button  variant="outlined"
                color="secondary" onClick={handleNext}>
                {currentStep !== currentContent.length - 1  ? "Next" :  "Finish"}
              <Button variant='contained' onClick={handleNext}>
                {currentStep !== currentContent.length - 1 ? 'Next' : 'Finish'}
              </Button>
            </Grid> */}
          </Card>
        </Grid>

        {/* <Grid item xs={6}>
           <Template1 resumeData={resumeFakeData}/>
        </Grid> */}
      </Grid>
    </>
  )
}

export default CreateResume
