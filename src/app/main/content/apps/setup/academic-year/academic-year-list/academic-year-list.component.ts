import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-academic-year-list',
  templateUrl: './academic-year-list.component.html',
  styleUrls: ['./academic-year-list.component.scss'],
  animations : fuseAnimations
})
export class AcademicYearListComponent implements OnInit {
  loadingIndicator = false;
  rows = [];
  selected = [];
  reorderable = true;

  constructor() { }

  ngOnInit() {

  }

  onAddAction() {

  }

  onEditAction() {

  }

  onDeleteAction() {

  }

  updateFilter(event): void {

  }

  onSelect(obj): void {
    this.selected = obj.selected;
}
}
