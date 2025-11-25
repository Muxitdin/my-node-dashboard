export const POINTS_PER_NODE_PER_DAY = 10;

export function calculateTotalPoints(nodes: number, startedAt: string): number {
    const started = new Date(startedAt).getTime();
    const now = Date.now();
    const timeInMs = now - started;
    const timeInDays = timeInMs / (1000 * 60 * 60);

    return nodes * POINTS_PER_NODE_PER_DAY * timeInDays;
}

export function calculatePointsPerSecond(nodes: number): number {
    return (nodes * POINTS_PER_NODE_PER_DAY) / (24 * 60 * 60);
}

export function calculatePointsPerHour(nodes: number): number {
    return (nodes * POINTS_PER_NODE_PER_DAY) / 24;
}

export function calculatePointsPerDay(nodes: number): number {
    return nodes * POINTS_PER_NODE_PER_DAY;
}
