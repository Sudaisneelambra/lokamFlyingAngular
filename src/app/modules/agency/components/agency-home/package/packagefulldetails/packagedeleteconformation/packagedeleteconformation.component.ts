import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { agencyService } from 'src/app/modules/agency/services/agency.service';

@Component({
  selector: 'app-packageedelete',
  templateUrl: './packagedeleteconformation.component.html',
  styleUrls: ['./packagedeleteconformation.component.css'],
})
export class PackageDeleteConformation implements OnInit {
  constructor(private service: agencyService, private router: Router) {}

  @Input() id!: any;
  @Output() canceldelete = new EventEmitter();
  @Output() msg = new EventEmitter();

  ngOnInit(): void {}

//   deleting confirm and call the delete api
  confirmboolean() {
    // deleting place from database
    this.service.deletingPackage(this.id).subscribe({
      next: (res) => {
        if (res.success) {
          this.msg.emit(res.message);
          this.canceldelete.emit(false);
          setTimeout(() => {
            this.msg.emit('');
            this.router.navigate(['/agency/home']);
          }, 2000);
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
}
