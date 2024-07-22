import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainMenuComponent } from './main-menu.component';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { ButtonTemplateDirective } from '../shared/directives/button-template.directive';
import { MenuComponent } from '../shared/ui/menu/menu.component';
import { MenuTemplateDirective } from '../shared/directives/menu-template.directive';

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
    const menuElement = fixture.debugElement.nativeElement.querySelector('app-menu');
    expect(menuElement).toBeTruthy();
    expect(menuElement.classList).toContain('menu--main');
  });

  it('should render the logo image with correct src and alt attributes', () => {
    const logoImg = fixture.debugElement.nativeElement.querySelector('.main-menu__logo img');
    expect(logoImg).toBeTruthy();
    expect(logoImg.src).toContain('images/logo.svg');
    expect(logoImg.alt).toBe('Hangman Game Logo');
  });

  it('should render the play button with correct ariaLabel and image src', () => {
    const playButton = fixture.debugElement.nativeElement.querySelector('app-button[link="/categories"]');
    expect(playButton).toBeTruthy();
    const iconImg = playButton.querySelector('img');
    expect(iconImg).toBeTruthy();
    expect(iconImg.src).toContain('images/icon-play.svg');
    expect(playButton.getAttribute('ariaLabel')).toBe('Pick a category to start the game');
  });

  it('should render the how-to-play button with correct ariaLabel and label text', () => {
    const howToPlayButton = fixture.debugElement.nativeElement.querySelector('app-button[link="/rules"]');
    expect(howToPlayButton).toBeTruthy();
    const labelSpan = howToPlayButton.querySelector('span');
    expect(labelSpan).toBeTruthy();
    expect(labelSpan.textContent).toBe('HOW TO PLAY');
    expect(howToPlayButton.getAttribute('ariaLabel')).toBe('Check the rules of the Hangman Game and learn how to play');
  });
});
