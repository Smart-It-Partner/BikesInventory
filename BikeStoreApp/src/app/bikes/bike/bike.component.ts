import { Component, OnInit } from '@angular/core';
import { BikeService } from '../shared/bike.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { error } from 'util';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.css']
})
export class BikeComponent implements OnInit {

  constructor(private bikeService : BikeService, private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form? : NgForm){
    if(form !=null)
    form.reset();
    this.bikeService.selectedBike = {
      BikeID : null,
      BikeBrand : '',
      BikeColor : '',
      BikeDesc : '',
      BikeModel : '',
      BikePrice : null,
      BikeQty : null,
      BikeRating : null,
      BikeRef : '',
      BikeType : ''
    }
  }
  onSubmit(form : NgForm){
    if (form.value.BikeID == null) {    
      this.bikeService.postBikes(form.value)
      .subscribe( 
        data => {
          this.resetForm(form);
          this.toastr.success('New record added succesfully !', 'Bike Register',{positionClass: "toast-bottom-right", closeButton: true});
          this.bikeService.getBikesList();
        }, 
        error => {
          this.toastr.error('Error when adding a new record !', 'Bike Register',{positionClass: "toast-bottom-right", closeButton: true});
        }
      ); 
    }else{
      this.bikeService.updateBike(form.value.BikeID,form.value)
      .subscribe( 
        data => {
          this.resetForm(form);
          this.toastr.info('Record updated succesfully !', 'Bike Register',{positionClass: "toast-bottom-right", closeButton: true});
          this.bikeService.getBikesList();
        }, 
        error => {
          this.toastr.error('Error when updating record !', 'Bike Register',{positionClass: "toast-bottom-right", closeButton: true});
        }
      );
    
    }    
  }


}
