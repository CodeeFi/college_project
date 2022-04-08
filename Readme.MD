# KVSCOS Project
This project is result management project which is use by student by a mobile laptop and desktop

# Registration API. 
    # POST Request
        http://13.235.135.48/api/v0/auth/register
        This is a registration api where is deploy on Live you can send a post request with send data on Json format.

          {
            "enrolment_no":124884293992,
            "first_name":"Aadarsh",
            "last_name":"singh",
            "college":"KVSCOS",
            "course":"BCA",
            "email":"aadarshsingh222@gmail.com",
            "phone":"9599933322",
            "session_start_year":"2019",
            "session_end_year":"2022",
            "password":"Aadarsh123@",
            "repassword":"Aadarsh123@"
          }
        This format is a valid Registration format. You can send a post request on above url.
        Email and enrolment_no is always unique Password must be a combination of Captial latter small leater Spacial charector number.
        # Responce
            after sending a request on the server you get a responce if any error on data fromat you get like this responce

                {
                "msg": "Bad Request",
                "status": 400
                }

            But everything is ok You can get the like this responce status 200 meance your request is sucessfull submited.
            
                {
                "status": 200,
                "msg": "User Registration Sucesses"
                }
# Login API
    # Post Request 
        http://13.235.135.48/api/v0/auth/login 
        
        If user is register it is able to login our application usgin enrolmenet no or emailid and password.

        You can send the post request on above url data should be json fromat

        {
            "userid":"aadarshsingh222@gmail.com" ,
            "password":"Aadarsh123@"
        }

        userid field are configure for emailid or enrolment no login you can send the request on this format.
        When you send the post request on above url with json payload you get a responce

            #if userid and password is valid 
                {
                "_id": "6236e062984191a616f513b5",
                "first_name": "Aadarsh",
                "last_name": "singh",
                "email": "aadarshsingh222@gmail.com",
                "password": "$2b$10$6ptheANgKp/4L5i.0M6wBevyHYJnLZga3p8Q0e2OqzdBIYHbtBjCG",
                "session": [
                    {
                    "secret": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzZlMDYyOTg0MTkxYTYxNmY1MTNiNSIsImlhdCI6MTY0Nzc2MzU1NH0.R2qEJZrp5TKEmTMDAOS0DqmqJaccSrV0QbL7kRn52Uc"
                    }
                ]
                }
            # if somthign went wrong on your payload you get this responce.
                {
                "msg": "Email, Enrolment NO or password is worng",
                "status": 400
                }

            Session [
                secret:"3askdfjaosdoiqj"
            ] 
            is importent on this responce its use to validate the user. if user visit a protected route server check first request secret and then allow to visit a protected route./
            
            You  send the token to "auth-token" header key on request.
            