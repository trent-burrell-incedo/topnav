import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MenuService } from 'src/app/services/menu-service';

import { TopNavComponent } from './top-nav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TopNavComponent', () => {
  let component: TopNavComponent;
  let fixture: ComponentFixture<TopNavComponent>;
  let menuService;
  let routerService;
  const menus = {
    "parentMenuItems": [{
      "menuItemID": 2,
      "menuItemName": "Account",
      "menuURL": "",
      "prtViewOrder": 2,
      "chldViewOrder": 1,
      "menuElementClass": "account",
      "menuElementID": "account",
      "menuType": {
        "name": "HEADER",
        "description": "HEADER"
      },
      "menuAction": {
        "name": "ROUTING",
        "description": "ROUTING"
      },
      "menuLoadConfig": {
        "name": "LAZYLOAD",
        "description": "LAZYLOAD"
      },
      "menuLayout": {
        "name": null,
        "description": null
      },
      "menuEntitlementType": {
        "name": "STATIC",
        "description": null
      },
      "childMenuItems": [
        {
          "menuItemID": 3,
          "menuItemName": "Balances",
          "menuURL": "http://localhost:4201/account?page=balances",
          "prtViewOrder": 2,
          "chldViewOrder": 1,
          "menuElementClass": "balances",
          "menuElementID": "balances",
          "menuType": {
            "name": "LINK",
            "description": "LINK"
          },
          "menuAction": {
            "name": "ROUTING",
            "description": "ROUTING"
          },
          "menuLoadConfig": {
            "name": "LAZYLOAD",
            "description": "LAZYLOAD"
          },
          "menuLayout": {
            "name": null,
            "description": null
          },
          "menuEntitlementType": {
            "name": "STATIC",
            "description": null
          },
          "childMenuItems": []
        },
        {
          "menuItemID": 4,
          "menuItemName": "Holdings",
          "menuURL": "http://localhost:4201/account?page=holdings",
          "prtViewOrder": 2,
          "chldViewOrder": 2,
          "menuElementClass": "holdings",
          "menuElementID": "holdings",
          "menuType": {
            "name": "LINK",
            "description": "LINK"
          },
          "menuAction": {
            "name": "ROUTING",
            "description": "ROUTING"
          },
          "menuLoadConfig": {
            "name": "LAZYLOAD",
            "description": "LAZYLOAD"
          },
          "menuLayout": {
            "name": null,
            "description": null
          },
          "menuEntitlementType": {
            "name": "STATIC",
            "description": null
          },
          "childMenuItems": []
        },
        {
          "menuItemID": 5,
          "menuItemName": "Activity",
          "menuURL": "http://localhost:4201/account?page=activity",
          "prtViewOrder": 2,
          "chldViewOrder": 3,
          "menuElementClass": "activity",
          "menuElementID": "activity",
          "menuType": {
            "name": "LINK",
            "description": "LINK"
          },
          "menuAction": {
            "name": "DROPDOWN",
            "description": "DROPDOWN"
          },
          "menuLoadConfig": {
            "name": null,
            "description": null
          },
          "menuLayout": {
            "name": "STANDARD",
            "description": "STANDARD"
          },
          "menuEntitlementType": {
            "name": "STATIC",
            "description": null
          },
          "childMenuItems": []
        }
      ]
    },
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopNavComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TopNavComponent);
    component = fixture.componentInstance;
    menuService = TestBed.inject(MenuService);
    routerService = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('make calls getTopNavMenu', fakeAsync(() => {
    spyOn(menuService, 'getNavMenu').and.returnValue(of(menus))
    component.getTopNavMenu();
    tick();
    expect(component.menuList).toEqual(menus.parentMenuItems);
  }));

  it('make calls toggleMenu', () => {
    component.isOpenMenu = false;
    component.toggleMenu();
    expect(component.isOpenMenu).toBeTrue();
  });

  it('make calls toggleSubmenu', () => {
    component.menuList = menus.parentMenuItems;
    component.toggleSubmenu(component.menuList[0]);
    expect(component.menuList[0]['showMenu']).toBeTrue();

    component.menuList[0].childMenuItems = [];
    spyOn(component, 'openLink');
    component.toggleSubmenu(component.menuList[0]);
    expect(component.openLink).toHaveBeenCalledWith(component.menuList[0].menuURL);
  });

  it('make calls openLink', () => {
    spyOn(component, 'toggleMenu');
    spyOn(component, 'initializeMenu');
    spyOn(routerService, 'navigate');

    component.openLink('test');
    expect(component.toggleMenu).toHaveBeenCalled();
    expect(component.initializeMenu).toHaveBeenCalled();
    expect(routerService.navigate).toHaveBeenCalledWith('test');
  });

  it('make calls initializeMenu', () => {
    component.menuList = menus.parentMenuItems;
    component.initializeMenu();
    expect(component.menuList[0]['showMenu']).toBeFalse();
  })
});
