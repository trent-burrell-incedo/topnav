import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MenuService } from 'src/app/services/menu-service';

import { TopNavComponent } from './top-nav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { menus } from 'src/app/models/menu/menu';

describe('TopNavComponent', () => {
  let component: TopNavComponent;
  let fixture: ComponentFixture<TopNavComponent>;
  let menuService;
  let routerService;
  const menus: menus = {
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
          "childMenuItems": [],
          "duoMenuItems": [],
        },
        {
          "menuItemID": 4,
          "menuItemName": "Holdings",
          "menuURL": "http://localhost:4201/account?page=holdings",
          "prtViewOrder": 1,
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
          "childMenuItems": [],
          "duoMenuItems": [],
        },
        {
          "menuItemID": 5,
          "menuItemName": "Activity",
          "menuURL": "http://localhost:4201/account?page=activity",
          "prtViewOrder": 3,
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
          "childMenuItems": [],
          "duoMenuItems": [],
        }
      ],
      "duoMenuItems": [],
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
    spyOn(menuService, 'getNavMenu').and.returnValue(of(menus));
    spyOn(component, 'initializeActiveMenu');
    spyOn(component, 'sortNavMenu');
    component.getTopNavMenu();
    tick();
    expect(component.menuList).toEqual(menus.parentMenuItems);
    expect(component.initializeActiveMenu).toHaveBeenCalled();
    expect(component.sortNavMenu).toHaveBeenCalledWith(component.menuList, 'parent');
  }));

  it('make calls sortNavMenu', () => {
    component.menuList = menus.parentMenuItems;
    component.sortNavMenu(component.menuList, 'parent');
    expect(component.menuList[0].childMenuItems[0].prtViewOrder).toEqual(1);

    component.sortNavMenu(component.menuList[0].childMenuItems, 'child');
    expect(component.menuList[0].childMenuItems[0].prtViewOrder).toEqual(1);
  });

  it('make calls toggleMenu', () => {
    component.isOpenMenu = false;
    component.toggleMenu();
    expect(component.isOpenMenu).toBeTrue();
  });

  it('make calls toggleSubmenu', () => {
    spyOn(component, 'initializeMenu');
    spyOn(component, 'initializeActiveMenu');
    component.menuList = menus.parentMenuItems;
    component.toggleSubmenu(component.menuList[0]);
    if (window.innerWidth < 1025) {
      expect(component.initializeMenu).toHaveBeenCalled();
      expect(component.initializeActiveMenu).toHaveBeenCalled();
    }
    expect(component.menuList[0]['showMenu']).toBeTrue();

    component.menuList[0].childMenuItems = [];
    spyOn(component, 'openLink');
    component.toggleSubmenu(component.menuList[0]);
    if (window.innerWidth < 1025) {
      expect(component.initializeMenu).toHaveBeenCalled();
      expect(component.initializeActiveMenu).toHaveBeenCalled();
    }
    expect(component.openLink).toHaveBeenCalledWith('', component.menuList[0].menuURL);
  });

  it('make calls showMenu', () => {
    spyOn(component, 'initializeMenu');
    component.menuList = menus.parentMenuItems;
    component.showMenu(component.menuList[0]);
    if (window.innerWidth > 1024) {
      expect(component.initializeMenu).toHaveBeenCalled();
      expect(component.menuList[0].showMenu).toEqual(true);
    }

    component.menuList[0].childMenuItems = [];
    component.showMenu(component.menuList[0]);
    if (window.innerWidth > 1024) {
      expect(component.initializeMenu).toHaveBeenCalled();
    }
  });

  it('make calls closeMenu', () => {
    component.menuList = menus.parentMenuItems;
    component.closeMenu(component.menuList[0]);
    expect(component.menuList[0].showMenu).toBeFalse;
  });

  it('make calls openLink', () => {
    spyOn(component, 'initializeMenu');
    spyOn(component, 'initializeActiveMenu');
    spyOn(routerService, 'navigate');

    component.openLink('', 'test');
    expect(component.initializeMenu).toHaveBeenCalled();
    expect(component.isOpenMenu).toBeFalse();
    expect(routerService.navigate).toHaveBeenCalledWith('test');
    expect(component.initializeActiveMenu).toHaveBeenCalled();
    expect(component.menuList[0].activeMenu).toBeTrue();

    component.menuList = menus.parentMenuItems;
    component.openLink(component.menuList[0].childMenuItems[0], []);

    expect(component.initializeMenu).toHaveBeenCalled();
    expect(component.isOpenMenu).toBeFalse();
    expect(routerService.navigate).toHaveBeenCalledWith('legacy-account-view');
  });

  it('make calls initializeMenu', () => {
    component.menuList = menus.parentMenuItems;
    component.initializeMenu();
    expect(component.menuList[0]['showMenu']).toBeFalse();
  });

  it('make calls logOut', () => {
    spyOn(routerService, 'navigate');
    component.logOut();
    expect(routerService.navigate).toHaveBeenCalledWith('login');
  })
});
