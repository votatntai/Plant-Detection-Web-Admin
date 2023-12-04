import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { CustomPipesModule } from '@fuse/pipes/custom-pipes.module';
import { Exam } from 'app/types/exam.type';
import { Pagination } from 'app/types/pagination.type';
import { Observable, Subject, debounceTime, map, switchMap, takeUntil } from 'rxjs';
import { ExamService } from './exam.service';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
    selector: 'app-exam',
    templateUrl: 'exam.component.html',
    standalone: true,
    imports: [CommonModule, MatProgressBarModule, MatIconModule, MatButtonModule, MatInputModule,
        MatPaginatorModule, MatSortModule, CustomPipesModule, MatSelectModule, FormsModule, ReactiveFormsModule,
    ],
})

export class ExamComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;

    exams$: Observable<Exam[]>;

    searchInputControl: UntypedFormControl = new UntypedFormControl();
    isLoading: boolean = false;
    pagination: Pagination;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _examService: ExamService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService
    ) { }

    ngOnInit() {
        // Get the products
        this.exams$ = this._examService.exams$;

        // Get the pagination
        this._examService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: Pagination) => {

                // Update the pagination
                this.pagination = pagination;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe search input
        this.subscribeSearchInput();

    }

    ngAfterViewInit(): void {
        if (this._paginator) {
            // Detect changes
            this._changeDetectorRef.detectChanges();

            // Get products if sort or page changes
            this._paginator.page.pipe(
                switchMap(() => {
                    this.isLoading = true;
                    return this._examService.getExams(this._paginator.pageIndex, this._paginator.pageSize);
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
        }
    }

    subscribeSearchInput() {
        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                switchMap((query) => {
                    this.isLoading = true;
                    return this._examService.getExams(0, this._paginator.pageSize, query);
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
    }

    addExam() {
        this._fuseConfirmationService.open({
            title: 'Create exam',
            message: 'Enter exam name to create new exam',
            input: {
                title: "Name"
            },
            actions: {
                confirm: {
                    color: 'primary'
                }
            },
            icon: {
                name: 'feather:droplet',
                color: 'primary'
            }
        }).afterClosed().subscribe(result => {
            if (result.status === 'confirmed') {
                this._examService.createExam({ name: result.message }).subscribe();
            }
        })
    }
}