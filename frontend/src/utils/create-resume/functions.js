export const calculatePercentageOfSteps = (data) => {
  const totalSteps = Object.keys(data).length;
  const completedSteps = Object.values(data).filter((status) => status).length;
  const percentage = Math.round((completedSteps / totalSteps) * 100);
  return percentage;
};
export const checkReqforATSScore = (data) => {
  const relevantData = Object.keys(data)
    .filter(
      (key) => !["id", "resume_id", "languages", "social_media"].includes(key)
    )
    .map((key) => data[key]);

  const allTrue = relevantData.every((value) => value === true);
  return allTrue;
};
