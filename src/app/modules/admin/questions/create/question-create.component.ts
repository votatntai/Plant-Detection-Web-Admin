import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { QuillEditorComponent } from 'ngx-quill';
import { QuestionService } from '../question.service';

@Component({
    selector: 'app-create-question',
    templateUrl: './question-create.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf, NgFor, QuillEditorComponent,
        MatSelectModule
    ],
})
export class CreateQuestionComponent implements OnInit {

    selectedImage: File;
    objectURL: (string | null);

    createQuestionForm: UntypedFormGroup;

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<CreateQuestionComponent>,
        private _formBuilder: UntypedFormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _questionService: QuestionService,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        // Create the form
        this.createQuestionForm = this._formBuilder.group({
            title: [null, [Validators.required]],
            answerA: [null, [Validators.required]],
            answerB: [null, [Validators.required]],
            answerC: [null, [Validators.required]],
            answerD: [null, [Validators.required]],
            correctAnswer: [null, [Validators.required, Validators.pattern(/^[ABCD]$/)]],
        });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onSelectFile(event: any) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Chỉ lưu trữ ảnh đầu tiên trong mảng hoặc biến
                this.selectedImage = event.target.files[0];
                this.objectURL = URL.createObjectURL(event.target.files[0]);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    onSubmit() {
        // Tạo đối tượng FormData
        const formData = new FormData();

        formData.append('title', this.createQuestionForm.get('title').value);
        formData.append('answerA', this.createQuestionForm.get('answerA').value);
        formData.append('answerB', this.createQuestionForm.get('answerB').value);
        formData.append('answerC', this.createQuestionForm.get('answerC').value);
        formData.append('answerD', this.createQuestionForm.get('answerD').value);
        formData.append('correctAnswer', this.createQuestionForm.get('correctAnswer').value);
        formData.append(`image`, this.selectedImage);

        if (this.createQuestionForm.valid) {
            // Gửi biểu mẫu dưới dạng multipart/form-data
            this._questionService.createQuestion(formData).subscribe(result => {
                if (result) {
                    this.matDialogRef.close();
                }
            }, error => {
                if (error.status === 409 && error.error === 'The question code already exists') {
                    this._fuseConfirmationService.open({
                        title: 'The question code already exists',
                        message: 'The question code already exists',
                        actions: {
                            cancel: {
                                show: false
                            }
                        }
                    })
                }
                if (error.status === 409 && error.error === 'The question name already exists') {
                    this._fuseConfirmationService.open({
                        title: 'The question name already exists',
                        message: 'The question name already exists',
                        actions: {
                            cancel: {
                                show: false
                            }
                        }
                    })
                }
            });
        }
    }

}
