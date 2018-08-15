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

  examList;

  constructor(
    private examinationListService: ExaminationListService) { }

  ngOnInit() {
    this.fetchExamList();
  }

  private fetchExamList(): void {
    this.examinationListService.getExamList().subscribe((data: any) => {
      this.examList = data; 
    });
  }
}
