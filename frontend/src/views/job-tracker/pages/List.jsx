// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'

// Third-party imports
import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import { animations } from '@formkit/drag-and-drop'
import classnames from 'classnames'

// Slice Imports
import { addTask, editColumn, deleteColumn } from '@/redux/slices/kanban'

// Component Imports
import OptionMenu from '@core/components/option-menu'

// Styles Imports
import styles from '../styles.module.css'
import TrackerCard from '../ui/TrackerCard'
import { updateColumnTaskIds } from '@/redux/job-tracker/slice'

const KanbanList = props => {
  // Props
  const { column, jobs, dispatch, setDrawerOpen, columns, setColumns  , handleJobClick } = props


  console.log(jobs,"=jobs==")
  // States
  const [editDisplay, setEditDisplay] = useState(false)
  const [title, setTitle] = useState(column.title)

  // Hooks
  const [jobListsRef, jobsList, setJobsList] = useDragAndDrop(jobs, {
    group: 'jobsList',
    plugins: [animations()],
    draggable: el => el.classList.contains('item-draggable')
  })


  // Handle Submit Edit
  const handleSubmitEdit = e => {
    e.preventDefault()
    setEditDisplay(!editDisplay)
    dispatch(editColumn({ id: column.id, title }))

    const newColumn = columns.map(col => {
      if (col.id === column.id) {
        return { ...col, title }
      }

      return col
    })

    setColumns(newColumn)
  }

  // Cancel Edit
  const cancelEdit = () => {
    setEditDisplay(!editDisplay)
    setTitle(column.title)
  }

  // Delete Column
  const handleDeleteColumn = () => {
    dispatch(deleteColumn({ columnId: column.id }))
    setColumns(columns.filter(col => col.id !== column.id))
  }


  useEffect(()=>{
    setJobsList(jobs)
  },[jobs])



  console.log(jobsList,"===jobList===")
  return (
    <div ref={jobListsRef} className='flex flex-col is-[16.5rem]'>
      {editDisplay ? (
        <form
          className='flex items-center mbe-4'
          onSubmit={handleSubmitEdit}
          onKeyDown={e => {
            if (e.key === 'Escape') {
              cancelEdit()
            }
          }}
        >
          <InputBase value={title} autoFocus onChange={e => setTitle(e.target.value)} required />
          <IconButton color='success' size='small' type='submit'>
            <i className='ri-check-line' />
          </IconButton>
          <IconButton color='error' size='small' type='reset' onClick={cancelEdit}>
            <i className='ri-close-line' />
          </IconButton>
        </form>
      ) : (
        <div
          id='no-drag'
          className={classnames(
            'flex items-center justify-between is-[16.5rem] bs-[2.125rem] mbe-4',
            styles.kanbanColumn
          )}
        >
          <Typography variant='h5' noWrap className='max-is-[80%]'>
            {column.title}
          </Typography>
          <div className='flex items-center'>
            <i className={classnames('ri-drag-move-fill text-textSecondary list-handle', styles.drag)} />
            <OptionMenu
              iconClassName='text-xl text-textPrimary'
              options={[
                {
                  text: 'Edit',
                  icon: 'ri-pencil-line text-base',
                  menuItemProps: {
                    className: 'flex items-center gap-2',
                    onClick: () => setEditDisplay(!editDisplay)
                  }
                },
                {
                  text: 'Delete',
                  icon: 'ri-delete-bin-line text-base',
                  menuItemProps: { className: 'flex items-center gap-2', onClick: handleDeleteColumn }
                }
              ]}
            />
          </div>
        </div>
      )}
      {jobsList.map(
        job =>
          job && (
            <TrackerCard
              key={job.id}
              task={job}
              dispatch={dispatch}
              column={column}
              setColumns={setColumns}
              columns={columns}
              setDrawerOpen={setDrawerOpen}
              tasksList={jobsList}
              setTasksList={setJobsList}
              handleJobClick={handleJobClick}
            />
          )
      )}
      {/* <NewTask addTask={addNewTask} /> */}
    </div>
  )
}

export default KanbanList
