import { createSlice } from "@reduxjs/toolkit";
import { getAllResumesAction } from "./action";

const initialState = {
  allResumeData: [],
  currentResumeData : {},
  isAllResumeDataLoading : true
};

const resumesSlice = createSlice({
  name: "resumes",
  initialState: initialState,
  reducers: {
    updateResume: (state, { payload }) => {
      const { resumeId, singleObj } = payload;
      const index = state.allResumeData.findIndex(
        (resume) => resume.id === resumeId
      );

      if (index !== -1) {
        state.allResumeData[index] = {
          ...state.allResumeData[index],
          ...singleObj,
        };
      } else {
        state.allResumeData.push({
          id: resumeId,
          ...singleObj,
        });
      }

      state.currentResumeData = {
        ...state.currentResumeData,
        id: resumeId,
        ...singleObj,
      };

      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllResumesAction.pending, (state) => {
        state.isAllResumeDataLoading = true
      })
      .addCase(getAllResumesAction.fulfilled, (state, { payload }) => {
        state.allResumeData = payload.data;
        state.isAllResumeDataLoading = false
      })
      .addCase(getAllResumesAction.rejected, (state, action) => {
        state.isAllResumeDataLoading = false
      });
  },
});

export const { updateResume } = resumesSlice.actions;

export default resumesSlice.reducer;
