import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainMenuComponent } from './main-menu.component';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { ButtonTemplateDirective } from '../shared/directives/button-template.directive';
import { MenuComponent } from '../shared/ui/menu/menu.component';
import { MenuTemplateDirective } from '../shared/directives/menu-template.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MainMenuComponent,
        ButtonComponent,
        ButtonTemplateDirective,
        MenuComponent,
        MenuTemplateDirective,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the menu with the correct style class', () => {
    const menuElement = fixture.debugElement.query(By.css('.menu--main'));
    expect(menuElement).toBeTruthy();
  });

  it('should render the logo image with correct src and alt attributes', () => {
    const logoElement = fixture.debugElement.query(By.css('.main-menu__logo'));
    expect(logoElement.attributes['src']).toBe('images/logo.svg');
    expect(logoElement.attributes['alt']).toBe('Hangman Game Logo');
  });

  it('should render the play button with correct ariaLabel and image src', () => {
    const playButton = fixture.debugElement.query(By.css('app-button[link="/categories"]'));
    expect(playButton.attributes['ariaLabel']).toBe('Pick a category to start the game');
    const playButtonImage = playButton.query(By.css('.main-menu__icon'));
    expect(playButtonImage.attributes['src']).toBe('images/icon-play.svg');
  });

  it('should render the how-to-play button with correct ariaLabel and label text', () => {
    const howToPlayButton = fixture.debugElement.query(By.css('app-button[link="/rules"]'));
    expect(howToPlayButton.attributes['ariaLabel']).toBe('Check the rules of the Hangman Game and learn how to play');
    const howToPlayButtonLabel = howToPlayButton.query(By.css('.heading--sm'));
    expect(howToPlayButtonLabel.nativeElement.textContent).toContain('HOW TO PLAY');
  });
});
