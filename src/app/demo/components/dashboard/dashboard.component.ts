import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Product } from '../../api/product';

import { Subscription } from 'rxjs';

@Component({
    selector: 'router-outlet',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [MessageService],
})
export class DashboardComponent implements OnInit, OnDestroy {
    products!: Product[];
    chartData: any;
    chartOptions: any;
    subscription!: Subscription;
    items: MenuItem[] = [];
    filingType: string;
    filingType_S: string;
    filingTypeS: any[];
    month: string;
    monthS: string;
    year: string;
    yearS: string;
    type: string;
    typechoose: any[];
    monthchoose: any[];
    yearchoose: any[];
    saleAmount: number;
    saleAmountS: number;
    inputId: boolean;
    inputIdS: boolean;
    taxAmount: number;
    class: string;
    showicon: boolean = false;
    min: number;
    max: number;
    taxAmountS: number;
    showincase: boolean = false;
    surcharge: number;
    penalty: number;
    surchargeS: number;
    penaltyS: number;
    totalAmount: number;
    totalAmountS: number;
    activeIndex: number = 0;
    pageOn1: boolean = true;
    pageOn2: boolean = false;
    typeshow: boolean = false;
    cfcase1: boolean = true;
    cfcase2: boolean = false;
    invalidradio: string;
    invalidmonth: string;
    invalidyear: string;
    invalidtype: string;
    invalidnum: string;
    invalidnum2: string;
    taxData: boolean;
    JsonStr: string;
    showtaxinvalid: boolean = false;
    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.items = [{ label: 'Input Detail' }, { label: 'Review & Confirm' }];
        this.filingTypeS = [
            { name: 'Ordinary Filing', value: 0 },
            { name: 'Additional Filing', value: 1 },
        ];
        // this.filingType = this.filingTypeS[0].value
        this.monthchoose = [
            { name: 'January', value: '01', disabled: false },
            { name: 'February', value: '02', disabled: false },
            { name: 'March', value: '03', disabled: false },
            { name: 'April', value: '04', disabled: false },
            { name: 'May', value: '05', disabled: false },
            { name: 'June', value: '06', disabled: false },
            { name: 'July', value: '07', disabled: false },
            { name: 'August', value: '08', disabled: false },
            { name: 'September', value: '08', disabled: false },
            { name: 'October', value: '10', disabled: false },
            { name: 'November', value: '11', disabled: false },
            { name: 'December', value: '12', disabled: false },
        ];
        this.yearchoose = [
            { name: '2020', value: '2020', disabled: false },
            { name: '2021', value: '2021', disabled: false },
            { name: '2022', value: '2022', disabled: false },
            { name: '2023', value: '2023', disabled: false },
        ];
        this.typechoose = [
            { name: 'on-time', value: '0', disabled: false },
            { name: 'cusstom', value: '1', disabled: false },
        ];

        var currentDate = new Date();
        var fullmonth = '0' + currentDate.getMonth().toString();
        var month = this.monthchoose.findIndex(
            (data) => data.value == fullmonth
        );
        this.monthchoose.forEach(function (data, i) {
            if (i > month + 1) {
                data.disabled = true;
            }
        });
        this.filingType = this.filingTypeS[0].value;
    }
    numberWithCommas(x: any) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    changemonth(event: any) {
        this.monthS = event.value.name;
        this.invalidmonth = '';
    }
    changeyear(event: any) {
        this.yearS = event.value.name;
        this.invalidyear = '';
    }
    changetype(event: any) {
        this.type = event.value.name;
        this.invalidtype = '';
    }
    clickFiling1() {
        this.showincase = true;
        this.typeshow = true;
        this.filingType_S = 'Additional Filing';
        this.invalidradio = '';
        this.penalty = 0;
        this.penaltyS = 0;
        this.surcharge = 0;
        this.surchargeS = 0;
        this.totalAmount = Number(
            (this.taxAmountS + this.surcharge + this.penalty).toFixed(2)
        );
        this.totalAmountS = Number(
            (this.taxAmountS + this.surcharge + this.penalty).toFixed(2)
        );
    }
    clickFiling0() {
        this.showincase = false;
        this.typeshow = false;
        this.filingType_S = 'Ordinary Filing';
        this.invalidradio = '';
        this.surcharge = Number((this.taxAmount * 0.1).toFixed(2));
        this.surchargeS = Number((this.taxAmountS * 0.1).toFixed(2));
        this.penalty = 200.0;
        this.penaltyS = 200.0;
        this.totalAmount = Number(
            (this.taxAmountS + this.surcharge + this.penalty).toFixed(2)
        );
        this.totalAmountS = Number(
            (this.taxAmountS + this.surcharge + this.penalty).toFixed(2)
        );
        // this.penalty = 200;
    }
    onInput(event: any) {
        this.inputId = false;
        this.invalidnum = '';
    }
    onInputS(event: any) {
        this.inputIdS = false;
        this.class = 'input-styling';
        this.showicon = true;
        this.invalidnum2 = '';
    }
    next() {
        if (this.filingType != undefined) {
            this.invalidradio = '';
            if (this.filingType == '0') {
                if (
                    this.month != undefined &&
                    this.year != undefined &&
                    this.saleAmount != undefined &&
                    this.taxAmount != undefined
                ) {
                    this.filingType_S = 'Ordinary Filing'
                    this.activeIndex = 1;
                    this.pageOn2 = true;
                    this.pageOn1 = false;
                    this.cfcase1 = false;
                    this.cfcase2 = true;
                    this.saleAmountS = this.numberWithCommas(this.saleAmount);
                    this.taxAmountS = this.numberWithCommas(this.taxAmountS);
                    this.taxAmountS = this.numberWithCommas(this.taxAmountS);
                    this.surchargeS = this.numberWithCommas(this.surchargeS);
                    this.penaltyS = this.numberWithCommas(this.penaltyS);
                    this.totalAmountS = this.numberWithCommas(
                        this.totalAmountS.toFixed(2)
                    );
                } else {
                    if (this.month == undefined) {
                        this.invalidmonth = 'ng-invalid ng-dirty';
                    }
                    if (this.year == undefined) {
                        this.invalidyear = 'ng-invalid ng-dirty';
                    }
                    this.invalidnum = 'ng-invalid ng-dirty';
                    this.invalidnum2 = 'ng-invalid ng-dirty';
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Invalid Data.',
                    });
                }
            } else {
              this.filingType_S = 'Additional Filing'
                if (
                    this.month != undefined &&
                    this.year != undefined &&
                    this.saleAmount != undefined &&
                    this.taxAmount != undefined &&
                    this.type != undefined
                ) {
                    this.activeIndex = 1;
                    this.pageOn2 = true;
                    this.pageOn1 = false;
                    this.cfcase1 = false;
                    this.cfcase2 = true;
                    this.saleAmountS = this.numberWithCommas(this.saleAmount);
                    this.taxAmountS = this.numberWithCommas(this.taxAmountS);
                    this.taxAmountS = this.numberWithCommas(this.taxAmountS);
                    this.surchargeS = this.numberWithCommas(this.surchargeS);
                    this.penaltyS = this.numberWithCommas(this.penaltyS);
                    this.totalAmountS = this.numberWithCommas(
                        this.totalAmountS.toFixed(2)
                    );
                } else {
                    if (this.month == undefined) {
                        this.invalidmonth = 'ng-invalid ng-dirty';
                    }
                    if (this.year == undefined) {
                        this.invalidyear = 'ng-invalid ng-dirty';
                    }
                    if (this.type == undefined) {
                        this.invalidtype = 'ng-invalid ng-dirty';
                    }
                    this.invalidnum = 'ng-invalid ng-dirty';
                    this.invalidnum2 = 'ng-invalid ng-dirty';
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Invalid Data.',
                    });
                }
            }
        } else {
            this.invalidradio = 'ng-invalid ng-dirty';
            if (
                this.month != undefined &&
                this.year != undefined &&
                this.saleAmount != undefined &&
                this.taxAmount != undefined
            ) {
                this.activeIndex = 1;
                this.pageOn2 = true;
                this.pageOn1 = false;
                this.cfcase1 = false;
                this.cfcase2 = true;
                this.saleAmountS = this.numberWithCommas(this.saleAmount);
                this.taxAmountS = this.numberWithCommas(this.taxAmountS);
                this.taxAmountS = this.numberWithCommas(this.taxAmountS);
                this.surchargeS = this.numberWithCommas(this.surchargeS);
                this.penaltyS = this.numberWithCommas(this.penaltyS);
                this.totalAmountS = this.numberWithCommas(
                    this.totalAmountS.toFixed(2)
                );
            } else {
                if (this.month == undefined) {
                    this.invalidmonth = 'ng-invalid ng-dirty';
                }
                if (this.year == undefined) {
                    this.invalidyear = 'ng-invalid ng-dirty';
                }
                this.invalidnum = 'ng-invalid ng-dirty';
                this.invalidnum2 = 'ng-invalid ng-dirty';
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Invalid Data.',
                });
            }
        }
    }
    back() {
        this.activeIndex = 0;
        this.pageOn2 = false;
        this.pageOn1 = true;
        this.taxData = false;
        window.location.reload();
    }
    confirm() {
        this.taxData = true;
        var obj = {
            'Total value of taxable electronic service exclusive of VAT':
                this.saleAmount,
            'Total VAT to be remitted': this.taxAmount,
            'Total Amount Payable': this.totalAmountS,
        };
        var objS = {
            'Total value of taxable electronic service exclusive of VAT':
                this.saleAmount,
            'Total VAT to be remitted': this.taxAmount,
            'Total surcharge': this.surcharge,
            'Total penalty': this.penalty,
            'Total Amount Payable': this.totalAmountS,
        };
        if (this.filingType == '0') {
            this.JsonStr = JSON.stringify(obj);
        } else {
            this.JsonStr = JSON.stringify(objS);
        }
    }
    onBlur(event: any) {
        this.inputId = true;
        if (this.saleAmount != undefined) {
            this.saleAmount = Number(this.saleAmount.toFixed(2));
            var taxAmount = (this.saleAmount * 0.07).toFixed(2);
            this.taxAmount = Number(taxAmount);
            this.taxAmountS = Number(taxAmount);
        }
        if (this.filingType == '0') {
            this.surcharge = Number((this.taxAmount * 0.1).toFixed(2));
            this.surchargeS = Number((this.taxAmountS * 0.1).toFixed(2));
            this.penalty = 200.0;
            this.penaltyS = 200.0;
            this.totalAmount = Number(
                (this.taxAmountS + this.surcharge + this.penalty).toFixed(2)
            );
            this.totalAmountS = Number(
                (this.taxAmountS + this.surcharge + this.penalty).toFixed(2)
            );
        } else {
            this.surcharge = 0.0;
            this.surchargeS = 0.0;
            this.penalty = 0.0;
            this.penaltyS = 0.0;
            this.totalAmount = Number(
                (this.taxAmountS + this.surcharge + this.penalty).toFixed(2)
            );
            this.totalAmountS = Number(
                (this.taxAmountS + this.surcharge + this.penalty).toFixed(2)
            );
        }

        this.min = this.taxAmount - 20.0;
        this.max = this.taxAmount + 20.0;
    }
    onBlurS(event: any) {
        this.showicon = false;
        this.taxAmount = Number(this.taxAmount.toFixed(2));
        this.inputIdS = true;
        this.class = '';
        this.max = this.taxAmountS + 20.0;
        this.min = this.taxAmountS - 20.0;
        if (this.taxAmount > this.max || this.taxAmount < this.min) {
            this.invalidnum2 = 'ng-invalid ng-dirty';
            this.showtaxinvalid = true;
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Invalid Tax.',
            });
        } else {
            this.showtaxinvalid = false;
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
