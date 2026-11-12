/**
 * Google Apps Script receiver for the Grade 7 Food Chains lesson.
 * IMPORTANT: This is configured with the spreadsheet ID from the supplied README.
 * Confirm that this is the intended editable spreadsheet before deployment.
 */
const SPREADSHEET_ID = '1lTFV5ZMDo9eRYZtCNpS8YloEKh-tCGcH1emOMvkspYc';
const SHEET_NAME = 'Food Chains Responses';
const HEADERS = [
  'Submitted At', 'Learner Name', 'Grade & Section', 'Lesson',
  'Warm-up', 'Activity 1', 'Activity 2', 'Activity 3', 'Activity 4', 'Activity 5',
  'Exit Ticket 1', 'Exit Ticket 2', 'Producer Answer', 'Plant Importance',
  'Local Food Chain', 'Organism Change', 'Score', 'Total Items', 'Percentage'
];

function doGet() {
  return ContentService.createTextOutput('Food Chains Google Sheets connection is ready.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('No submission data received.');
    }
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    }

    const row = [
      safe_(data.submittedAt), safe_(data.learnerName), safe_(data.gradeSection), safe_(data.lesson),
      safe_(data.warmUp), safe_(data.activity1), safe_(data.activity2), safe_(data.activity3),
      safe_(data.activity4), safe_(data.activity5), safe_(data.exit1), safe_(data.exit2),
      safe_(data.producerAnswer), safe_(data.plantImportance), safe_(data.localFoodChain),
      safe_(data.organismChange), safe_(data.score), safe_(data.total), safe_(data.percentage)
    ];
    sheet.appendRow(row);
    return json_({ ok: true, message: 'Submission saved.' });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: String(err.message || err) });
  }
}

// Prevent spreadsheet-formula injection from learner-entered text.
function safe_(value) {
  if (value === null || value === undefined) return '';
  const text = String(value).slice(0, 5000);
  return /^[=+@]/.test(text) || /^-/.test(text) ? "'" + text : text;
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
