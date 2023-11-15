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
import { Label } from 'app/types/label.type';
import { Pagination } from 'app/types/pagination.type';
import { Observable, Subject, debounceTime, map, switchMap, takeUntil } from 'rxjs';
import { LabelService } from './label.service';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
    selector: 'app-label',
    templateUrl: 'label.component.html',
    standalone: true,
    imports: [CommonModule, MatProgressBarModule, MatIconModule, MatButtonModule, MatInputModule,
        MatPaginatorModule, MatSortModule, CustomPipesModule, MatSelectModule, FormsModule, ReactiveFormsModule,
    ],
})

export class LabelComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;

    labels$: Observable<Label[]>;

    searchInputControl: UntypedFormControl = new UntypedFormControl();
    isLoading: boolean = false;
    pagination: Pagination;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _labelService: LabelService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService
    ) { }

    ngOnInit() {
        // Get the products
        this.labels$ = this._labelService.labels$;

        // Get the pagination
        this._labelService.pagination$
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
                    return this._labelService.getLabels(0, this._paginator.pageSize);
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
                    return this._labelService.getLabels(0, this._paginator.pageSize, query);
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
    }

    addLabel() {
        this._fuseConfirmationService.open({
            title: 'Create label',
            message: 'Enter label name to create new label',
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
                this._labelService.createLabel({ name: result.message }).subscribe();
            }
        })
    }
}