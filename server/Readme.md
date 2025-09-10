# Zentro Backend

It is a chat application built with nodejs, typescript, prisma, neondb, redis

# Future Updates 

- Chats Route
- Chat Id's for user talking to each other
- Create socket.io client

### General Stuff

- Used req.body to get input 
- cors enabled
- all routes by '/api'
- using typescript, prisma, dotenv
- Prisma client initialize

### Prisma - 

- Used to defined the schema of the neondb database
- Using prisma client in the backend to query database

### Routes - 

- Signup
- Login
- Reset Pass
- Send Friend Request
- Accept friend request
- Search by Username
- Get Friend List

### Signup Flow - 

- Retrive credentials from req.body
- Check if user already exists or not 
- Hash the password using bcrytp
- Create new user and store the hashed password 
- Create a user session if not present

### Login Flow -

- Retrive login credentials from req.body
- Check if user exists or not
- Verify the password 
- Create a session for the user

### Redis

( still need to study many stuff )
- Using redis for storing sessions
- Using redis store 
