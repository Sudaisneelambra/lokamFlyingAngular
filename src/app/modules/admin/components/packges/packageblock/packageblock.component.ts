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
  selector: 'app-packageblock',
  templateUrl: './packageblock.component.html',
  styleUrls: ['./packageblock.component.css'],
})
export class packageblock implements OnDestroy {
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

  block() {
    this.blockingagency$ = this.packageservice.packageblock(this.id).subscribe({
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
