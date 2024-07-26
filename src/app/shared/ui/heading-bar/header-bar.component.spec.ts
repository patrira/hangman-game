import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeadingBarComponent } from './heading-bar.component';

describe('HeadingBarComponent', () => {
    let component: HeadingBarComponent;
    let fixture: ComponentFixture<HeadingBarComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [HeadingBarComponent],
        providers: [
         
        ],
      }).compileComponents();
  
      fixture = TestBed.createComponent(HeadingBarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it('should render heading with correct text', () => {
      const compiled = fixture.nativeElement;
      const heading = compiled.querySelector('h1'); 
      expect(heading.textContent).toContain('Expected Heading Text');
    });
  
    it('should render the button with correct attributes', () => {
      const compiled = fixture.nativeElement;
      const button = compiled.querySelector('button'); 
      expect(button).toBeTruthy();
      
    });
  
    it('should render the icon image within the button', () => {
      const compiled = fixture.nativeElement;
      const button = compiled.querySelector('button'); 
      const icon = button.querySelector('img'); 
      expect(icon).toBeTruthy();
      
    });
  });