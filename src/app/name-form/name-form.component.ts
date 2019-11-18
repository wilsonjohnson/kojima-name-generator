import { Output, EventEmitter, Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { LocalStorageService } from '../service/local-storage.service';
import { ANSWERS } from '../globals';
import { Answers } from '../types/answers';


@Component({
  selector: 'name-form',
  templateUrl: './name-form.component.html',
  styleUrls: ['./name-form.component.css']
})
export class NameFormComponent implements OnInit {
  public group: FormGroup;
  @Output()
  public value = new EventEmitter<any>();

  @Input()
  public answers: Answers;
  public readonly states = ['Solid','Liquid','Gas','Plasma'];
  constructor(
    private local_store: LocalStorageService
  ) {
    const builder = new FormBuilder();

    this.group = builder.group({
      '2': builder.group({
        '1': builder.control(''),
        '2': builder.control(''),
        '2a': builder.control(''),
        '3': builder.control(''),
        '4': builder.control(''),
        '4a': builder.control(''),
        '5': builder.control(''),
        '6': builder.control(''),
        '7': builder.control(''),
        '8': builder.control(''),
        '9': builder.control(''),
        '10': builder.control(''),
        '11': builder.control(''),
        '12': builder.control(''),
        '13': builder.control(''),
        '14': builder.control(''),
        '15': builder.control(''),
      }),
      '3': builder.group({
        '16': builder.control(''),
        '17': builder.control(''),
        '18': builder.control(''),
        '19': builder.control(''),
        '20': builder.control(''),
        '21': builder.control(''),
        '21a': builder.control(''),
      })
    });
  }

  ngOnInit() {
    if ( this.answers ) {
      this.group.patchValue( this.answers );
      console.log( this.answers );
    }
    this.group.valueChanges.subscribe( value => {
      this.local_store.set( ANSWERS, JSON.stringify( this.group.value ) );
    });
  }


  submit() {
    const value = this.group.value;
    this.local_store.set( ANSWERS, JSON.stringify( this.group.value ) );
    this.value.emit( value );
  }
}