import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";

// Async thunk for creating a job application
export const getAllResumesAction = createAsyncThunk(
  "resumes/getAllResumesAction",
  async (userid, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/resume/${userid}/resumes`
      );
      if (response.status === 200) {
        return response;
      } else {
        toast.error("Failed to Load Resumes");
        return rejectWithValue(response);
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Async thunk for creating a job application
export const getResumeById = createAsyncThunk(
  "resumes/getResumeById",
  async (resumeId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/resume/${resumeId}`
      );
      if (response.status === 200) {
        return response;
      } else {
        toast.error("Failed to Load Resumes");
        return rejectWithValue(response);
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Async thunk for creating a job application
export const updateResumeById = createAsyncThunk(
  "resumes/updateResumeById",
  async ({resumeId,data}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/api/resume/${resumeId}`,data
      );
      console.log(response,"===response===")
      if (response.status === 200) {
        return response;
      } else {
        return rejectWithValue(response);
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);