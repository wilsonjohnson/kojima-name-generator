import { Component } from '@angular/core';
import { LocalStorageService } from './service/local-storage.service';
import { ANSWERS, LICKABLE, GENERATED, STATE } from './globals';
import { Observable, OperatorFunction } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Answers } from './types/answers';
import { offset } from './functions/offset';

type State = 'collapsed' | 'open';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {
  name = 'Angular';
  public names$: Observable<string[]>;
  public answers = {};
  public questions = {};
  public cache$: Observable<Answers>;
  public lickable: boolean;
  public state$: Observable<State>;
  constructor(
    private local_storage: LocalStorageService
  ) {
    this.answers = {
      '2': {'2':'123'},
      '3': {}
    };

    this.cache$ = this.local_storage.lookup( ANSWERS ).pipe(
      parse<Answers>()
    );

    this.names$ = this.local_storage.lookup( GENERATED ).pipe(
      parse<string[]>()
    );

    this.cache$.subscribe( answers => {
      this.answers = answers;
    });

    this.state$ = this.local_storage.lookup(STATE).pipe(
      parse<State>()
    );

    this.state$.pipe(take(1)).subscribe( state => {
      if( state ) return;
      this.local_storage.set(STATE,JSON.stringify('open'));
    });

    this.local_storage.lookup(LICKABLE).pipe( parse<boolean>() ).subscribe( lickable => {
      console.log( 'lookup', lickable );
      this.lickable = lickable;
    });

    this.questions = {
      '2':{},
      '3':{}
    };
  }

  public generate() {
    this.local_storage.set(GENERATED, JSON.stringify(generateKojima(this.answers, this.lickable)));
  }

  public setAnswers($event) {
    this.answers = $event;
  }

  public save_lickable(input: HTMLInputElement) {
    this.local_storage.set(LICKABLE, JSON.stringify(input.checked));
  }

  public change_state(state: State, collapse_button: HTMLDivElement){
    if ( state === 'open' ) this.local_storage.set(STATE,JSON.stringify('collapsed'));
    if ( state === 'collapsed' ) this.local_storage.set(STATE,JSON.stringify('open'));
    setTimeout( () => {
      const {left, top} = offset( collapse_button );
      console.log( left, top );
      window.scrollTo( { left, top, behavior: 'smooth' });
    }, 0 );
  }
}

function parse<Type>(): OperatorFunction<string, Type> {
  return map( (str:string) => JSON.parse( str ) as Type );
}

function roll(n) {
	return Math.floor(Math.random() * n) + 1;
}

interface Modifier {
  name?: string;
  suffix?: string;
  prefix?: string;
  clone?: boolean;
}

function getSection4(): Modifier {
	const mod: Modifier = {};
	if (roll(100) === 69) {
		mod.name = 'Hideo Kojima';
		return mod;
	}
	if (roll(4) === 4) {
		mod.suffix = 'man';
	}
	let result = roll(8);
	if (result === 6) {
		mod.prefix = 'Big';
	} else if (result === 7) {
		mod.prefix = 'Old';
	} else if (result === 8) {
		mod.prefix = '<lookup:2.11>';
	}
	if (roll(12) === 12) {
		mod.clone = true;
	}
	return mod;
}

function make_prefix(prefix) {
    return prefix?`${prefix} `:''
}

function make_suffix(suffix) {
    return suffix?`${suffix}`:''
}

function lookup( section, number ) {
    return `<lookup:${section}.${number}>`;
}

function getSection6({ prefix, suffix, clone }: Modifier) {
    const name = `${make_prefix(prefix)}${lookup(2,1)}${make_suffix(suffix)}`;
    return clone ? `clone => ${name}` : name;
}

function getSection7({ prefix, suffix, clone }: Modifier) {
    const result = roll(4);
    let first = '';
    if( result === 1 ) first = lookup(2,15);
    if( result === 2 ) first = lookup(2,6);
    if( result === 3 ) first = lookup(2,13);
    if( result === 4 ) first = lookup(3,16);
    const name = `${make_prefix(prefix)}${first} ${lookup(2,'2a')}${make_suffix(suffix)}`;
    return clone ? `clone => ${name}` : name;
}

function getSection8({ prefix, suffix, clone }: Modifier, lickable: boolean = true ) {
    const result = roll(4);
    let first = '';
    if( result === 1 ) first = lookup(2,12);
    if( result === 2 ) first = 'Naked';
    if( result === 3 ) first = lookup(2,6);
    if( result === 4 ) first = lookup(2,14);
    const name = `${make_prefix(prefix)}${first} ${lickable?'Lickable ':''}${lookup(2,3)}${make_suffix(suffix)}`;
    return clone ? `clone => ${name}` : name;
}
function getSection9({ prefix, suffix, clone }: Modifier) {
    const result = roll(4);
    let last = '';
    if( result === 1 ) last = lookup(2,8);
    if( result === 2 ) last = lookup(2,9);
    if( result === 3 ) last = lookup(2,'4a');
    if( result === 4 ) last = lookup(3,20);
    const name = `The ${make_prefix(prefix)}${last}${make_suffix(suffix)}`;
    return clone ? `clone => ${name}` : name;
}

function getSection10({ prefix, suffix, clone }: Modifier) {
    const result = roll(6);
    let last = '';
    if( result === 1 ) last = lookup(3,17);
    if( result === 2 ) last = lookup(3,18);
    if( result === 3 ) last = lookup(3,19);
    if( result === 4 ) last = lookup(2,6);
    if( result === 5 ) last = lookup(2,8);
    if( result === 6 ) last = lookup(2,13);
    const name = `${make_prefix(prefix)}${lookup(3,'21a')} ${last}${make_suffix(suffix)}`;
    return clone ? `clone => ${name}` : name;
}

function getSection11({ prefix, suffix, clone }: Modifier) {
    const result = roll(4);
    let last = '';
    if( result === 1 ) last = lookup(3,19);
    if( result === 2 ) last = lookup(2,12);
    if( result === 3 ) last = lookup(3,20);
    if( result === 4 ) last = lookup(2,9);
    const name = `${make_prefix(prefix)}${lookup(2,5)} ${last}${make_suffix(suffix)}`;
    return clone ? `clone => ${name}` : name;
}

function getSection12({ prefix, suffix, clone }: Modifier) {
    const name = `${make_prefix(prefix)}${lookup(2,10)}${make_suffix(suffix)}`;
    return clone ? `clone => ${name}` : name;
}

function generateName( lickable: boolean = true ) {
	const mod: Modifier = getSection4();
	if (mod.name) return mod.name;

	const type = roll(20);

	if (type === 1) return getSection6(mod);
	if (type > 1 && type < 7) return getSection7(mod);
	if (type > 6 && type < 11) return getSection8(mod, lickable);
	if (type > 10 && type < 14) return getSection9(mod);
	if (type > 13 && type < 18) return getSection10(mod);
	if (type > 17 && type < 20) return getSection11(mod);
	if (type === 20) return getSection12(mod);
}

function generateKojima(answers, lickable: boolean = true) {
    if ( roll(6) === 6 ) {
        return [0,0,0,0,0,0,].map( () => getName(answers, lickable) );
    } else {
        return [getName(answers, lickable)];
    }
}

function getName(answers, lickable: boolean = true) {
    const name = generateName(lickable);
    return name.replace(/\<lookup:(\d+?)\.((?:\d|a)+?)>/g, (_, section, number) => answers[`${section}`][`${number}`]);
}

