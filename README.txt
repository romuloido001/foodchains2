GRADE 7 SCIENCE — FOOD CHAINS INTERACTIVE LESSON
Google Sheets data-saving package

FILES
- index.html: Interactive learner lesson. Your latest supplied Apps Script /exec URL is already configured.
- Code.gs: Corrected Google Apps Script receiver. The spreadsheet ID is already configured.
- README.txt: Installation and publishing instructions.

YOUR GOOGLE SHEET
Spreadsheet ID configured in Code.gs:
1lTFV5ZMDo9eRYZtCNpS8YloEKh-tCGcH1emOMvkspYc

Spreadsheet URL:
https://docs.google.com/spreadsheets/d/1lTFV5ZMDo9eRYZtCNpS8YloEKh-tCGcH1emOMvkspYc/edit

IMPORTANT: Code.gs must contain ONLY the ID above in SPREADSHEET_ID, not the full URL.

PART 1 — INSTALL THE CORRECTED APPS SCRIPT
1. Open the Google Sheet linked above.
2. Select Extensions > Apps Script.
3. Open Code.gs in the Apps Script editor.
4. Delete the old code and paste the complete Code.gs included in this package.
5. Click Save.

PART 2 — REDEPLOY THE WEB APP
1. In Apps Script, select Deploy > Manage deployments.
2. Click the pencil (Edit) icon beside your existing Web App deployment.
3. For Version, select New version.
4. Set Execute as to Me.
5. Set Who has access to Anyone, if allowed by your school Google Workspace administrator.
6. Click Deploy and authorize access if prompted.
7. The latest /exec URL you supplied is already inserted in index.html. If you deploy another new web app later, update GOOGLE_SCRIPT_URL in index.html.

If you create a completely new deployment and receive a different /exec URL, replace GOOGLE_SCRIPT_URL in index.html with that new URL before publishing.

PART 3 — TEST THE APPS SCRIPT
1. Open the existing Web App URL ending in /exec in a browser.
2. You should see: Food Chains Google Sheets connection is ready.
3. Open the website, enter a learner name and grade/section, complete the lesson, and submit the exit ticket.
4. Open the Google Sheet and look for the Food Chains Responses tab and the new learner row.

PART 4 — PUBLISH THE WEBSITE ON GITHUB PAGES
1. Upload index.html to the root of your GitHub repository.
2. You may also upload README.txt and Code.gs for your own reference. Code.gs runs in Google Apps Script, not GitHub Pages.
3. In the repository, open Settings > Pages.
4. Choose Deploy from a branch, select main and /(root), then Save.
5. Open the published Pages website and test a learner submission.

WHAT IS SAVED
The script stores the submission timestamp, learner name, grade and section, lesson, activity responses, exit-ticket responses, score, total items, and percentage in the Food Chains Responses sheet tab.

TROUBLESHOOTING
- If you see "Illegal spreadsheet id or key", confirm SPREADSHEET_ID contains only the ID, not the complete URL.
- If the sheet tab is not created, check Apps Script > Executions for the latest error. Also confirm that the Google account deploying the script has edit access to the spreadsheet.
- Confirm that you deployed a New version after changing Code.gs.
- The website currently sends the request using browser no-cors mode. It cannot read the Apps Script response, so an on-page sent message is not proof that a row was saved. Always verify in the Google Sheet and check Apps Script Executions if a row is missing.

LEARNER DATA PRIVACY
The Web App URL is present in the public website. Anyone who can access the site may attempt to submit data to the endpoint. Collect only information approved by your school, keep the spreadsheet restricted to authorized staff, and follow applicable learner-data privacy requirements.
