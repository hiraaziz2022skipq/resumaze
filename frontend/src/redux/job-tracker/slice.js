import { createSlice } from "@reduxjs/toolkit";
import { createJobApplication, getJobApplications } from "./action";


const initialState = {
    jobApplications : [],
    isJobApplicationsLoading :false,
    columns : [
      {
        id: 1,
        title: "In Progress",
        status:"in_progress",
        jobIds:[]
      },
      {
        id: 2,
        title: "Applied",
        status:"applied",
        jobIds:[]
      },
      {
        id: 3,
        title: "Interview",
        status:"interview",
        jobIds:[]
      },
      {
        id: 4,
        title: "Pending",
        status:"pending",
        jobIds:[]
      },
      {
        id: 5,
        title: "Accepted",
        status:"accepted",
        jobIds:[]
      },
      {
        id: 6,
        title: "Rejected",
         status:"rejected",
         jobIds:[]
      },
    ],
    currentJobId:null
    
}

const jobApplicationSlice = createSlice({
    name: "jobApplication",
    initialState:initialState,
    reducers: {

    },
    extraReducers: (builder) => {
      builder
        .addCase(createJobApplication.pending, (state) => {
         
        })
        .addCase(createJobApplication.fulfilled, (state, { payload }) => {
          // Add the new job application to the jobApplications list
          console.log(payload,"===payload===")

          const {data} = payload
          state.jobApplications = [data, ...state.jobApplications];

          // Update columns to include the new job ID in the correct column
          state.columns = state.columns.map(column => {
              if (column.status === data.status) {
                  return {
                      ...column,
                      jobIds: [...column.jobIds, data.id]
                  };
              }
              return column;
          });
      })
        .addCase(createJobApplication.rejected, (state, action) => {
         
        })
        .addCase(getJobApplications.pending, (state) => {
          
        })
        .addCase(getJobApplications.fulfilled, (state, { payload }) => {
          state.isJobApplicationsLoading = false;
          state.jobApplications = payload.data;

          // Generate new columns with updated jobIds based on status
          const updatedColumns = state.columns.map(column => {
              const jobIds = payload.data
                  .filter(job => job.status === column.status)
                  .map(job => job.id);
              return { ...column, jobIds };
          });

          console.log(updatedColumns,"==updatedColumns==")
          // Reassign the updated columns to the state
          state.columns = updatedColumns;
      })
        .addCase(getJobApplications.rejected, (state, action) => {
          
        });
    },
  });
  

  export const {
   
    updateColumns,
    updateColumnTaskIds
  } = jobApplicationSlice.actions

  export default jobApplicationSlice.reducer;