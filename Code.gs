/**
 * GRADE 7 SCIENCE - FOOD CHAINS
 * Receives learner activity and exit-ticket records and saves them to Google Sheets.
 */

// Use ONLY the spreadsheet ID, not the full Google Sheets URL.
const SPREADSHEET_ID = '1lTFV5ZMDo9eRYZtCNpS8YloEKh-tCGcH1emOMvkspYc';
const SHEET_NAME = 'Food Chains Responses';

const HEADERS = [
  'Submitted At',
  'Learner Name',
  'Grade & Section',
  'Lesson',
  'Warm-up',
  'Activity 1',
  'Activity 2',
  'Activity 3 - Food Chain Order',
  'Activity 4',
  'Activity 5',
  'Exit Ticket 1',
  'Exit Ticket 2',
  'Producer Answer',
  'Why Plants Are Important',
  'Local Food Chain',
  'If One Organism Disappeared',
  'Score',
  'Total Items',
  'Percentage'
];

// Open the deployed /exec URL in a browser to test the web app.
function doGet() {
  return ContentService
    .createTextOutput('Food Chains Google Sheets connection is ready.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  let lockAcquired = false;

  try {
    if (!/^[a-zA-Z0-9_-]{20,}$/.test(SPREADSHEET_ID)) {
      throw new Error('Invalid spreadsheet ID. Check SPREADSHEET_ID in Code.gs.');
    }

    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('No learner data was received.');
    }

    const data = JSON.parse(e.postData.contents);
    if (!data.learnerName) {
      throw new Error('Learner name is missing.');
    }

    lock.waitLock(15000);
    lockAcquired = true;

    // Open the spreadsheet using the ID above, never the complete URL.
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }

    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    }

    const row = [
      safeCell(data.submittedAt || new Date().toISOString()),
      safeCell(data.learnerName),
      safeCell(data.gradeSection),
      safeCell(data.lesson),
      safeCell(data.warmUp),
      safeCell(data.activity1),
      safeCell(data.activity2),
      safeCell(data.activity3),
      safeCell(data.activity4),
      safeCell(data.activity5),
      safeCell(data.exit1),
      safeCell(data.exit2),
      safeCell(data.producerAnswer),
      safeCell(data.plantImportance),
      safeCell(data.localFoodChain),
      safeCell(data.organismChange),
      safeCell(data.score),
      safeCell(data.total),
      safeCell(data.percentage)
    ];

    sheet.appendRow(row);
    SpreadsheetApp.flush();

    return jsonResponse({ success: true, message: 'Learner record successfully saved.' });
  } catch (error) {
    console.error('SAVE ERROR: ' + error.message);
    return jsonResponse({ success: false, message: error.message });
  } finally {
    if (lockAcquired) lock.releaseLock();
  }
}

// Prevent learner-entered text from being interpreted as a spreadsheet formula.
function safeCell(value) {
  if (value === null || value === undefined) return '';
  const text = String(value).substring(0, 5000);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
