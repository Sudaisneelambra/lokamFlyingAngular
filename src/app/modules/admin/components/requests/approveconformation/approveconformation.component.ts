import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { admincommon } from '../../../services/admincommon.service';
import { requestagency } from '../../../services/requistagency.service';

@Component({
  selector: 'app-approveconformation',
  templateUrl: './approveconformation.component.html',
  styleUrls: ['./approveconformation.component.css'],
})
export class approveconformation implements OnDestroy {
  @Output() cancelview = new EventEmitter();
  approve$ = new Subscription();
  @Input() id: any;
  message!: any;

  constructor(
    private request: requestagency,
    private router: Router,
    private service: admincommon
  ) {}

  cancel() {
    this.cancelview.emit(false);
  }

  approve() {
    this.approve$ = this.request.approve(this.id).subscribe({
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
    this.approve$?.unsubscribe();
  }
}
