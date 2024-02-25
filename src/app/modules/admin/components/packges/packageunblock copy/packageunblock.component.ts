import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { userlist } from '../../../services/userlist.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { admincommon } from '../../../services/admincommon.service';
import { packagelistservice } from '../../../services/packages.service';

@Component({
  selector: 'app-packageunblock',
  templateUrl: './packageunblock.component.html',
  styleUrls: ['./packageunblock.component.css'],
})
export class packageunblock implements OnDestroy {
  @Output() cancelview = new EventEmitter();
  blockingagency$ = new Subscription();
  @Input() id: any;
  message!: any;

  constructor(
    private packageservice: packagelistservice,
    private router: Router,
    private service: admincommon
  ) {}

  cancel() {
    this.cancelview.emit(false);
  }

  unblock() {
    this.blockingagency$ = this.packageservice.packageunblock(this.id).subscribe({
      next: (res) => {
        if (res.expiry) {
          alert('session expired or internal error please login');
          this.service.agencylogout();
        } else {
          if (res.success) {
            this.message = res.message;
            setTimeout(() => {
              this.cancelview.emit(false);
              this.router.navigate(['/admin']);
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
    this.blockingagency$?.unsubscribe();
  }
}
