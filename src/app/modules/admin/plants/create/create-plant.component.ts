import { NgFor, NgIf } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { QuillEditorComponent } from 'ngx-quill';
import { PlantService } from '../plant.service';
import { Category } from 'app/types/category.type';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
    selector: 'app-create-plant',
    templateUrl: './create-plant.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf, NgFor, QuillEditorComponent,
        MatSelectModule
    ],
})
export class CreatePlantComponent implements OnInit {

    selectedImages: File[] = new Array(5);
    objectURLs: (string | null)[] = new Array(5);
    imageSelected: boolean[] = [false, false, false, false, false];
    categories: Category[] = [];

    createPlantForm: UntypedFormGroup;
    copyFields: { cc: boolean; bcc: boolean } = {
        cc: false,
        bcc: false,
    };
    quillModules: any = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
        ],
    };

    /**
     * Constructor
     */
    constructor(
        public dialogRef: MatDialogRef<CreatePlantComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<CreatePlantComponent>,
        private _formBuilder: UntypedFormBuilder,
        private _plantService: PlantService,
        private _fuseConfirmationService: FuseConfirmationService
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
        this.createPlantForm = this._formBuilder.group({
            name: ['', [Validators.required]],
            categoryIds: [[], [Validators.required]],
            description: ['', [Validators.required]],
            code: ['', Validators.required],
            images: [[], [Validators.required]],
            scienceName: [''],
            genus: [''],
            species: [''],
            livingCondition: [''],
            distributionArea: [''],
            ph: [''],
            uses: [''],
            fruitTime: [''],
            conservationStatus: [''],
            size: [''],
            discoverer: [''],
        });

        this.categories = this.data.categories;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onSelectFile(event: any, index: number) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.selectedImages[index] = event.target.files[0];
                this.objectURLs[index] = URL.createObjectURL(event.target.files[0]);
                this.imageSelected[index] = true;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    onSubmit() {
        // Tạo đối tượng FormData
        const formData = new FormData();

        // Lặp qua mảng selectedImages và thêm từng tệp vào formData
        for (let i = 0; i < this.selectedImages.length; i++) {
            if (this.selectedImages[i]) {
                formData.append('images', this.selectedImages[i]);
            }
        }

        var categoryIds = this.createPlantForm.get('categoryIds').value;
        categoryIds.forEach(function (categoryId, i) {
            formData.append('plantCategories[' + i + '][categoryId]', categoryId);
        });

        // Lấy các giá trị khác từ biểu mẫu và thêm vào formData
        formData.append('name', this.createPlantForm.get('name').value);
        formData.append('description', this.createPlantForm.get('description').value);
        formData.append('code', this.createPlantForm.get('code').value);
        formData.append('scienceName', this.createPlantForm.get('scienceName').value);
        formData.append('genus', this.createPlantForm.get('genus').value);
        formData.append('livingCondition', this.createPlantForm.get('livingCondition').value);
        formData.append('distributionArea', this.createPlantForm.get('distributionArea').value);
        formData.append('ph', this.createPlantForm.get('ph').value);
        formData.append('uses', this.createPlantForm.get('uses').value);
        formData.append('fruitTime', this.createPlantForm.get('fruitTime').value);
        formData.append('conservationStatus', this.createPlantForm.get('conservationStatus').value);
        formData.append('size', this.createPlantForm.get('size').value);
        formData.append('discoverer', this.createPlantForm.get('discoverer').value);

        // Gửi biểu mẫu dưới dạng multipart/form-data
        this._plantService.createPlant(formData).subscribe(result => {
            this.dialogRef.close();
        }, error => {
            if (error.status === 409 && error.error === 'The plant code already exists') {
                this._fuseConfirmationService.open({
                    title: 'Conflict',
                    message: error.error,
                    actions: {
                        cancel: {
                            show: false
                        }
                    }
                });
            }
            if (error.status === 409 && error.error === 'The plant name already exists') {
                this._fuseConfirmationService.open({
                    title: 'Conflict',
                    message: error.error,
                    actions: {
                        cancel: {
                            show: false
                        }
                    }
                });
            }
        });
    }

    /**
     * Save and close
     */
    saveAndClose(): void {
        // Save the message as a draft
        this.saveAsDraft();

        // Close the dialog
        this.matDialogRef.close();
    }

    /**
     * Discard the message
     */
    discard(): void {
    }

    /**
     * Save the message as a draft
     */
    saveAsDraft(): void {
    }

    /**
     * Send the message
     */
    send(): void {
    }
}
