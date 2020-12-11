// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  clientId : 'a6cbebc82fb84908ae3e4cb470a968ee',
  clientSecret: 'e34742ab59a643c1aa36df49d6f7b02f',
  url: 'https://accounts.spotify.com/',
  redirectUrl: 'http://localhost:4200',
  apiUrl: 'https://api.spotify.com/',
  scopes: 'user-read-private user-read-email playlist-modify-public playlist-modify-private'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
