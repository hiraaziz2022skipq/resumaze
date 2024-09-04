export const calculatePercentageOfSteps = (data) => {
  const relevantKeys = Object.keys(data).filter(
    (key) => !["id", "resume_id"].includes(key)
  );
  const totalSteps = relevantKeys.length;
  const completedSteps = relevantKeys.filter((key) => data[key]).length;
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
