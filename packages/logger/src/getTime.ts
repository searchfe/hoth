export function getTime(timestamp?: number): string[] {
    let date = new Date(timestamp);
    const year = date.getFullYear().toString();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hour = `${date.getHours()}`.padStart(2, '0');
    const minute = `${date.getMinutes()}`.padStart(2, '0');
    const second = `${date.getSeconds()}`.padStart(2, '0');
    return [year, month, day, hour, minute, second];
}
