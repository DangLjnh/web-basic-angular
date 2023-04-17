import { Injectable } from '@angular/core';
import { utils as XLSXUtils, writeFile } from 'xlsx';
import * as XLSX from 'xlsx';
import { WorkBook, WorkSheet } from 'xlsx/types';
import { ExportExcel } from '../models/ExportExcel';
@Injectable({
  providedIn: 'root',
})
export class ExportExelService {
  constructor() {}
  fileExtension = '.xlsx';
  public exportAsExcel({
    data,
    fileName,
    sheetName = 'Data',
    header = [],
    table,
  }: ExportExcel): void {
    let wb: WorkBook;
    if (table) {
      wb = XLSXUtils.table_to_book(table);
    } else {
      const ws: WorkSheet = XLSXUtils.json_to_sheet(data, {
        skipHeader: true,
      });
      // delete key default header add new header i want
      const headerRow = [header];
      XLSXUtils.sheet_add_aoa(ws, headerRow, { origin: 'A1' });

      wb = XLSXUtils.book_new();
      XLSXUtils.book_append_sheet(wb, ws, sheetName);
    }
    writeFile(wb, `${fileName}${this.fileExtension}`);
  }
}
