const querystring = require('querystring');
const axios = require('axios');
const { handler: encryptPassword } = require('./encriptPassword');
require('dotenv').config();
const {LOGIN_PATH,LOGIN_AJAX,IG_ID,IG_PUB_KEY,IG_KEY_VERSION,GET_COOKIES} = require('./config')


const getCookies =  async (url) => {
    try {
        const data = await axios.get(url);
        const stringCookies = data.headers[GET_COOKIES].join(';');
        const ig_key_version = data.headers[IG_KEY_VERSION];
        const ig_id = data.headers[IG_ID];
        const ig_pub_key = data.headers[IG_PUB_KEY];
        let cookies = ['csrftoken', 'ig_did', 'mid'].map(item =>{
            let regExp = RegExp(`${item}=[A-Z-a-z0-9-_]+`);
            return regExp.exec(stringCookies) ? regExp.exec(stringCookies)[0] : null
        }).join('; ')
        const csrf = cookies.split(';')[0].split('=')[1];
    
        return {
            cookies,
            ig_id,
            ig_key_version,
            ig_pub_key,
            csrf
        }
    } catch (err) {
        throw err.message
    }

}
const getPassword = async (data,password) => {
    const {ig_id,ig_pub_key,ig_key_version} = data
    const encData = {
        ig_id,
        ig_pub_key,
        ig_key_version,
        password
    }
    try {
        const enc_password = await encryptPassword(encData)
        return enc_password
            
    } catch (error) {
        throw error.message        
    }
}

module.exports = async (login,password) => {
    try {
        const data = await getCookies(LOGIN_PATH);
        const enc_password = await getPassword(data,password);
        const body = querystring.stringify({
            username:login,
            enc_password,
            quertParams:'{}',
            optIntoOneTap: false
        })
        const headers = {
            'cookie': data.cookies,
            'x-csrftoken': data.csrf,
        }    
        const post = await axios.post(LOGIN_AJAX,body,{headers:headers});
        if(!post.data.authenticated) throw new Error('wrong login or password');
        return post.headers[GET_COOKIES]

    } catch (err) {
        throw err.message
        
    }

}