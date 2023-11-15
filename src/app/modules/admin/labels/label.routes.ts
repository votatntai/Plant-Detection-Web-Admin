import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { LabelComponent } from './label.component';
import { LabelService } from './label.service';

export default [
    {
        path: '',
        component: LabelComponent,
        resolve: {
            data: () => inject(LabelService).getLabels(),
        },
    },
] as Routes;
