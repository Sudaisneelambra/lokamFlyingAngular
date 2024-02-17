import { Component, Input, OnInit } from '@angular/core';
import { agencyService } from '../../../services/agency.service';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent implements OnInit{


  constructor(private service:agencyService){}
  @Input() guide:any
  aboutguide:any
  fullguide!:any

  ngOnInit(): void {

      this.aboutguide =this.slittedDiscription(this.guide.aboutguide)
  }

  getguide(id:any){
    this.service.getsingleguide(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.service.singleguide.next(res.data)
      },
      error:(err)=>{
        console.log(err);
        console.log(err.message);
      }
    })
  }

  onMouseEnter(){
    this.aboutguide=this.fulldetails(this.guide.aboutguide)
  }
  onMouseLeave(){
    this.aboutguide=this.slittedDiscription(this.guide.aboutguide)
  }

  private slittedDiscription(value:string){
    return value.length>55 ? `${value.substring(0,55)}...` :value;
  }

  private fulldetails(value:string){
    return value
  }
}
