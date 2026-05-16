export function getStatusStyles(status) {
	switch (status) {
		case "Approved":
			return "text-emerald-300 border-emerald-500/30 bg-emerald-500/10";
		case "Submitted":
			return "text-cyan-300 border-cyan-500/30 bg-cyan-500/10";
		case "At Risk":
			return "text-amber-300 border-amber-500/30 bg-amber-500/10";
		case "Completed":
			return "text-emerald-300 border-emerald-500/30 bg-emerald-500/10";
		case "Returned":
			return "text-red-300 border-red-500/30 bg-red-500/10";
		case "Draft":
			return "text-gray-300 border-border/60 bg-border/30";
		case "On Track":
			return "text-emerald-300 border-emerald-500/30 bg-emerald-500/10";
		case "Delayed":
			return "text-amber-300 border-amber-500/30 bg-amber-500/10";
		case "Not Started":
			return "text-gray-300 border-border/60 bg-border/30";
		default:
			return "text-gray-300 border-border/60 bg-border/30";
	}
}

export function formatPercent(value) {
	if (value === null || value === undefined) {
		return "-";
	}
	return `${value}%`;
}
