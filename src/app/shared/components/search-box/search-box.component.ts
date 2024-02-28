import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {


  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?:Subscription;

  @Input()
  public placeholder:string = '';

  @Input()
  public valueTxt?:string = '';

  @Output()
  public onSearchTxt = new EventEmitter<string>;

  @Output()
  public onDebounce = new EventEmitter<string>;

  ngOnInit(): void {

    this.debouncerSuscription = this.debouncer
      .pipe(
        debounceTime(500)
      )
      .subscribe(valueVar => {
        this.onDebounce.emit(valueVar);

      })
  }

  ngOnDestroy(): void {

    this.debouncerSuscription?.unsubscribe();

  }

  public emitSearchText(txtToFind:string){

    if(!txtToFind) return;

    this.onSearchTxt.emit(txtToFind);

  }

  public onKeyPress(searchTerm:string){

    this.debouncer.next (searchTerm);

  }



}
