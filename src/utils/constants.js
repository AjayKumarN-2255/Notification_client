

export const FREQUENCY_PERIODS = [
    { value: 1, label: "Monthly" },        // 1 month
    { value: 3, label: "Quarterly" },      // 3 months
    { value: 6, label: "Half-Yearly" },    // 6 months
    { value: 12, label: "Yearly" },        // 12 months
];

export const NOTIFY_BEFORE_OPTIONS = [
    { value: 1, label: "Day" },
    { value: 7, label: "Week" },
    { value: 30, label: "Month" },
];

export const NOTIFICATION_GAPS = [
    { value: 1, label: "Daily" },
    { value: 2, label: "Every 2 days" },
    { value: 3, label: "Every 3 days" },
    { value: 7, label: "Weekly" },
    { value: 14, label: "Every 2 weeks" },
    { value: 30, label: "Monthly" },
];



export const findMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];
    return minDate
}
