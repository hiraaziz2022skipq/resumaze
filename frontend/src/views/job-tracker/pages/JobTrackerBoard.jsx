'use client'
import { useEffect, useState } from 'react'

// Third-party imports
import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import { animations } from '@formkit/drag-and-drop'
import { useDispatch, useSelector } from 'react-redux'

import KanbanDrawer from '../Drawer/DetailDrawer'
import NewColumn from './NewColumn'
import KanbanList from './List'
import ResumeAndCoverLetterDetail from '../Drawer/DetailDrawer'
import { updateColumns } from '@/redux/job-tracker/slice'
import { getJobApplications } from '@/redux/job-tracker/action'


const JobTrackerBoard = () =>{
    const [drawerOpen, setDrawerOpen] = useState(false)

     // Hooks
     
     //Newly added line
  const jobApplicationSlice = useSelector((state) => state.jobApplicationSlice);


  const dispatch = useDispatch()

  const [boardRef, columns, setColumns] = useDragAndDrop(jobApplicationSlice.columns, {
    plugins: [animations()],
    dragHandle: '.list-handle'
  })


   // To get the current task for the drawer
   const currentJob = jobApplicationSlice.jobApplications.find(job => job.id === jobApplicationSlice.currentJobId)

      
      useEffect(() => {
       dispatch(getJobApplications(15))
      }, [])

      useEffect(()=>{
        setColumns(jobApplicationSlice.columns)
      },[jobApplicationSlice.columns])


      console.log(columns,"clmnsData")

      const handleJobClick = (id) =>{
        setDrawerOpen(true)
      }
      
      return (
        <div className='flex items-start gap-6'>
          <div ref={boardRef} className='flex gap-6'>
            {columns.map(column => (
              <KanbanList
                key={column.id}
                dispatch={dispatch}
                column={column}
                store={jobApplicationSlice}
                setDrawerOpen={setDrawerOpen}
                columns={columns}
                setColumns={setColumns}
                handleJobClick={handleJobClick}
                jobs={column.jobIds.map(jbId => jobApplicationSlice.jobApplications.find(jb => jb.id === jbId))}
              />
            ))}
          </div>
          {drawerOpen && (
            <ResumeAndCoverLetterDetail
              drawerOpen={drawerOpen}
              setDrawerOpen={setDrawerOpen}
            />
          )}
        </div>
      )
}

export default JobTrackerBoard