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
import { Plant } from 'app/types/plant.type';

@Component({
    selector: 'app-plant-update',
    templateUrl: './plant-update.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf, NgFor, QuillEditorComponent,
        MatSelectModule
    ],
})
export class PlantUpdateComponent implements OnInit {

    categories: Category[] = [];
    plant: Plant;

    updatePlantForm: UntypedFormGroup;
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
        public dialogRef: MatDialogRef<PlantUpdateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
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
        this.plant = this.data;
        // Create the form
        this.updatePlantForm = this._formBuilder.group({
            name: [this.plant.name, [Validators.required]],
            description: [this.plant.description, [Validators.required]],
            scienceName: [this.plant.scienceName],
            genus: [this.plant.genus],
            species: [this.plant.species],
            livingCondition: [this.plant.livingCondition],
            distributionArea: [this.plant.distributionArea],
            ph: [this.plant.ph],
            uses: [this.plant.uses],
            fruitTime: [this.plant.fruitTime],
            conservationStatus: [this.plant.conservationStatus],
            size: [this.plant.size],
            discoverer: [this.plant.discoverer],
        });

        this.categories = this.data.categories;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    onSubmit() {
        // Gửi biểu mẫu dưới dạng multipart/form-data
        this._plantService.updatePlant(this.plant.id, this.updatePlantForm.value).subscribe(result => {
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
        this.dialogRef.close();
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
