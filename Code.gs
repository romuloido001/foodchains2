/**
 * Google Apps Script — Grade 7 Food Chains lesson submissions
 *
 * Setup:
 * 1. Create a Google Sheet.
 * 2. Copy its spreadsheet ID into SPREADSHEET_ID below.
 * 3. Deploy this project as a Web App (execute as you; access as Anyone,
 *    if permitted by your school/Workspace administrator).
 */

const SPREADSHEET_ID = 'PASTE_SPREADSHEET_ID_HERE';
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

function doPost(e) {
  try {
    if (!SPREADSHEET_ID || SPREADSHEET_ID === 'PASTE_SPREADSHEET_ID_HERE') {
      throw new Error('Set SPREADSHEET_ID in Code.gs before deployment.');
    }

    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }

    const row = [
      safeCell(data.submittedAt),
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
    return jsonResponse({ success: true, message: 'Record saved.' });
  } catch (error) {
    console.error(error);
    return jsonResponse({ success: false, message: String(error) });
  }
}

/**
 * Prevent spreadsheet formula injection from learner-entered text.
 */
function safeCell(value) {
  if (value === null || value === undefined) return '';
  const text = String(value).slice(0, 5000);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
