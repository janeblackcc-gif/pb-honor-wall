export const DATA_SOURCE_CONFIG = {
  USE_GOOGLE_SHEETS: true,
  SPREADSHEET_ID: '18CYaZwqmQ6qpcKEKLPtxy7zU_GIV6mEHmMYtfUuliEI',
  SHEET_NAME: 'Sheet1',
  CSV_FILE_PATH: './mock-data.csv',
  UPLOAD_LINK: 'https://tally.so/r/GxKWg2',
  DATABASE_LINK: 'https://docs.google.com/spreadsheets/d/18CYaZwqmQ6qpcKEKLPtxy7zU_GIV6mEHmMYtfUuliEI/edit?gid=0#gid=0',
};

export function getDataSourceUrl(): string {
  if (DATA_SOURCE_CONFIG.USE_GOOGLE_SHEETS) {
    return `https://opensheet.elk.sh/${DATA_SOURCE_CONFIG.SPREADSHEET_ID}/${DATA_SOURCE_CONFIG.SHEET_NAME}`;
  }
  return DATA_SOURCE_CONFIG.CSV_FILE_PATH;
}

export function isGoogleSheetsSource(): boolean {
  return DATA_SOURCE_CONFIG.USE_GOOGLE_SHEETS;
}
