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
import { Question } from 'app/types/question.type';
import { Pagination } from 'app/types/pagination.type';
import { Observable, Subject, debounceTime, map, switchMap, takeUntil } from 'rxjs';
import { QuestionService } from './question.service';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { QuestionDetailComponent } from './detail/question-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateQuestionComponent } from './create/question-create.component';

@Component({
    selector: 'app-question',
    templateUrl: 'question.component.html',
    styleUrls: ['question.component.css'],
    standalone: true,
    imports: [CommonModule, MatProgressBarModule, MatIconModule, MatButtonModule, MatInputModule,
        MatPaginatorModule, MatSortModule, CustomPipesModule, MatSelectModule, FormsModule, ReactiveFormsModule,
    ],
})

export class QuestionComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;

    questions$: Observable<Question[]>;

    searchInputControl: UntypedFormControl = new UntypedFormControl();
    isLoading: boolean = false;
    pagination: Pagination;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _questionService: QuestionService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _dialog: MatDialog,
    ) { }

    ngOnInit() {
        // Get the products
        this.questions$ = this._questionService.questions$;

        // Get the pagination
        this._questionService.pagination$
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
                    return this._questionService.getQuestions(this._paginator.pageIndex, this._paginator.pageSize);
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
                    return this._questionService.getQuestions(0, this._paginator.pageSize, query);
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
    }

    openCreateQuestionDialog() {
        this._dialog.open(CreateQuestionComponent, {
            width: '960px',
        })
    }

    openQuestionDetail(questionId: string) {
        this._questionService.getQuestion(questionId).subscribe(question => {
            this._dialog.open(QuestionDetailComponent, {
                width: '1260px',
                data: question
            })
        })

    }
}