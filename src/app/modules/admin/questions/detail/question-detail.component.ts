import { NgFor, NgIf } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Question } from 'app/types/question.type';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [MatButtonModule, MatIconModule, NgIf, NgFor, MatRadioModule, FormsModule
    ],
})
export class QuestionDetailComponent implements OnInit {

    question: Question;
    thumbnailUrl: string;

    constructor(
        public matDialogRef: MatDialogRef<QuestionDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {

    }

    ngOnInit() {
        this.question = this.data;
        console.log(this.question);

    }
}