import { menuAction } from "./menuAction"
import { menuEntitlementType } from "./menuEntitlementType"
import { menuLayout } from "./menuLayout"
import { menuLoadConfig } from "./menuLoadConfig"
import { menuType } from "./menuType"

export interface menu {
    menuItemID: number,
    menuItemName: string,
    menuURL?: string,
    menuElementClass?: string,
    menuElementID?: string,
    menuType: menuType,
    menuAction: menuAction,
    menuLoadConfig: menuLoadConfig,
    menuLayout: menuLayout,
    menuEntitlementType: menuEntitlementType,
    prtViewOrder: number,
    chldViewOrder: number,
    childMenuItems: menu[],
    duoMenuItems?: menu[],
    showMenu?: boolean,
    activeMenu?: boolean,
}

export interface menus {
    parentMenuItems: menu[]
}