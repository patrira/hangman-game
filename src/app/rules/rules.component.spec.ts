import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RulesComponent } from './rules.component';
import { HeadingBarComponent } from '../shared/ui/heading-bar/heading-bar.component';
import { RuleComponent } from './ui/rule/rule.component';
import { RULES, Rule } from '../shared/models/rule.model';

describe('RulesComponent', () => {
  let component: RulesComponent;
  let fixture: ComponentFixture<RulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RulesComponent,
        HeadingBarComponent,
        RuleComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the heading bar with the correct heading', () => {
    const headingBar = fixture.debugElement.nativeElement.querySelector('app-heading-bar');
    expect(headingBar).toBeTruthy();
    expect(headingBar.getAttribute('heading')).toBe('How to Play');
  });

  it('should render the correct number of rules', () => {
    const ruleComponents = fixture.debugElement.nativeElement.querySelectorAll('app-rule');
    expect(ruleComponents.length).toBe(RULES.length);
  });

  it('should pass correct inputs to each app-rule component', () => {
    const ruleComponents = fixture.debugElement.nativeElement.querySelectorAll('app-rule');
    RULES.forEach((rule, index) => {
      const ruleComponent = ruleComponents[index];
      expect(ruleComponent).toBeTruthy();
      expect(ruleComponent.getAttribute('step')).toBe((index + 1).toString());
      expect(ruleComponent.getAttribute('name')).toBe(rule.name);
      expect(ruleComponent.getAttribute('description')).toBe(rule.description);
    });
  });
});
