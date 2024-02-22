import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { agencyService } from 'src/app/modules/agency/services/agency.service';
import { GuideService } from 'src/app/modules/agency/services/guid.service';

@Component({
  selector: 'app-strictdeleteguid',
  templateUrl: './strictdeleteguid.component.html',
  styleUrls: ['strictdeleteguid.component.css'],
})
export class StrictDeleteGuid implements OnDestroy{
  
  @Input() id: any;
  @Output() cancels = new EventEmitter();
  guidedelete$ =new Subscription()
  
  constructor(private guideservice: GuideService, private router: Router , private agencyservice:agencyService) {}
  
  cancelation() {
    this.cancels.emit(false);
  }

  delete() {
   this.guidedelete$ = this.guideservice.packageguidedelete(this.id).subscribe({
      next: (res) => {
        if (res.expiry) {
          alert('session expired please login');
          this.agencyservice.agencylogout();
        } else {
          if (res.success) {
            console.log('strictly confirmed and deleted');
  
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
    this.guidedelete$.unsubscribe()
  }
}
