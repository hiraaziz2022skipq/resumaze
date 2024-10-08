// src/services/resumeService.js

import axiosInstance from "@/utils/axiosInstance";

// Crate Resume Service
export const createResumeService = async (data) => {
  try {
    const response = await axiosInstance.post("/api/resume/create-resume", data);
    return response;
  } catch (error) {
    return error;
  }
};


// Resume Service
export const createUserService = async (data) => {
  try {
    const response = await axiosInstance.post("/api/resume/create-user", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Steps Service
export const getStepsService = async (resumeId) => {
  try {
    const response = await axiosInstance.get(`/api/resume/${resumeId}/steps`);
    return response;
  } catch (error) {
    return error;
  }
};

// Skills Service
export const getSkillsService = async (resumeId) => {
  try {
    const response = await axiosInstance.get(`/api/resume/${resumeId}/skills`);
    return response;
  } catch (error) {
    return error;
  }
};

export const postSkillsService = async (resumeId, data) => {
  try {
    const response = await axiosInstance.post(
      `/api/resume/${resumeId}/skills`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const updateSkillsService = async (resumeId, data) => {
  try {
    const response = await axiosInstance.put(
      `/api/resume/${resumeId}/skills`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

// Professional Info Service
export const getProfessionalInfoService = async (resumeId) => {
  try {
    const response = await axiosInstance.get(
      `/api/resume/${resumeId}/professional-info`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const postProfessionalInfoService = async (resumeId, data) => {
  try {
    const response = await axiosInstance.post(
      `/api/resume/${resumeId}/professional-info`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const updateProfessionalInfoService = async (resumeId, data) => {
  try {
    const response = await axiosInstance.put(
      `/api/resume/${resumeId}/professional-info`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

// Social Media Service
export const getSocialMediaService = async (resumeId) => {
  try {
    const response = await axiosInstance.get(
      `/api/resume/${resumeId}/social-media`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const postSocialMediaService = async (resumeId, data) => {
  try {
    const response = await axiosInstance.post(
      `/api/resume/${resumeId}/social-media`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const updateSocialMediaService = async (resumeId, data) => {
  try {
    const response = await axiosInstance.put(
      `/api/resume/${resumeId}/social-media`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

// Experience Service
export const getExperienceService = async (resumeId) => {
  try {
    const response = await axiosInstance.get(
      `/api/resume/${resumeId}/experience`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const addExperienceService = async (resumeId, data) => {
  try {
    const response = await axiosInstance.post(
      `/api/resume/${resumeId}/experience`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const updateExperienceService = async (resumeId, experienceId, data) => {
  try {
    const response = await axiosInstance.put(
      `/api/resume/${resumeId}/experience/${experienceId}`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteExperienceService = async (resumeId, experienceId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/resume/${resumeId}/experience/${experienceId}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

// Education Service
export const getEducationService = async (resumeId) => {
  try {
    const response = await axiosInstance.get(
      `/api/resume/${resumeId}/education`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const addEducationService = async (resumeId, data) => {
  try {
    const response = await axiosInstance.post(
      `/api/resume/${resumeId}/education`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const updateEducationService = async (resumeId, educationId, data) => {
  try {
    const response = await axiosInstance.put(
      `/api/resume/${resumeId}/education/${educationId}`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteEducationService = async (resumeId, educationId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/resume/${resumeId}/education/${educationId}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

// Projects Service
export const getProjectsService = async (resumeId) => {
  try {
    const response = await axiosInstance.get(
      `/api/resume/${resumeId}/projects`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const addProjectsService = async (resumeId, data) => {
  try {
    const response = await axiosInstance.post(
      `/api/resume/${resumeId}/projects`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const updateProjectsService = async (resumeId, projectId, data) => {
  try {
    const response = await axiosInstance.put(
      `/api/resume/${resumeId}/projects/${projectId}`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteProjectsService = async (resumeId, projectId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/resume/${resumeId}/projects/${projectId}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

// Certifications Service
export const getCertificationsService = async (resumeId) => {
  try {
    const response = await axiosInstance.get(
      `/api/resume/${resumeId}/certifications`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const addCertificationsService = async (resumeId, data) => {
  try {
    const response = await axiosInstance.post(
      `/api/resume/${resumeId}/certifications`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const updateCertificationsService = async (
  resumeId,
  certificationId,
  data
) => {
  try {
    const response = await axiosInstance.put(
      `/api/resume/${resumeId}/certifications/${certificationId}`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const deleteCertificationsService = async (
  resumeId,
  certificationId
) => {
  try {
    const response = await axiosInstance.delete(
      `/api/resume/${resumeId}/certifications/${certificationId}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

// Languages Service
export const getLanguagesService = async (resumeId) => {
  try {
    const response = await axiosInstance.get(
      `/api/resume/${resumeId}/languages`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const addLanguagesService = async (resumeId, data) => {
  try {
    const response = await axiosInstance.post(
      `/api/resume/${resumeId}/languages`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const updateLanguagesService = async (resumeId, data) => {
  try {
    const response = await axiosInstance.put(
      `/api/resume/${resumeId}/languages`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

// References Service
export const getReferencesService = async (resumeId) => {
  try {
    const response = await axiosInstance.get(
      `/api/resume/${resumeId}/references`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const addReferencesService = async (resumeId, data) => {
  try {
    const response = await axiosInstance.post(
      `/api/resume/${resumeId}/references`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const updateReferencesService = async (resumeId, referenceId, data) => {
  try {
    const response = await axiosInstance.put(
      `/api/resume/${resumeId}/references/${referenceId}`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteReferencesService = async (resumeId, referenceId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/resume/${resumeId}/references/${referenceId}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

// Extra Info Service
export const getExtraInfoService = async (resumeId) => {
  try {
    const response = await axiosInstance.get(
      `/api/resume/${resumeId}/extra-info`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const addExtraInfoService = async (resumeId, data) => {
  try {
    const response = await axiosInstance.post(
      `/api/resume/${resumeId}/extra-info`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const updateExtraInfoService = async (resumeId, extraInfoId, data) => {
  try {
    const response = await axiosInstance.put(
      `/api/resume/${resumeId}/extra_info/${extraInfoId}`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteExtraInfoService = async (resumeId, referenceId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/resume/${resumeId}/extra-info/${referenceId}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
