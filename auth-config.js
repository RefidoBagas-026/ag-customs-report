export default {
    endpoint: "auth",
    configureEndpoints: ["auth","customs-report","purchasing","garment-production","inventory"],

    loginUrl: "authenticate",
    profileUrl: "/me",

    authTokenType: "Bearer",
    accessTokenProp: "data",

    storageChangedReload: true
};