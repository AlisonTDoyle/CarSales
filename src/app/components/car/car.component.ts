import { Component, EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';
import { CarApiService } from '../../services/car-api/car-api.service';
import { ICar } from '../../interfaces/car';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [],
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss'
})
export class CarComponent {
  // Inputs
  @Input() carData?: ICar | any

  // Outputs
  @Output() carDeletedEvent = new EventEmitter<string>();

  // Properties
  carImageWidth = 300;
  placeholderImageUrl = "./../../../assets/images/placeholder.jpg"

  // Constructor
  constructor(private _carAPIService: CarApiService) {

  }

  // Methods
  deleteCar(carId: string) {
    this._carAPIService.delCarDetails(carId).subscribe(result => {
      console.log(result);
      this.carDeletedEvent.emit("car got deleted");
    });
  }
}
