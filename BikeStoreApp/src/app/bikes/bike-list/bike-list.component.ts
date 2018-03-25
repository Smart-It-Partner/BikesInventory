import { Component, OnInit } from '@angular/core';
import {BikeService} from '../shared/bike.service';
import {Bike} from '../shared/bike.model';
import { ToastrService } from 'ngx-toastr';
import { error } from 'util';

@Component({
  selector: 'app-bike-list',
  templateUrl: './bike-list.component.html',
  styleUrls: ['./bike-list.component.css']
})
export class BikeListComponent implements OnInit {

  constructor(private bikeService : BikeService, private toastr : ToastrService) { }

  ngOnInit() {
    this.bikeService.getBikesList()
    .then( 
      data => {
        this.toastr.success('Getting records succesfully !', 'Bike Register',{positionClass: "toast-bottom-right", closeButton: true});
      }
    )
    .catch(
      error => {
        this.toastr.error('Error when getting records !', 'Bike Register',{positionClass: "toast-bottom-right", closeButton: true});
        throw "Throw";
      }
    );
  }

  showForEdit(bike : Bike){
    this.bikeService.selectedBike = Object.assign({},bike);
  }

  onDelete(bikeID : number){
    if (confirm('Are you sure to delete this record ?') == true) {
      this.bikeService.deleteBike(bikeID)
      .subscribe(
        x => {
          this.toastr.warning('Record Deleted Succesfully !', 'Bike Register',{positionClass: "toast-bottom-right", closeButton: true});
          this.bikeService.getBikesList();
        }, 
        error => {
          this.toastr.error('Error when deleting record !', 'Bike Register',{positionClass: "toast-bottom-right", closeButton: true});
          /*, closeButton: true, tapToDismiss : false, disableTimeOut:true*/
        }
      );
      
    }
    
  }

}
