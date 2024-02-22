import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { agencyService } from 'src/app/modules/agency/services/agency.service';
import { packageService } from 'src/app/modules/agency/services/package.service';

@Component({
  selector: 'app-packageedelete',
  templateUrl: './packagedeleteconformation.component.html',
  styleUrls: ['./packagedeleteconformation.component.css'],
})
export class PackageDeleteConformation implements OnInit ,OnDestroy {

  constructor(private router: Router, private packageservice:packageService, private agencyservice:agencyService) {}
  
  @Input() id!: any;
  @Output() canceldelete = new EventEmitter();
  @Output() msg = new EventEmitter();
  
  deletepackage$ = new Subscription()

  ngOnInit(): void {}

//   deleting confirm and call the delete api
  confirmboolean() {
    // deleting place from database
    this.packageservice.deletingPackage(this.id).subscribe({
      next: (res) => {
        if (res.expiry) {
          alert('session expired please login');
          this.agencyservice.agencylogout();
        } else {
          if (res.success) {
            this.msg.emit(res.message);
            this.canceldelete.emit(false);
            setTimeout(() => {
              this.msg.emit('');
              this.router.navigate(['/agency/home']);
            }, 2000);
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  
  //   delete cancel emit
  cancel() {
    this.canceldelete.emit(false);
  }

  ngOnDestroy(): void {
    this.deletepackage$?.unsubscribe()
  }
}
