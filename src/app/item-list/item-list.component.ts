import { Component } from '@angular/core';
import { ItemServicesService } from '../services/item-services.service';
import { User } from '../interface/item';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  standalone: true,
  imports: [CommonModule, ItemDetailComponent],
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent {
  public users:User[] =[];
  public errorMessage:string = '';
  public UserDetail!:User;
  public _currentPage = 1;
  private _displayPageData = 3;
  public paginateUserData:User[] = [];
  public prevDisable!:boolean;
  public nextDisable!:boolean;
  constructor(private _services: ItemServicesService){
  
  }
  
  ngOnInit(): void {
    this._services.getUserList().subscribe({
      next: (res)=> {
        this.users = res
        this.updatePaginationData()
        this.onSetPageNumber(1)
      },
      error: () => this.errorMessage = 'Someting went wrong'
    });

  }

  public onFetchDetailData(data:User) {
    this.UserDetail = data;
  }

  public onNextPaginate() {
    let pageNum = this._currentPage + 1;
    this.onSetPageNumber(pageNum);
  }

  public onPreviousPaginate() {
    let pageNum = this._currentPage - 1;
    this.onSetPageNumber(pageNum);
  }

  public totalPages():number {
    return Math.ceil(this.users.length / this._displayPageData)
  }

  private updatePaginationData() {
    const startIndex = (this._currentPage - 1) * this._displayPageData;
    const endIndex = startIndex + this._displayPageData;
    this.paginateUserData =  this.users.slice(startIndex, endIndex);
  }

  private onSetPageNumber(pageNum:number) {
    if(pageNum < 1 || pageNum > this.totalPages()){
      return
    }
    this.prevDisable = pageNum <= 1 ? true : false;
    this.nextDisable = pageNum >= this.totalPages() ? true : false;
    this._currentPage = pageNum;
    this.updatePaginationData()
  }

}
