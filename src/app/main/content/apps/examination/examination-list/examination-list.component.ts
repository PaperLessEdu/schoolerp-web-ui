import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { ExaminationListService } from './examination-list.service';

@Component({
  selector: 'app-examination-list',
  templateUrl: './examination-list.component.html',
  styleUrls: ['./examination-list.component.scss'],
  animations: fuseAnimations
})
export class ExaminationListComponent implements OnInit {

  examList = [
    {
      "name": "Unit Test 1",
      "examSchedule": [
        {
          "subjectName": "Marathi",
          "distribution": [
            {
              "date": "2018-07-29T18:30:00.000Z",
              "startTime": "14:00",
              "endTime": "15:00",
              "examType": "Theory",
              "scoreType": "Marks",
              "marksOutOf": 80,
              "passingMarks": 35
            },
            {
              "date": "2018-07-30T18:30:00.000Z",
              "startTime": "13:00",
              "endTime": "14:30",
              "examType": "Oral",
              "scoreType": "Marks",
              "marksOutOf": 20,
              "passingMarks": 7
            }
          ],
          "isexpand": false
        },
        {
          "subjectName": "Maths",
          "distribution": [
            {
              "date": "2018-07-30T18:30:00.000Z",
              "startTime": "16:00",
              "endTime": "17:00",
              "examType": "Theory",
              "scoreType": "Grade",
              "marksOutOf": null,
              "passingMarks": null
            }
          ],
          "isexpand": false
        }
      ],
      "isexpand": false
    },
    {
      "name": "Unit Test 2",
      "examSchedule": [
        {
          "subjectName": "Science",
          "distribution": [
            {
              "date": "2018-07-29T18:30:00.000Z",
              "startTime": "14:00",
              "endTime": "15:00",
              "examType": "Theory",
              "scoreType": "Marks",
              "marksOutOf": 80,
              "passingMarks": 35
            }
          ],
          "isexpand": false
        },
        {
          "subjectName": "History",
          "distribution": [
            {
              "date": "2018-07-30T18:30:00.000Z",
              "startTime": "16:00",
              "endTime": "17:00",
              "examType": "Theory",
              "scoreType": "Grade",
              "marksOutOf": null,
              "passingMarks": null
            }
          ],
          "isexpand": false
        }
      ],
      "isexpand": false
    }
  ];

  constructor(
    private examinationListService: ExaminationListService) { }

  ngOnInit() {
  }

  private fetchAcademicYearList(): void {
    this.examinationListService.getExamList().subscribe((academicYears: any) => {
      // this.academicYears = academicYears;
    });
  }
}
