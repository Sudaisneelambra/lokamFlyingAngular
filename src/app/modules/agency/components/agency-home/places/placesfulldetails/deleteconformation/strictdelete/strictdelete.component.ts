import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { agencyService } from 'src/app/modules/agency/services/agency.service';
import { PlaceService } from 'src/app/modules/agency/services/place.service';

@Component({
  selector: 'app-strictdelete',
  templateUrl: './strictdelete.component.html',
  styleUrls: ['strictdelete.component.css'],
})
export class StrictDelete implements OnDestroy{

  @Input() id: any;
  @Output() cancel = new EventEmitter();
  packageplacedelete$ =new Subscription()
  
  constructor(
    private placeservice: PlaceService,
    private router: Router,
    private agencyservice: agencyService
  ) {}
  
  cancelation() {
    this.cancel.emit(false);
  }
  
  delete() {
    this.packageplacedelete$ =this.placeservice.packageplacedelete(this.id).subscribe({
      next: (res) => {
        if (res.expiry) {
          alert('session expired please login');
          this.agencyservice.agencylogout();
        } else {
          if (res.success) {
            setTimeout(() => {
              this.router.navigate(['/agency/home']);
            }, 1000);
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.packageplacedelete$?.unsubscribe()
  }
}
