import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { PollComponent } from './poll.component';
import * as rxjs from 'rxjs';

describe('PollComponent', () => {
  let component: PollComponent;
  let fixture: ComponentFixture<PollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PollComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('makes call ngOnInit', fakeAsync(() => {
    spyOnProperty(rxjs, 'fromEvent').and.returnValue(() => of('test user'));
    spyOn(component, 'importJS');
    spyOn(component, 'updateData');
    component.ngOnInit();
    tick();
    expect(component.importJS).toHaveBeenCalledWith('native-shim');
    expect(component.importJS).toHaveBeenCalledWith('framework-poll');
    expect(rxjs.fromEvent).toHaveBeenCalled();
    expect(component.title).toEqual('Current logged in User is test user');
    expect(component.updateData).toHaveBeenCalled();
  }));

  it('make calls updateData', () => {
    component.updateData();
    const polls = document.getElementsByTagName('framework-poll');
    expect(polls.length).toEqual(1);
  });

  it('make calls ngOnDestroy', () => {
    spyOn(component, 'removeJS');
    expect(component.removeJS).toHaveBeenCalledWith('native-shim');
    expect(component.removeJS).toHaveBeenCalledWith('framework-poll');
  });

  it('make calls importJS', () => {
    const name = 'test';
    component.importJS(name);
    expect(document.getElementById('importedtest')).toBeDefined();
    expect(document.getElementById('importedtest')).not.toBeNull();
  });

  it('make calls removeJS', () => {
    component.removeJS('test');
    expect(document.getElementById('importedtest')).toBeNull();
  });

});
