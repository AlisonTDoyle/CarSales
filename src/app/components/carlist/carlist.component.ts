import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarApiService } from '../../services/car-api/car-api.service';
import { ICar, NewCar } from '../../interfaces/car';
import { CarComponent } from '../car/car.component';

@Component({
  selector: 'app-carlist',
  standalone: true,
  imports: [
    CommonModule
    , CarComponent
  ],
  templateUrl: './carlist.component.html',
  styleUrl: './carlist.component.scss'
})
export class CarlistComponent {
  // Properties
  carsData: ICar | any
  show: boolean = false;

  // Constructor
  constructor(private _carAPIService:CarApiService) {

  }

  // Methods
  ngOnInit() {
    this.getCars()
  }

  getCars() {
    this._carAPIService.getCarDetails().subscribe(carsData =>
      { this.carsData = carsData
    });
  }

  addCar(make:string, model:string, year:string,imageUrl:string):boolean {
    let addCar:ICar;
    addCar=new NewCar(make,model,year,imageUrl);
    this._carAPIService.addCarDetails(addCar).subscribe(carsData =>
      { 
        this.carsData = carsData
        this.refreshCars();
      }
    );

    return false;
  }

  refreshCars() {
    this.getCars();
  }
}
