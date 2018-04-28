import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CommunicationHomeService } from './communication-home.service';

@Component({
  selector: 'app-communication-home',
  templateUrl: './communication-home.component.html',
  styleUrls: ['./communication-home.component.scss'],
  animations : fuseAnimations
})
export class CommunicationHomeComponent implements OnInit {

  standards: any[] = [];
  divisions: any[] = [];
  selectedRecipient: string = '';
  selectedStd: string = '0';
  selectedDiv: string = '0';
  selectedType: string = 'byEmail';
  selectedStdRecipient: any[] = [];

  constructor(private communicationHomeService: CommunicationHomeService) { 

  }

  ngOnInit() {
    this.getStandards();
    this.getDivisions();
  }

  getStandards(): void {
    this.communicationHomeService.getStandards().subscribe((stds: any) => {
      this.standards = stds;
    });
  }

  getDivisions(): void {
    this.communicationHomeService.getDivisions().subscribe((divs: any) => {
      this.divisions = divs;
    });
  }

  onChanveRecipients(event): void {
    this.selectedRecipient = event.value;
  }

  onChange(event): void {
    if (event.checked) {
      this.selectedStdRecipient.push(event.source.value);
    } else {
      let index = this.selectedStdRecipient.indexOf(event.source.value);
      this.selectedStdRecipient.splice(index, 1);
    }
  }
}
