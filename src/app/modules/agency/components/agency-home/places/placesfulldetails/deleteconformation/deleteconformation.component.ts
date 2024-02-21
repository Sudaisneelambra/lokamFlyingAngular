import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { agencyService } from 'src/app/modules/agency/services/agency.service';
import { PlaceService } from 'src/app/modules/agency/services/place.service';

@Component({
  selector: 'app-deleteconformation',
  templateUrl: './deleteconformation.component.html',
  styleUrls: ['./deleteconformation.component.css'],
})
export class DeleteConformation implements OnInit ,OnDestroy{

  constructor( private router: Router, private placeservice:PlaceService) {}
   
  @Input() id!: any;
  strictness:any
  strictid:any
  ngOnInit(): void {
    console.log(this.id);
  }

  @Output() daleteconformationdelete = new EventEmitter();
  @Output() msg = new EventEmitter();

// delete cancel and emitt boolean to parent
  cancel() {
    this.daleteconformationdelete.emit(false);
  }


//   boolean confirmed and api called for delete
  confirmboolean() {
    //deleting place from database
    this.placeservice.confirmation(this.id).subscribe({
      next:(res)=>{
        if(res.strict){
          this.strictness=true
          this.strictid=this.id
        } else{
          this.placeservice.deletingPlace(this.id).subscribe({
            next: (res) => {
              if (res.success) {
                this.msg.emit(res.message);
                this.daleteconformationdelete.emit(false);
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
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    
  }

  cancelling(event:any){
    this.strictness=event
  }


//   ondestroying
  ngOnDestroy(): void {}

  
}
