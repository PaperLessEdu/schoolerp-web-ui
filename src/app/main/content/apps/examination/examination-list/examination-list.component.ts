import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { ExaminationListService } from './examination-list.service';
import { ExportAsPdfService } from '../../shared/services/export-as-pdf.service';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-examination-list',
  templateUrl: './examination-list.component.html',
  styleUrls: ['./examination-list.component.scss'],
  animations: fuseAnimations
})
export class ExaminationListComponent implements OnInit {

  examList;

  constructor(
    private examinationListService: ExaminationListService,
    private exportAsPdfService: ExportAsPdfService) { }

  ngOnInit() {
    this.fetchExamList();
  }

  private fetchExamList(): void {
    this.examinationListService.getExamList().subscribe((data: any) => {
      this.examList = data;
    });
  }

  exportAsPdf(exam): void {
    const columns = [
        {title: 'Date', dataKey: 'date'},
        {title: 'Subject', dataKey: 'subject'},
        {title: 'Time', dataKey: 'time'},
        {title: 'Total marks', dataKey: 'marksOutOf'}
    ];
    const examTT = [];
    exam.examSchedule.map( obj => {
      const subId = obj.subjectId;
      obj.distribution.map( x => {
        const sub = {
          date: x.date,
          subject: subId,
          time: x.startTime + ' - ' + x.endTime,
          marksOutOf: x.marksOutOf
        };
        examTT.push(sub);
      });
    });
    this.exportAsPdfService.exportGridData(columns, examTT, 'exam-timetable', 'Exam Timetable');
  }
}
