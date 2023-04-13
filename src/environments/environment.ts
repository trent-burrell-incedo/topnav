// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl: 'http://localhost:8080/LPLJsonAPI/',
  //  apiUrl: 'https://localhost:63634/devint/api/mfetopnav_api/lplmenuapi/',
  // apiUrl: 'https://k8s-investor-ingressg-c2609574e7-0ae77245acba163b.elb.us-east-1.amazonaws.com/api/investor-internal/mfetopnav-api/lplmenuapi/',
  apiUrl: 'https://investor.cluster.dev.lpl.com/api/investor-internal/mfetopnav-api/lplmenuapi/',
  token: '',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
