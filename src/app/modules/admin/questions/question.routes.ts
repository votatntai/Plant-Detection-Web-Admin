import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { QuestionComponent } from './question.component';
import { QuestionService } from './question.service';

export default [
    {
        path: '',
        component: QuestionComponent,
        resolve: {
            data: () => inject(QuestionService).getQuestions(),
        },
    },
] as Routes;
