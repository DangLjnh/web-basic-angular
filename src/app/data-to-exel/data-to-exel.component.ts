import { Component, OnInit } from '@angular/core';
import { ExportExelService } from '../services/export-exel.service';
@Component({
  selector: 'app-data-to-exel',
  templateUrl: './data-to-exel.component.html',
  styleUrls: ['./data-to-exel.component.scss'],
})
export class DataToExcelComponent {
  constructor(private exportExcelService: ExportExelService) {}
  users = [
    {
      id: 1,
      name: 'Linh',
      email: 'linh@gmail.com',
      phone: 123,
    },
    {
      id: 2,
      name: 'Vu',
      email: 'vu@gmail.com',
      phone: 456,
    },
    {
      id: 3,
      name: 'Binh',
      email: 'binh@gmail.com',
      phone: 789,
    },
  ];

  exportExcel(): void {
    /* table id is passed over here */
    console.log('hello');
    this.exportExcelService.exportAsExcel({
      data: this.users,
      fileName: 'user',
      sheetName: 'Users',
      header: ['ID', 'Tên', 'Email', 'Phone'],
      table: null,
    });
  }
}
