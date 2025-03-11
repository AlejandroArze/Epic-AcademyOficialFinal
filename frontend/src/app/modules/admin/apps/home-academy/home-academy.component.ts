import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'home-academy',
    templateUrl: './home-academy.component.html',
    styleUrls: ['./home-academy.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        RouterLink
    ]
})
export class HomeAcademyComponent {
    constructor() {}
} 