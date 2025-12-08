

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

export const getAllowedUnits = (topUnitValue) => {
    if (topUnitValue === 1) return [NOTIFY_BEFORE_OPTIONS[0]];
    if (topUnitValue === 7) return [NOTIFY_BEFORE_OPTIONS[0], NOTIFY_BEFORE_OPTIONS[1]];
    if (topUnitValue === 30) return [NOTIFY_BEFORE_OPTIONS[0], NOTIFY_BEFORE_OPTIONS[1], NOTIFY_BEFORE_OPTIONS[2]];
    return [];
};

export const findMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];
    return minDate
}
