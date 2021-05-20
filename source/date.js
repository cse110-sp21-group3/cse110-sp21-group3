export const DATE = new Date();

export const currentDate = DATE.toLocaleString().split(",")[0];

export const clearDailyLog = () => {
    const localTime = DATE.toLocaleString().split(",")[0];
    console.log(localTime);
};