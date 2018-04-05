import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSortModule, MatTableModule, MatTabsModule, MatStepperModule, MatDividerModule, MatCardModule, MatDatepickerModule, MatSnackBarModule, MatDialogModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { StandardsComponent } from './standards/standards.component';
import { StandardAddComponent } from './standard-add/standard-add.component';

const routes = [
  {
    path: 'standards',
    component: StandardsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,

    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatStepperModule,
    MatDividerModule,
    MatCardModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatDialogModule,

    NgxChartsModule,
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
    }),

    FuseSharedModule,
    FuseWidgetModule
  ],
  declarations: [StandardsComponent, StandardAddComponent],
  entryComponents: [StandardAddComponent]
})
export class SetupModule { }
