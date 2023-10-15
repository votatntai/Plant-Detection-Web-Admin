import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardComponent } from '@fuse/components/card';
import { CustomPipesModule } from '@fuse/pipes/custom-pipes.module';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ClassStudent } from 'app/types/class-student.type';
import { Class } from 'app/types/class.type';
import { Pagination } from 'app/types/pagination.type';
import { ClassService } from '../claass.service';
import { FuseAlertComponent } from '@fuse/components/alert';

@Component({
    selector: 'app-class-detail',
    templateUrl: 'class-detail.component.html',
    standalone: true,
    styleUrls: ['class-detail-component.css'],
    imports: [MatIconModule, FuseCardComponent, CommonModule, MatButtonModule, CustomPipesModule, FuseAlertComponent]
})

export class ClassDetailComponent implements OnInit {

    class: Class;
    classStudents: ClassStudent[];
    studentsPagination: Pagination;

    constructor(
        public matDialogRef: MatDialogRef<ClassDetailComponent>,
        private _classService: ClassService,
        private _fuseConfimationService: FuseConfirmationService
    ) { }

    ngOnInit() {
        this._classService.class$.subscribe(iClass => {
            this.class = iClass;
        })
        this._classService.classStudents$.subscribe(student => {
            this.classStudents = student;
        });
    }

    approveClass() {
        this._fuseConfimationService.open({
            title: 'Approve this class?',
            actions: {
                confirm: {
                    color: 'primary'
                }
            },
            icon: {
                name: 'heroicons_outline:check',
                color: 'primary'
            }
        }).afterClosed().subscribe(result => {
            if (result === 'confirmed') {
                this._classService.approveClass(this.class.id).subscribe();
            }
        });
    }

    rejectClass() {
        this._fuseConfimationService.open({
            title: 'Reject this class?',
            input: {
                title: 'The reason',
            },
        }).afterClosed().subscribe(result => {
            if (result.status === 'confirmed') {
                this._classService.rejectClass(this.class.id, result.message).subscribe();
            }
        });
    }
}