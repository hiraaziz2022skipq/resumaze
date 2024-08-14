// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Collapse from '@mui/material/Collapse'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@core/components/option-menu'
import AddNewCard from '@components/dialogs/billing-card'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'

const data = [
  {
    typeOfCard: 'Full Stack Developer',
    isDefaultCard: false,
    companyInfo:"Amazon",
    expiryDate: 'June 22 - Apr 28'
  },
  {
    typeOfCard: 'Frontend Developer',
    isDefaultCard: false,
    companyInfo:"Amazon",
    expiryDate: 'June 22 - Apr 28'
  },
]

// Vars
const editCardData = {
  cardNumber: '**** **** **** 4487',
  name: 'Violet Mendoza ',
  expiryDate: '04/2028',
  cardCvv: '233'
}

const CustomerAddress = props => {
  // Props
  const { typeOfCard, isDefaultCard, expiryDate , companyInfo } = props

  // States
  const [expanded, setExpanded] = useState(isDefaultCard ? true : false)

  // Vars
  const iconButtonProps = {
    children: <i className='ri-edit-box-line' />,
    className: 'text-textSecondary'
  }

  // Hooks
  const theme = useTheme()
  return (
    <>
      <div className='flex flex-wrap justify-between items-center mlb-3 gap-y-2'>
        <div className='flex items-center gap-2'>
          <IconButton
            size='large'
            sx={{
              '& i': {
                transition: 'transform 0.3s',
                transform: expanded ? 'rotate(0deg)' : theme.direction === 'ltr' ? 'rotate(-90deg)' : 'rotate(90deg)'
              }
            }}
            onClick={() => setExpanded(!expanded)}
          >
            <i className='ri-arrow-down-s-line text-textPrimary' />
          </IconButton>
          <div className='flex items-center gap-4'>
            <div className='flex justify-center items-center'>
              <WorkHistoryIcon/>
            </div>
            <div className='flex flex-col items-start gap-1'>
              <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
                <Typography color='text.primary' className='font-medium'>
                  {typeOfCard}
                </Typography>
                {isDefaultCard && <Chip variant='tonal' color='success' label='Default Card' size='small' />}
              </div>
              <Typography> {companyInfo}</Typography>
              <Typography> {expiryDate}</Typography>
            </div>
          </div>
        </div>
        <div className='mis-10'>
          <OpenDialogOnElementClick
            element={IconButton}
            elementProps={iconButtonProps}
            dialog={AddNewCard}
            dialogProps={{ data: editCardData }}
          />
          <IconButton>
            <i className='ri-delete-bin-7-line text-textSecondary' />
          </IconButton>
          <OptionMenu
            iconClassName='text-textSecondary'
            iconButtonProps={{ size: 'medium' }}
            options={['Set as Default Card']}
          />
        </div>
      </div>
      <Collapse in={expanded} timeout={300}>
        <Grid container spacing={6} className='pbe-3 pis-12'>
          <Grid item >
            <Grid container spacing={2}>
              
                <div className='flex flex-col gap-1'>
                  <Typography variant='body2'> Technologies: ReactJS, JavaScript, Redux-toolkit, Socket ,Stripe, CSS, Rest Api, Antd , Talwind, React-d3-tree,
                          JSON
                          Specialized in React.js, focusing on functional components and custom feature-rich modules.
                         Implemented REST API integration using Redux Toolkit for efficient state management.
                         Integrated Stripe for seamless payment gateway functionality.
                          Utilized Socket.io to enable real-time data updates, enhancing overall application responsiveness.
                         Contributed to architectural decisions, ensuring scalable and maintainable solutions.
                         Proficiently worked with iframes to seamlessly integrate external content.
                         Applied knowledge of various React libraries to optimize and extend application features.
                         Demonstrated proficiency in leveraging the latest React hooks for enhanced functionality.
                         Implemented and customized Chart.js libraries for effective data visualization.</Typography>
                         <div className='flex flex-wrap gap-2 mt-2'>
                         <Typography variant='body1'> Skills : </Typography>
            {["Java", "Node", "CPP","Express","React","Nex.js"].map((team, index) => (
              <Chip key={index} variant='tonal' label={team} size='small' />
            ))}
          </div>
                </div>
              
      
            </Grid>
          </Grid>
         
        </Grid>
      </Collapse>
    </>
  )
}

const PaymentMethod = () => {
  // Vars
  const buttonProps = {
    variant: 'outlined',
    children: 'Add New Experience',
    size: 'small'
  }

  return (
    
    <>
    
      <CardHeader
        title='Experience'
        action={<OpenDialogOnElementClick element={Button} elementProps={buttonProps} dialog={AddNewCard} />}
        className='flex-wrap gap-4'
      />
      <CardContent>
        {data.map((address, index) => (
          <div key={index}>
            <CustomerAddress {...address} />
            {index !== data.length - 1 && <Divider />}
          </div>
        ))}
      </CardContent>
      </>
  )
}

export default PaymentMethod
