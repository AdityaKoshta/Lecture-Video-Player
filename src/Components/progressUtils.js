import { useEffect } from "react";

// Merge overlapping intervals
export function mergeIntervals(intervals) {
  if (!intervals.length) return [];

  intervals.sort((a, b) => a.start - b.start);
  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    const current = intervals[i];

    if (current.start <= last.end) {
      last.end = Math.max(last.end, current.end);
    } else {
      merged.push(current);
    }
  }

  return merged;
}

// Get total unique seconds watched
export function getUniqueSecondsWatched(intervals) {
  const merged = mergeIntervals(intervals);
  return merged.reduce(
    (total, interval) => total + (interval.end - interval.start),
    0
  );
}

// Get percentage watched based on video duration
export function getWatchPercentage(intervals, duration) {
  const uniqueSeconds = getUniqueSecondsWatched(intervals);
  return (uniqueSeconds / duration) * 100;
}


