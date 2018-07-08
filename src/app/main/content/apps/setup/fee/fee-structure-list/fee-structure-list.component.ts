import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-fee-structure-list',
  templateUrl: './fee-structure-list.component.html',
  styleUrls: ['./fee-structure-list.component.scss'],
  animations : fuseAnimations
})
export class FeeStructureListComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
