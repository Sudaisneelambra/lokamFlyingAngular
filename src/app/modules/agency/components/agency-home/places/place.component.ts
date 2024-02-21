import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { agencyService } from '../../../services/agency.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-places',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css'],
})
export class PlaceComponent implements OnInit {
  constructor(private service: agencyService, private rounter: Router) {}

  @Input() data: any;
  isHovered: boolean = false;
  interwell: number = 0;
  truncatedDescription: any;
  placeName: any;

  selectedIndex = 0;
  bool = true;
  control = true;
  val = true;
  images: any;

  // ng oninit for getting place url 
  ngOnInit(): void {
    this.images = this.data.placeurl;

    //  pipe method for place discription
    this.truncatedDescription = this.truncateDescription(
      this.data.placeDescription
    );
    this.placeName = this.place(this.data.placeName);

    // caresel automatic
    if (this.val) {
      this.auto();
    }
  }

  // mouse enter function for pipe using
  onMouseEnter() {
    this.truncatedDescription = this.fullviewDescription(
      this.data.placeDescription
    ); // Store the original description
    this.placeName = this.fullPlacename(this.data.placeName);
  }

  // mouse leave function for pipe using
  onMouseLeave() {
    this.truncatedDescription = this.truncateDescription(
      this.data.placeDescription
    ); // Apply the pipe again
    this.placeName = this.place(this.data.placeName);
  }

  //  pipe method for place discription
  private truncateDescription(value: string): string {
    return value.length > 50 ? `${value.substring(0, 50)}...` : value;
  }

  // full value showing
  private fullviewDescription(value: string): string {
    return value;
  }
  // place name piping
  private place(value: string): string {
    return value.length > 12 ? `${value.substring(0, 12)}...` : value;
  }

  // place name full value
  private fullPlacename(value: string): string {
    return value;
  }

  // full details function ,it navigate to main file of full details
  fulldetails(id: any) {
    this.rounter.navigate([`/agency/placedetails/${id}`]);
  }

  // carosel selection of image
  selectimge(index: number) {
    this.selectedIndex = index;
  }

  // previous button clicked on carosel
  onprevclick() {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  // next button clicked on carosel
  onnextclick() {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

  // caresel automatic
  auto() {
    setInterval(() => {
      this.onnextclick();
    }, 6000);
  }
}
