import {RxState} from '@rx-angular/state';
import {DOCUMENT} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {filter, fromEvent, map, merge, Observable, startWith, switchMap, take, withLatestFrom,} from 'rxjs';
import {preventDefault, RxActionFactory} from '@rx-angular/state/actions';
import {coerceObservable} from '@rx-angular/cdk/coercing';
import {RxLet} from '@rx-angular/template/let';
import {FastSvgComponent} from '@push-based/ngx-fast-svg';

type UiActions = {
  searchChange: string;
  formClick: Event;
  outsideFormClick: Event;
  formSubmit: Event;
};

@Component({
  standalone: true,
  imports: [RxLet, FastSvgComponent],
  selector: 'ui-search-bar',
  template: `
    <form
      data-uf="q-form"
      (submit)="ui.formSubmit($event)"
      #form
      class="form"
      [tabIndex]="0"
      (focus)="ui.formClick($event)"
    >
      <button
        type="submit"
        class="magnifier-button"
        aria-label="Search for a movie"
      >
        <fast-svg name="search" size="1.125em"></fast-svg>
      </button>
      <input
        data-uf="q"
        *rxLet="search$; let search"
        aria-label="Search Input"
        #searchInput
        [value]="search"
        (change)="ui.searchChange($any(searchInput.value))"
        placeholder="Search for a movie..."
        class="input"
      />
    </form>
  `,
  styleUrls: ['search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  providers: [RxState],
})
export class SearchBarComponent {
  private readonly document = inject(DOCUMENT);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  @ViewChild('searchInput') inputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('form') formRef!: ElementRef<HTMLFormElement>;

  ui = this.actions.create({
    searchChange: String,
    formSubmit: preventDefault,
  });

  @Input()
  set query(v: string | Observable<string>) {
    // eslint-disable-next-line @rx-angular/no-rxstate-subscriptions-outside-constructor
    this.state.connect('search', coerceObservable(v) as Observable<string>);
  }

  search$ = this.state.select('search');
  @Output() searchSubmit = this.ui.formSubmit$.pipe(
    withLatestFrom(this.state.select('search')),
    map(([, search]) => search)
  );

  private readonly closedFormClick$ = this.ui.formClick$.pipe(
    withLatestFrom(this.state.select('open')),
    filter(([, opened]) => !opened)
  );

  private outsideClick(): Observable<Event> {
    // any click on the page (we can't use the option `once:true` as we might get multiple false trigger)
    return fromEvent(this.document, 'click').pipe(
      // forward if the form did NOT trigger the click
      // means we clicked somewhere else in the page but the form
      filter((e) => !this.formRef.nativeElement.contains(e.target as Node))
    );
  }

  /**
   * **🚀 Perf Tip for TBT, TTI:**
   *
   * We avoid `@HostListener('document')` as it would add an event listener on component bootstrap no matter if we need it or not.
   * This obviously will not scale.
   *
   * To avoid this we only listen to document click events after we clicked on the closed form.
   * If the needed event to close the form is received we stop listening to the document.
   *
   * This way we reduce the active event listeners to a minimum.
   */
  private readonly outsideOpenFormClick$ = this.closedFormClick$.pipe(
    switchMap(() => this.outsideClick().pipe(take(1)))
  );

  private readonly classList = this.elementRef.nativeElement.classList;

  constructor(
    private state: RxState<{ search: string; open: boolean }>,
    private actions: RxActionFactory<UiActions>
  ) {
    this.state.set({open: false});
    this.state.connect('search', this.ui.searchChange$.pipe(startWith('')));
    this.state.connect(
      'open',
      merge(this.ui.formSubmit$, this.outsideOpenFormClick$),
      () => false
    );
    this.state.connect('open', this.closedFormClick$, () => true);
    this.state.hold(this.state.select('open'), this.setOpenedStyling);
    this.state.hold(this.closedFormClick$, this.focusInput);
  }

  private readonly focusInput = () => {
    // eslint-disable-next-line @rx-angular/prefer-no-layout-sensitive-apis
    return this.inputRef.nativeElement.focus();
  };

  private readonly setOpenedStyling = (opened: boolean) => {
    opened ? this.classList.add('opened') : this.classList.remove('opened');
  };
}
