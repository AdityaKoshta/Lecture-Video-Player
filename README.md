# 📺 Lecture Video Tracker 

This is my submission for the SDE Intern assignment. The goal was to build a simple video player that tracks how much of a lecture video a user has watched, even if they skip or rewatch parts. I used React for the frontend and localStorage to persist the progress.

🚀 What I Built
A video player with basic controls (play, pause, resume)

A system to track what parts of the video were watched

A progress bar that only updates when new parts are watched

LocalStorage to save the progress and resume from where the user left off

💡 How It Works
🔁 Tracking Watched Intervals

When the video is playing, I record the time. When the user pauses, I save the interval between when they started and stopped watching. These intervals are stored in state and also saved to localStorage.

📏 Merging Intervals

If the user watches overlapping sections or rewatches something, I merge those intervals to avoid counting the same seconds twice. I wrote a function to sort and merge the time intervals, and then I calculate the total unique seconds watched.

📊 Calculating Progress

I divide the total unique seconds watched by the full duration of the video to get a percentage. This percentage is shown as a progress bar and a number below the video.

🧠 What Was Challenging

Figuring out how to avoid counting rewatches in progress

Remembering to only use React hooks inside components (I initially tried to use useState in a utility file, which caused an error)

Making sure the video resumes from the last watched position




Tech Stack

Frontend: React 

Video Handling: HTML5 <video> element

Storage: localStorage 
