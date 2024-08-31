
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { Button, Chip } from '@mui/material'
import CustomAvatar from '@/@core/components/mui/Avatar'


const ATSScoreCard = () => {

  return (
    <Card style={{height:"100%"}}>
      <CardContent className='flex flex-wrap justify-between items-start gap-2'>
        <CustomAvatar  variant='rounded' skin={"light"} color={"primary"}>
          <i className={"ri-shopping-cart-line"} />
        </CustomAvatar>
      </CardContent>
      <CardContent className='flex flex-col items-start gap-4'>
        <div className='flex flex-col flex-wrap gap-1'>
          <Typography variant='h5'>{"200"}</Typography>
          <Typography>{"ATS Score"}</Typography>
        </div>
        <Chip size='small' variant='tonal' label={"Medium"} color={"primary"} />
      </CardContent>
    </Card>
  )
}

export default ATSScoreCard
