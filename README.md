# A+ Final Exam Marks Needed Calculator — HTML Single File

The **A+ Final Exam Needed Calculator** is an interactive single‑file web tool for students to figure out how many marks they must score in the **Final (out of 40)** to achieve an **A+ (GPA 5)**.

## Features
- **Attendance by Percentage**: Enter attendance **0–100%**; it automatically converts to **marks out of 7**.
- Inputs for **Assignment (5)**, **Midterm (25)**, **Quiz Avg (15)**, **Presentation (8, optional)**.
- **Target Total** defaults to **80** (common A+ cutoff) but can be changed.
- Clear highlight of **Needed in Final** and warnings if the target is unreachable.
- Works offline in any modern browser.

## Formula
```
Needed in Final (out of 40) = Target Total − (Attendance Marks + Assignment + Midterm + Quiz + Presentation)
Attendance Marks = (Attendance% ÷ 100) × 7
```
The result is clamped between **0** and **40**.

## Quick Start
1. Download this repository or the single HTML file.
2. Open `index.html` in a browser.
3. Enter your numbers and click **Calculate Needed Final**.

## Deploy to GitHub Pages
1. Create a new GitHub repo (public).
2. Upload `index.html` to the root of the repo.
3. In **Settings → Pages**, choose **Deploy from a branch**, select **main**, and the root folder. Save.
4. Your calculator will be live at your GitHub Pages URL.

---

Made for Bangladeshi university grading systems. Adjust the **Target Total** if your department uses a different A+ cutoff.
