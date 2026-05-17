# Requirements Document

## Introduction

This document specifies the requirements for implementing missing must-have features from the AtomQuest Hackathon 1.0 Problem Statement for the Thryve Goal Setting & Tracking Portal. The Thryve application currently has basic goal management, approval workflows, and quarterly check-ins implemented. This specification covers the critical missing features required for full hackathon compliance, including enhanced UoM type system with calculation formulas, goal validation rules, shared goals functionality, standardized goal statuses, manager check-in comments, quarterly window enforcement, achievement report export, and completion dashboard.

## Glossary

- **System**: The Thryve Goal Setting & Tracking Portal
- **UoM**: Unit of Measurement - defines how goal achievement is measured and calculated
- **Goal_Sheet**: Collection of goals for a single employee for a specific period
- **Shared_Goal**: A departmental KPI pushed by admin/manager to multiple employees
- **Primary_Owner**: The admin/manager who creates and manages a shared goal
- **Goal_Recipient**: An employee who receives a shared goal from a primary owner
- **Weightage**: Percentage weight assigned to a goal (must total 100% across all goals)
- **Check-in**: Quarterly progress update submitted by employee and reviewed by manager
- **Quarterly_Window**: Time period during which specific actions (goal setting, check-ins) are allowed
- **Achievement_Percentage**: Calculated value based on UoM type formula showing goal completion
- **Completion_Rate**: Percentage of employees/managers who completed required check-ins

## Requirements

### Requirement 1: UoM Type System Enhancement

**User Story:** As an employee, I want to select from standardized UoM types with automatic calculation formulas, so that my goal achievement is calculated correctly based on the measurement type.

#### Acceptance Criteria

1. WHEN creating or editing a goal, THE System SHALL provide a dropdown with exactly four UoM types: "Numeric", "Percentage", "Timeline", "Zero-based"
2. WHEN a goal has UoM type "Numeric" or "Percentage" with higher-is-better semantics, THE System SHALL calculate achievement percentage as (Achieved Value ÷ Target Value) × 100
3. WHEN a goal has UoM type "Numeric" or "Percentage" with lower-is-better semantics, THE System SHALL calculate achievement percentage as (Target Value ÷ Achieved Value) × 100
4. WHEN a goal has UoM type "Timeline", THE System SHALL calculate achievement based on completion date versus deadline
5. WHEN a goal has UoM type "Zero-based" and achieved value equals zero, THE System SHALL set achievement percentage to 100%
6. WHEN a goal has UoM type "Zero-based" and achieved value is not zero, THE System SHALL set achievement percentage to 0%
7. WHEN displaying goal achievement, THE System SHALL show the calculated percentage based on the UoM type formula

### Requirement 2: Goal Validation Rules

**User Story:** As a system administrator, I want to enforce goal validation rules, so that employees create valid goal sheets that comply with organizational standards.

#### Acceptance Criteria

1. WHEN an employee attempts to create a ninth goal, THE System SHALL reject the creation and display an error message
2. WHEN calculating total weightage across all goals for an employee, THE System SHALL ensure the sum equals exactly 100%
3. WHEN an employee attempts to create or update a goal with weightage less than 10%, THE System SHALL reject the operation and display an error message
4. WHEN an employee submits goals for approval, THE System SHALL validate that total weightage equals 100% before allowing submission
5. WHEN an employee has goals with total weightage not equal to 100%, THE System SHALL display a warning indicator on the goal sheet

### Requirement 3: Shared Goals Functionality

**User Story:** As an admin or manager, I want to push departmental KPIs to multiple employees as shared goals, so that team members are aligned on common objectives.

#### Acceptance Criteria

1. WHEN an admin or manager creates a shared goal, THE System SHALL allow selection of multiple employee recipients
2. WHEN a shared goal is created, THE System SHALL copy the goal to each recipient's goal sheet with a shared goal indicator
3. WHEN a goal recipient views a shared goal, THE System SHALL display the goal title and target value as read-only fields
4. WHEN a goal recipient edits a shared goal, THE System SHALL allow modification of weightage only
5. WHEN the primary owner updates the achieved value of a shared goal, THE System SHALL synchronize the achieved value across all linked goal instances
6. WHEN displaying a shared goal, THE System SHALL show the primary owner's name and indicate it is a shared goal
7. WHEN calculating achievement for a shared goal, THE System SHALL use the synchronized achieved value from the primary owner

### Requirement 4: Goal Status Standardization

**User Story:** As a user, I want to see standardized goal statuses, so that I can quickly understand the progress state of each goal.

#### Acceptance Criteria

1. THE System SHALL support exactly three goal status values: "Not Started", "On Track", "Completed"
2. WHEN a goal is created, THE System SHALL set the initial status to "Not Started"
3. WHEN an employee updates a goal status, THE System SHALL only allow selection from the three standardized status values
4. WHEN displaying goals in lists or dashboards, THE System SHALL show the standardized status value
5. WHEN filtering goals by status, THE System SHALL use the standardized status values

### Requirement 5: Manager Check-in Comments

**User Story:** As a manager, I want to add structured check-in comments during quarterly reviews, so that I can document discussions and provide feedback to employees.

#### Acceptance Criteria

1. WHEN a manager reviews a quarterly check-in, THE System SHALL provide a dedicated comment field for manager feedback
2. WHEN a manager submits a check-in review, THE System SHALL save the manager comment with the check-in record
3. WHEN displaying check-in history, THE System SHALL show both employee comments and manager comments
4. WHEN an employee views their check-in history, THE System SHALL display manager comments alongside their own comments
5. WHEN a manager comment is added, THE System SHALL timestamp the comment with the manager's name

### Requirement 6: Quarterly Windows Enforcement

**User Story:** As a system administrator, I want to enforce quarterly windows for goal setting and check-ins, so that activities occur during designated time periods.

#### Acceptance Criteria

1. THE System SHALL define Phase 1 (Goal Setting) window opening on May 1st
2. THE System SHALL define Q1 Check-in window for July
3. THE System SHALL define Q2 Check-in window for October
4. THE System SHALL define Q3 Check-in window for January
5. THE System SHALL define Q4/Annual Check-in window for March/April
6. WHEN a user attempts to create goals outside the Phase 1 window, THE System SHALL reject the operation with an appropriate message
7. WHEN a user attempts to submit a quarterly check-in outside the designated window, THE System SHALL reject the submission with an appropriate message
8. WHEN displaying the current period, THE System SHALL show which quarterly window is currently active
9. WHEN a quarterly window is not active, THE System SHALL display when the next window opens

### Requirement 7: Achievement Report Export

**User Story:** As an admin or manager, I want to export achievement reports showing planned targets versus actual achievements, so that I can analyze performance across employees.

#### Acceptance Criteria

1. WHEN an admin or manager requests an achievement report export, THE System SHALL generate a CSV file containing all employee goal data
2. WHEN generating the achievement report, THE System SHALL include columns for employee name, goal title, target value, achieved value, achievement percentage, and weightage
3. WHEN generating the achievement report, THE System SHALL include data for all employees in the organization
4. WHEN the export is complete, THE System SHALL provide a download link for the CSV file
5. WHEN an admin or manager requests an Excel export, THE System SHALL generate an XLSX file with the same data structure
6. WHEN generating the report, THE System SHALL calculate achievement percentages using the UoM type formulas
7. WHEN the report includes shared goals, THE System SHALL show the primary owner and list all recipients

### Requirement 8: Completion Dashboard

**User Story:** As an admin or manager, I want to view a real-time completion dashboard, so that I can track which employees and managers have completed their quarterly check-ins.

#### Acceptance Criteria

1. WHEN an admin or manager accesses the completion dashboard, THE System SHALL display a list of all employees with their check-in completion status
2. WHEN displaying completion status, THE System SHALL show completion rates for each quarter (Q1, Q2, Q3, Q4)
3. WHEN an employee completes a quarterly check-in, THE System SHALL update the completion dashboard in real-time
4. WHEN displaying the dashboard, THE System SHALL show the total completion percentage for the current quarter
5. WHEN filtering the dashboard, THE System SHALL allow filtering by department, quarter, and completion status
6. WHEN displaying incomplete check-ins, THE System SHALL highlight employees who have not completed the current quarter's check-in
7. WHEN a manager completes their review of a check-in, THE System SHALL mark the check-in as fully completed on the dashboard

### Requirement 9: UoM Type Calculation Configuration

**User Story:** As a system administrator, I want to configure whether numeric/percentage goals use higher-is-better or lower-is-better semantics, so that achievement calculations are accurate for different goal types.

#### Acceptance Criteria

1. WHEN creating a goal with UoM type "Numeric" or "Percentage", THE System SHALL provide an option to select calculation direction: "Higher is Better" or "Lower is Better"
2. WHEN a goal is set to "Higher is Better", THE System SHALL use the formula: (Achieved ÷ Target) × 100
3. WHEN a goal is set to "Lower is Better", THE System SHALL use the formula: (Target ÷ Achieved) × 100
4. WHEN displaying a goal, THE System SHALL show the selected calculation direction
5. WHEN the calculation direction is changed, THE System SHALL recalculate the achievement percentage using the new formula

### Requirement 10: Timeline UoM Implementation

**User Story:** As an employee, I want to track timeline-based goals with completion dates, so that date-driven objectives are measured correctly.

#### Acceptance Criteria

1. WHEN a goal has UoM type "Timeline", THE System SHALL provide date fields for target completion date and actual completion date
2. WHEN a timeline goal is completed on or before the target date, THE System SHALL set achievement percentage to 100%
3. WHEN a timeline goal is completed after the target date, THE System SHALL calculate achievement percentage based on delay duration
4. WHEN a timeline goal is not yet completed, THE System SHALL show progress based on current date versus target date
5. WHEN displaying a timeline goal, THE System SHALL show both target date and actual completion date

### Requirement 11: Shared Goal Synchronization

**User Story:** As a primary owner of a shared goal, I want my achievement updates to automatically sync to all recipients, so that everyone sees consistent progress data.

#### Acceptance Criteria

1. WHEN a primary owner updates the achieved value of a shared goal, THE System SHALL identify all linked goal instances
2. WHEN synchronizing a shared goal, THE System SHALL update the achieved value for all recipient instances
3. WHEN a shared goal is synchronized, THE System SHALL recalculate achievement percentages for all recipient instances
4. WHEN a recipient views a shared goal, THE System SHALL display the most recent synchronized achieved value
5. WHEN a synchronization occurs, THE System SHALL log the update with timestamp and primary owner information

### Requirement 12: Quarterly Window Configuration

**User Story:** As a system administrator, I want to configure quarterly window dates, so that the system can be adapted to different organizational calendars.

#### Acceptance Criteria

1. THE System SHALL store quarterly window configuration with start and end dates for each period
2. WHEN an administrator updates quarterly window dates, THE System SHALL validate that windows do not overlap
3. WHEN checking if an action is allowed, THE System SHALL compare the current date against the configured window dates
4. WHEN displaying quarterly windows, THE System SHALL show the configured start and end dates for each period
5. WHEN a quarterly window configuration is changed, THE System SHALL apply the new dates immediately

### Requirement 13: Export Report Formatting

**User Story:** As a manager, I want exported reports to be well-formatted and readable, so that I can easily analyze the data in spreadsheet applications.

#### Acceptance Criteria

1. WHEN generating a CSV export, THE System SHALL use proper CSV formatting with quoted fields and escaped special characters
2. WHEN generating an Excel export, THE System SHALL create a formatted worksheet with headers in bold
3. WHEN exporting data, THE System SHALL include a header row with descriptive column names
4. WHEN the export includes calculated fields, THE System SHALL format percentages with two decimal places
5. WHEN the export is complete, THE System SHALL include a timestamp in the filename

### Requirement 14: Completion Dashboard Filtering

**User Story:** As an admin, I want to filter the completion dashboard by various criteria, so that I can focus on specific teams or time periods.

#### Acceptance Criteria

1. WHEN filtering by department, THE System SHALL show only employees from the selected department
2. WHEN filtering by quarter, THE System SHALL show completion status for the selected quarter only
3. WHEN filtering by completion status, THE System SHALL show only employees matching the selected status (completed/incomplete)
4. WHEN multiple filters are applied, THE System SHALL combine filters using AND logic
5. WHEN filters are cleared, THE System SHALL restore the full unfiltered view

### Requirement 15: Validation Error Messages

**User Story:** As an employee, I want to receive clear error messages when validation fails, so that I understand what needs to be corrected.

#### Acceptance Criteria

1. WHEN goal count validation fails, THE System SHALL display the message "Maximum 8 goals allowed per employee"
2. WHEN weightage validation fails for minimum threshold, THE System SHALL display the message "Minimum weightage per goal is 10%"
3. WHEN total weightage validation fails, THE System SHALL display the message "Total goal weightage must equal 100%. Current total: X%"
4. WHEN quarterly window validation fails, THE System SHALL display the message "This action is only allowed during [Window Name] from [Start Date] to [End Date]"
5. WHEN shared goal edit validation fails, THE System SHALL display the message "Only weightage can be modified for shared goals"
