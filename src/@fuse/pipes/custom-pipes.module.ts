import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassStudentStatusPipe } from './status-class-student/status-class-student-style.pipe';
import { ClassStatusPipe } from './status-class-style/status-class-style.pipe';

@NgModule({
    declarations: [ClassStudentStatusPipe, ClassStatusPipe],
    imports: [
        CommonModule
    ],
    exports: [ClassStudentStatusPipe, ClassStatusPipe]
})
export class CustomPipesModule { }