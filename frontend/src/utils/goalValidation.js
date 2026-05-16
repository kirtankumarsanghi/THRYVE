export const validateGoals = (goals) => {
  const errors = [];
  const warnings = [];
  
  // Rule 1: Max 8 goals
  if (goals.length > 8) {
    errors.push("Maximum limit of 8 active goals exceeded.");
  }

  // Rule 2: Total weightage must equal 100%
  const totalWeightage = goals.reduce((sum, goal) => sum + (Number(goal.weightage) || 0), 0);
  if (goals.length > 0 && totalWeightage !== 100) {
    warnings.push(`Total weightage is ${totalWeightage}%. It should equal exactly 100%.`);
  }

  // Rule 3: Min 10% weightage per goal
  goals.forEach(goal => {
    if (goal.weightage < 10) {
      warnings.push(`Goal "${goal.title}" has weightage < 10%.`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    totalWeightage
  };
};
