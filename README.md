# 📺 Lecture Video Tracker 

This project is a lecture video web player that tracks user progress intelligently by identifying **unique watched intervals**, even if the user rewatches or skips around. The app also remembers where the user left off and resumes from that position on reload.

---

## 🚀 Features

- 📹 Video player with play, pause, and resume functionality
- 📈 Tracks only **unique** seconds watched
- ⏩ Skipping and rewatching do not affect progress falsely
- 💾 Persists progress using `localStorage`
- 📊 Progress bar and percentage display
- 🔄 Auto-resume from the last watched position

---

## 🧠 Design Decisions

### 1. **How I Tracked Watched Intervals**

- Used the `timeupdate` event to check the current time while the video plays.
- When the video is paused, an interval from the **last start time** to the **pause time** is recorded.
- These intervals are stored in memory and synced to `localStorage`.

### 2. **How I Merged Intervals to Calculate Unique Progress**

- To avoid double-counting rewatches or overlaps:
  - All intervals are **merged** using a utility function.
  - This function sorts the intervals and combines any that overlap.
- The **sum of merged durations** is divided by the video duration to compute a percentage.

```js
watchPercentage = (total unique seconds watched / total video duration) * 100


Tech Stack

Frontend: React 

Video Handling: HTML5 <video> element

Storage: localStorage 
