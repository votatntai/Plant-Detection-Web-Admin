import { NgFor, NgIf } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Plant } from 'app/types/plant.type';

@Component({
    selector: 'app-plant-detail',
    templateUrl: './plant-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [MatButtonModule, MatIconModule, NgIf, NgFor
    ],
})
export class PlantDetailComponent implements OnInit {

    plant: Plant;
    thumbnailUrl: string;

    constructor(
        public dialogRef: MatDialogRef<PlantDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

    }

    ngOnInit() {
        this.plant = this.data;

        this.thumbnailUrl = this.plant.images[0].url;
    }

    setThumbnail(url: string) {
        this.thumbnailUrl = url;
    }
}