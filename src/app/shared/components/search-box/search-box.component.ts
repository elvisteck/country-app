import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {

  @Input()
  public placeholder:string = '';

  @Output()
  public onSearchTxt = new EventEmitter<string>;

  public emitSearchText(txtToFind:string){

    if(!txtToFind) return;

    this.onSearchTxt.emit(txtToFind);



  }



}
