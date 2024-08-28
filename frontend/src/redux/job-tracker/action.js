import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";

// Async thunk for creating a job application
export const createJobApplication = createAsyncThunk(
  "jobApplication/createJobApplication",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/jobapplication/create", payload);
      if(response.status === 200)
      {
        toast.success("Job application created successfully!");
        return response;
      }
      else{
        toast.error("Failed to create job application.");
        return rejectWithValue(response)
      }
        
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for getting steps service
export const getJobApplications = createAsyncThunk(
  "jobApplication/getJobApplications",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/jobapplication/${userId}/jobapplications`);
      if(response.status === 200)
        {
          return response;
        }
        else{
          return rejectWithValue(response)
        }
          
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);