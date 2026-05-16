export const calculateProgress = (actual, target, uom) => {
  if (!target || target === 0) return 0;
  
  // For percentage-based goals where lower is better (e.g. churn rate)
  // This is a simplified progress engine. In a real scenario, you'd have a 'direction' property
  if (uom === '%' && target < 10) { 
    // example heuristic: if target is 3%, actual is 4.5%, starting at maybe 5%
    // Let's assume standard completion for now:
    const prog = Math.min(100, Math.max(0, (actual / target) * 100));
    return Math.round(prog);
  }

  const progress = (actual / target) * 100;
  return Math.round(Math.min(100, Math.max(0, progress)));
};

export const determineStatus = (progress, dueDate) => {
  if (progress >= 100) return 'Completed';
  
  const today = new Date();
  const due = new Date(dueDate);
  const totalDays = 90; // Approx quarter length
  const daysLeft = (due - today) / (1000 * 60 * 60 * 24);
  
  // Simple heuristic: if time elapsed is > progress by 20%, it's At Risk
  const timeElapsedPercent = Math.max(0, 100 - (daysLeft / totalDays) * 100);
  
  if (timeElapsedPercent > progress + 20) return 'At Risk';
  if (progress === 0 && timeElapsedPercent < 10) return 'Draft';
  if (progress > 0) return 'On Track';
  
  return 'Draft';
};
