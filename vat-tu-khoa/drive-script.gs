// Google Apps Script: nhận file CSV bàn giao từ app và lưu vào Drive của chủ script.
// Triển khai: Deploy > New deployment > Web app > Execute as: Me > Who has access: Anyone.
var KEY = 'DAT_MAT_KHAU_O_DAY';           // phải trùng DRIVE_KEY trong app
var FOLDER = 'Bàn giao khoa';
function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    if (d.key !== KEY) return ContentService.createTextOutput('forbidden');
    if (!/^ban-giao-\d{4}-\d{2}-\d{2}\.csv$/.test(d.name)) return ContentService.createTextOutput('bad name');
    var it = DriveApp.getFoldersByName(FOLDER);
    var folder = it.hasNext() ? it.next() : DriveApp.createFolder(FOLDER);
    var files = folder.getFilesByName(d.name);
    if (files.hasNext()) files.next().setContent(d.csv);
    else folder.createFile(d.name, d.csv, 'text/csv');
    return ContentService.createTextOutput('ok');
  } catch (err) { return ContentService.createTextOutput('error ' + err); }
}
