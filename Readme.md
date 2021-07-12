# The Internet Folks Assignment


[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Where to Start checking API Endpoints
[API link](https://the-internet-folks.herokuapp.com/)

 ### Create Role 
- create a role on route - POST /role  
```
{
  "name": "test",
  "scopes": ["user-get","student-create","role-get"]
}
```
- grab that roleId from the response for creating user
```
{
  "status": true,
  "content": {
      "data": {
           "token": "dfefojfmeffio"
      }
  }
}
```
### Sign Up User
- create user using following data - POST /user/signup 
```
{
  "first_name": "",
  "last_name": "",
  "email": "",
  "mobile": "",
  "password": "",
  "roleId": ""
}
```

### Sign in user
- sign in using email and password - POST /user/signin  

```
{
   "email": "",
   "password": ""
}
```

- grab the token from response for setting Authorization with Bearer token

### Now you can check all the routes as usual (same as docs from your side)

# Thank You
