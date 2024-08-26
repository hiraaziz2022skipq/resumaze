'use client'
import { useEffect, useState } from 'react'

// Third-party imports
import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import { animations } from '@formkit/drag-and-drop'
import { useDispatch, useSelector } from 'react-redux'


// Slice Imports
import { addColumn, updateColumns } from '@/redux/slices/kanban'
import KanbanDrawer from '../Drawer/DetailDrawer'
import NewColumn from './NewColumn'
import KanbanList from './List'
import ResumeAndCoverLetterDetail from '../Drawer/DetailDrawer'


const JobTrackerBoard = () =>{
    const [drawerOpen, setDrawerOpen] = useState(false)

     // Hooks
  const kanbanStore = useSelector(state => state.kanbanReducer)
  const dispatch = useDispatch()

  const [boardRef, columns, setColumns] = useDragAndDrop(kanbanStore.columns, {
    plugins: [animations()],
    dragHandle: '.list-handle'
  })

  
  // Add New Column
  const addNewColumn = title => {
    const maxId = Math.max(...kanbanStore.columns.map(column => column.id))

    dispatch(addColumn(title))
    setColumns([...columns, { id: maxId + 1, title, taskIds: [] }])
  }

   // To get the current task for the drawer
   const currentTask = kanbanStore.tasks.find(task => task.id === kanbanStore.currentTaskId)


    // Update Columns on Drag and Drop
    useEffect(() => {
        if (columns !== kanbanStore.columns) dispatch(updateColumns(columns))
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [columns])

      

      return (
        <div className='flex items-start gap-6'>
          <div ref={boardRef} className='flex gap-6'>
            {columns.map(column => (
              <KanbanList
                key={column.id}
                dispatch={dispatch}
                column={column}
                store={kanbanStore}
                setDrawerOpen={setDrawerOpen}
                columns={columns}
                setColumns={setColumns}
                currentTask={currentTask}
                tasks={column.taskIds.map(taskId => kanbanStore.tasks.find(task => task.id === taskId))}
              />
            ))}
          </div>
          <NewColumn addNewColumn={addNewColumn} />
          {currentTask && (
            <ResumeAndCoverLetterDetail
              drawerOpen={drawerOpen}
              setDrawerOpen={setDrawerOpen}
            />
          )}
        </div>
      )
}

export default JobTrackerBoard