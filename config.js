const BASE_URL = 'https://www.instagram.com';  
const LOGIN_PATH= `${BASE_URL}/accounts/login`;
const LOGIN_AJAX= `${LOGIN_PATH}/ajax/`;

module.exports = {
    LOGIN_PATH,
    LOGIN_AJAX,
    IG_ID: `ig-set-password-encryption-web-key-id`,
    IG_PUB_KEY: `ig-set-password-encryption-web-pub-key`,
    IG_KEY_VERSION: `ig-set-password-encryption-web-key-version`,
    GET_COOKIES: `set-cookie`,
    KEY_BROWSER: `#PWD_INSTAGRAM_BROWSER`
}