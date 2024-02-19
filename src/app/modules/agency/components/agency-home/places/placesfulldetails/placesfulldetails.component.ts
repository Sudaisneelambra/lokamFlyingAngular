import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Carousel, initTE } from 'tw-elements';
import { agencyService } from 'src/app/modules/agency/services/agency.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-placefulldetails',
  templateUrl: './placesfulldetails.component.html',
  styleUrls: ['./placesfulldetails.component.css'],
})
export class PlaceFulldetails implements OnInit, OnDestroy {
  constructor(private service: agencyService, private location: Location, private router:Router ,private route:ActivatedRoute) {}

  singlePlacedata!: any;
  selectedIndex = 0;
  bool = true;
  control = true;
  val = true;
  images:any
  msg!:string

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
        const id = params['id'];
        // getting all detials of specific place
        this.service.getsingleplace(id).subscribe({
            next:(res)=>{
                console.log(res);
                this.singlePlacedata=res.data
                this.images=res.data.placeurl
                console.log(this.singlePlacedata);
                
            },
            error:(err)=>{
                console.log(err.message);
                this.router.navigate(['/error']) 
            }
        })
      });

    // auto carosel
    if(this.val){
        this.auto()
      }
  }

  // delete button function
  delete(id:any){
    const confirmed = confirm('Are you sure you want to delete?');
   if(confirmed){
    // deleting place from database
    this.service.deletingPlace(id).subscribe({
        next:(res)=>{
            if(res.success){
                this.msg=res.message
                setTimeout(() => {
                    this.msg=''
                    this.router.navigate(['/agency/home'])
                }, 2000);
            }
        },
        error:(err)=>{
          console.log(err);   
        }
    })
   }
  }

  // edit button triggered
  edit(id:any){
    this.router.navigate([`/agency/placeadd`], { queryParams: { id: id } })
  }

// carosel function
  selectimge(index: number) {
    this.selectedIndex = index;
  }

  // carosel preview button function
  onprevclick() {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images?.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  // carosel next button function
  onnextclick() {
    if (this.selectedIndex === this.images?.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

  // auto acrosel
  auto(){
    setInterval(()=>{
      this.onnextclick()
    },5000)
  }

  // back to previous location
  back() {
    this.location.back();
  }

  // distroing component
  ngOnDestroy(): void {
  }
}
