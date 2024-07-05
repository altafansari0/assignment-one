import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../interface/item';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  standalone: true,
  styleUrl: './item-detail.component.scss'
})
export class ItemDetailComponent{
@Input() userDetails!: User;
}
