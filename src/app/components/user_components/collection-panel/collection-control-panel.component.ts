import { Component } from '@angular/core';

export interface ICollection {
  user: string,
  name: string,
  currentImage: string,
  images: string[],
  date: Date
}

@Component({
  selector: 'app-collection-control-panel',
  templateUrl: './collection-control-panel.component.html',
  styleUrls: ['./collection-control-panel.component.scss']
})

export class CollectionControlPanelComponent {
  back = "https://images.pexels.com/photos/1374509/pexels-photo-1374509.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";
  collections: ICollection[] = new Array(10)

  constructor(){
    this.setCollections()
  }
  
  setCollections() {
     const NUM_ITEMS = 10; // Number of items in the array

    for (let i = 0; i < NUM_ITEMS; i++) {
      const item: ICollection = {
        user: `${i}`,
        name: `Collection ${i}`,
        currentImage: this.back,
        images: [
          "https://images.pexels.com/photos/185933/pexels-photo-185933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/1008000/pexels-photo-1008000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/3775553/pexels-photo-3775553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ],
        date: new Date()
      };
      this.collections[i] = item;
    }
  }

}
