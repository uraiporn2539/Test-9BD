import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { formatDate } from '@angular/common';
import * as moment from 'moment';
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    myDate: any;
    localzone: any;
    Datefull: any;
    word: string;
    items!: MenuItem[];
    
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) {}
    ngOnInit(): void {
        this.myDate = new Date();
        this.myDate = formatDate(this.myDate, 'HH:mm', 'en');
        this.localzone = new Date();
        this.localzone = formatDate(this.localzone, 'z', 'en');
        this.Datefull = moment().format('Do MMMM YYYY');
        if (window.innerWidth > 991) {
            this.word = 'Lorem Co.Ltd.';
         
        } else {
            this.word = 'Log out'
        }
    }
}
