# Instagram Login

This package can help you get authenticated cookies from Instagram.

## Installation

For npm

```bash
  npm install @vmatiiv/instagram_login
```

For yarn

```bash
  yarn add @vmatiiv/instagram_login
```

## Usage
**_Important Note_**: **Auth** return promise so you must handle it with prosime( .then, .catch ) or async/await function

```javascript
const auth = require('@vmatiiv/instagram_login')
auth(login,password)
  .then(res=>console.log(res))
  .catch(err=>console.log(err))
```
