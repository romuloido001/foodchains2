# Food Chains — Grade 7 Interactive Science Lesson

A self-contained interactive HTML lesson for Grade 7 learners. Learner responses and scores can be sent to a Google Sheet through Google Apps Script.

## Files
- `index.html` — the interactive lesson, configured to send learner records to Google Sheets.
- `Code.gs` — Google Apps Script web app code that receives submissions and appends them to a spreadsheet.
- `README.txt` — setup and publishing instructions.

## Part 1 — Create the Google Sheet
1. Sign in to the Google account that will own the class records.
2. Create a blank Google Sheet, for example **Grade 7 Food Chains Learning Records**.
3. Copy the spreadsheet ID from its URL. It is the text between `/d/` and `/edit`.

## Part 2 — Install the Apps Script
1. In the Google Sheet, select **Extensions → Apps Script**.
2. Delete the sample code in the editor.
3. Open `Code.gs` from this ZIP, copy all its contents, and paste them into the Apps Script editor.
4. In the code, replace `PASTE_SPREADSHEET_ID_HERE` with the spreadsheet ID copied in Part 1.
5. Click **Save**.

## Part 3 — Deploy as a Web App
1. In Apps Script, click **Deploy → New deployment**.
2. Click the gear icon and choose **Web app**.
3. Set **Execute as** to **Me**.
4. Set **Who has access** to **Anyone** (or the broadest access allowed by your Google Workspace administrator).
5. Click **Deploy**, authorize the requested permissions, and finish deployment.
6. Copy the Web app URL ending in `/exec`. Do not use the `/dev` test URL.

## Part 4 — Google Apps Script URL
The supplied Web App URL has already been inserted into `index.html`. If you redeploy the Apps Script and receive a new `/exec` URL, replace the value of `GOOGLE_SCRIPT_URL` in `index.html` with the new URL.

## Part 5 — Publish on GitHub Pages
1. Upload the updated `index.html` and `README.txt` to the root of your GitHub repository.
2. Keep `Code.gs` as a setup file in the repository if you want, but it is not required for the live website to run.
3. In GitHub, open **Settings → Pages** and publish from branch `main`, folder `/ (root)`.
4. Open the published website and submit a test learner record.

## What is stored in the Google Sheet?
Each exit-ticket submission creates one row containing:
- Submission date and time
- Learner name and grade/section
- Lesson name
- Warm-up and activity responses
- Exit-ticket answers and written responses
- Score, total items, and percentage

The sheet automatically creates a `Food Chains Responses` tab and adds a header row on the first submission.

## Important privacy and classroom notes
- The Web App URL is included in the public website. Anyone who can access the website may submit records to the connected sheet.
- Anyone with the deployed endpoint can potentially send data to it. Do not store sensitive personal information or confidential grades in a publicly accessible endpoint.
- Use a school-approved Google account and follow your school's learner-data privacy procedures. Limit access to the Google Sheet to authorized teachers.
- The browser uses a `no-cors` request, so the page cannot verify the server's response. The on-page message means the request was sent, not that the row was independently confirmed. Check the Google Sheet after a test submission.
- If your school Google Workspace does not allow public Web Apps, ask the administrator for an approved deployment/access method.

## Run locally
Open `index.html` in a modern browser. Internet access is required for Google Sheets saving. The interactive lesson and downloadable text report work locally.
