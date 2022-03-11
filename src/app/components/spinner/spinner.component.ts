import { SpinnerService } from './../../services/spinner.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  showSpinner = false;
  constructor(
    private spinnerService: SpinnerService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.spinnerService.getSpinnerObservable().subscribe((status) => {
      this.showSpinner = status === 'start';
      this.cdRef.detectChanges();
    });
  }
}