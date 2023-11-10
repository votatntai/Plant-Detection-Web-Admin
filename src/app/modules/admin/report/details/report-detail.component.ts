import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FuseAlertComponent } from '@fuse/components/alert';
import { FuseCardComponent } from '@fuse/components/card';
import { CustomPipesModule } from '@fuse/pipes/custom-pipes.module';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Report } from 'app/types/report.type';
import { ReportService } from '../report.service';

@Component({
    selector: 'app-report-detail',
    templateUrl: 'report-detail.component.html',
    standalone: true,
    styleUrls: ['report-detail-component.css'],
    imports: [MatIconModule, FuseCardComponent, CommonModule, MatButtonModule, CustomPipesModule, FuseAlertComponent]
})

export class ReportDetailComponent implements OnInit {

    report: Report;

    constructor(
        public matDialogRef: MatDialogRef<ReportDetailComponent>,
        private _reportService: ReportService,
        private _fuseConfimationService: FuseConfirmationService
    ) { }

    ngOnInit() {
        this._reportService.report$.subscribe(report => {
            this.report = report;
        })
    }
}