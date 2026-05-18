/**
 * PDF Export Utility for Thryve
 * Generates professional PDF reports from real API data.
 */
import jsPDF from "jspdf";
import "jspdf-autotable";

// Brand colors
const BRAND = {
  primary: [99, 102, 241],   // indigo-500
  dark: [3, 7, 18],           // bg-[#030712]
  card: [11, 18, 44],         // bg-[#0B132C]
  white: [255, 255, 255],
  gray: [148, 163, 184],      // slate-400
  success: [16, 185, 129],    // emerald-500
  warning: [245, 158, 11],    // amber-500
  danger: [239, 68, 68],      // red-500
};

function addHeader(doc, title, subtitle, metadata = {}) {
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header bar
  doc.setFillColor(...BRAND.primary);
  doc.rect(0, 0, pageWidth, 28, "F");

  // Logo text
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...BRAND.white);
  doc.text("THRYVE", 14, 12);

  // Title
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(title, 14, 20);

  // Date on the right
  doc.setFontSize(8);
  doc.text(
    `Generated: ${new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}`,
    pageWidth - 14,
    12,
    { align: "right" }
  );

  // Metadata line
  if (metadata.user) {
    doc.text(`Prepared for: ${metadata.user}`, pageWidth - 14, 20, {
      align: "right",
    });
  }

  // Subtitle
  if (subtitle) {
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(subtitle, 14, 36);
  }

  return subtitle ? 44 : 36;
}

function addFooter(doc) {
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(7);
    doc.setTextColor(160, 160, 160);
    doc.text(
      `Thryve Performance Platform — Confidential`,
      14,
      pageHeight - 8
    );
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - 14, pageHeight - 8, {
      align: "right",
    });
  }
}

function addSummaryCards(doc, cards, startY) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const cardWidth = (pageWidth - margin * 2 - 10 * (cards.length - 1)) / cards.length;
  let y = startY;

  cards.forEach((card, i) => {
    const x = margin + i * (cardWidth + 10);
    // Card background
    doc.setFillColor(245, 245, 250);
    doc.roundedRect(x, y, cardWidth, 28, 3, 3, "F");
    // Label
    doc.setFontSize(7);
    doc.setTextColor(120, 120, 140);
    doc.setFont("helvetica", "normal");
    doc.text(card.label, x + 6, y + 10);
    // Value
    doc.setFontSize(16);
    doc.setTextColor(30, 30, 50);
    doc.setFont("helvetica", "bold");
    doc.text(String(card.value), x + 6, y + 23);
  });

  return y + 36;
}

// ─── MANAGER: Achievement Report PDF ────────────────────────────────
export function generateManagerReportPDF(reportData, teamData = [], userName = "Manager") {
  const doc = new jsPDF();

  let y = addHeader(doc, "Team Achievement Report", `Department: ${reportData.department || "All"} • Records: ${reportData.total_records || 0}`, {
    user: userName,
  });

  // Summary cards
  const data = reportData.data || [];
  const totalGoals = data.length;
  const avgAchievement = totalGoals > 0 ? Math.round(data.reduce((s, r) => s + (r.achievement_percentage || 0), 0) / totalGoals) : 0;
  const approved = data.filter(r => r.approval_status === "approved").length;
  const onTrack = data.filter(r => (r.achievement_percentage || 0) >= 60).length;

  y = addSummaryCards(doc, [
    { label: "TOTAL GOALS", value: totalGoals },
    { label: "AVG ACHIEVEMENT", value: `${avgAchievement}%` },
    { label: "APPROVED", value: approved },
    { label: "ON TRACK", value: onTrack },
  ], y);

  // Table
  if (data.length > 0) {
    doc.autoTable({
      startY: y,
      head: [["Employee", "Goal", "Progress", "Status", "Achievement"]],
      body: data.map(row => [
        row.employee_name || "—",
        (row.goal_title || "—").substring(0, 40),
        `${row.achieved_value || 0} / ${row.target_value || 0}`,
        row.approval_status || "pending",
        `${row.achievement_percentage || 0}%`,
      ]),
      theme: "grid",
      headStyles: {
        fillColor: BRAND.primary,
        textColor: BRAND.white,
        fontStyle: "bold",
        fontSize: 8,
      },
      bodyStyles: { fontSize: 7.5, textColor: [40, 40, 60] },
      alternateRowStyles: { fillColor: [248, 248, 252] },
      margin: { left: 14, right: 14 },
      styles: { cellPadding: 3, overflow: "linebreak" },
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: "auto" },
        2: { cellWidth: 30 },
        3: { cellWidth: 25 },
        4: { cellWidth: 28 },
      },
    });
  } else {
    doc.setFontSize(11);
    doc.setTextColor(120, 120, 140);
    doc.text("No goal data available for this report.", 14, y + 10);
  }

  addFooter(doc);

  const timestamp = new Date().toISOString().split("T")[0];
  doc.save(`thryve_team_report_${timestamp}.pdf`);
  return true;
}

// ─── EMPLOYEE: Personal Goals PDF ───────────────────────────────────
export function generateEmployeeGoalsPDF(goals = [], userName = "Employee", analytics = {}) {
  const doc = new jsPDF();

  let y = addHeader(doc, "Personal Goals & Performance Report", `Quarter: ${goals[0]?.quarter || "Current"} • Total Goals: ${goals.length}`, {
    user: userName,
  });

  // Summary
  const totalGoals = goals.length;
  const completed = goals.filter(g => g.status === "completed").length;
  const avgProgress = totalGoals > 0 ? Math.round(goals.reduce((s, g) => s + (g.progress || 0), 0) / totalGoals) : 0;
  const approved = goals.filter(g => g.approval_status === "approved").length;

  y = addSummaryCards(doc, [
    { label: "TOTAL GOALS", value: totalGoals },
    { label: "COMPLETED", value: completed },
    { label: "AVG PROGRESS", value: `${avgProgress}%` },
    { label: "APPROVED", value: approved },
  ], y);

  // Goals table
  if (goals.length > 0) {
    doc.autoTable({
      startY: y,
      head: [["Goal Title", "Strategic Area", "Quarter", "Progress", "Status", "Weightage"]],
      body: goals.map(g => [
        (g.title || "—").substring(0, 45),
        g.strategic_area || "—",
        g.quarter || "—",
        `${g.progress || 0}%`,
        g.status || "draft",
        `${g.weightage || 0}%`,
      ]),
      theme: "grid",
      headStyles: {
        fillColor: BRAND.primary,
        textColor: BRAND.white,
        fontStyle: "bold",
        fontSize: 8,
      },
      bodyStyles: { fontSize: 7.5, textColor: [40, 40, 60] },
      alternateRowStyles: { fillColor: [248, 248, 252] },
      margin: { left: 14, right: 14 },
      styles: { cellPadding: 3, overflow: "linebreak" },
    });
  } else {
    doc.setFontSize(11);
    doc.setTextColor(120, 120, 140);
    doc.text("No goals found for this period.", 14, y + 10);
  }

  // If analytics data available, add a section
  if (analytics && analytics.overall_completion_rate !== undefined) {
    const finalY = doc.lastAutoTable?.finalY || y + 20;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 30, 50);
    doc.text("Performance Analytics", 14, finalY + 14);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 100);
    doc.text(`Overall Completion Rate: ${analytics.overall_completion_rate || 0}%`, 14, finalY + 22);
    doc.text(`Goals On Track: ${analytics.on_track_count || 0}`, 14, finalY + 28);
    doc.text(`Goals At Risk: ${analytics.at_risk_count || 0}`, 14, finalY + 34);
  }

  addFooter(doc);

  const timestamp = new Date().toISOString().split("T")[0];
  doc.save(`thryve_my_goals_${timestamp}.pdf`);
  return true;
}

// ─── GENERIC: Export any table data as PDF ───────────────────────────
export function generateGenericPDF(title, subtitle, headers, rows, fileName = "report") {
  const doc = new jsPDF();

  let y = addHeader(doc, title, subtitle);

  if (rows.length > 0) {
    doc.autoTable({
      startY: y,
      head: [headers],
      body: rows,
      theme: "grid",
      headStyles: {
        fillColor: BRAND.primary,
        textColor: BRAND.white,
        fontStyle: "bold",
        fontSize: 8,
      },
      bodyStyles: { fontSize: 7.5, textColor: [40, 40, 60] },
      alternateRowStyles: { fillColor: [248, 248, 252] },
      margin: { left: 14, right: 14 },
      styles: { cellPadding: 3, overflow: "linebreak" },
    });
  } else {
    doc.setFontSize(11);
    doc.setTextColor(120, 120, 140);
    doc.text("No data available.", 14, y + 10);
  }

  addFooter(doc);

  const timestamp = new Date().toISOString().split("T")[0];
  doc.save(`thryve_${fileName}_${timestamp}.pdf`);
  return true;
}
