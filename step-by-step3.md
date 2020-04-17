Steps to add comments & current user authentication: 
1. models > Dinosour
Start with building comments
Build an embedded schema to embed in the model
Don’t do the user bit straight away
Register the schema in the parent model you want it to live in (you can keep in the same file). 
2. controllers > dinosours
In the dinosour controller build and test the post and delete routes for the comments (do them separately and test!)
3. models > Dinosour
Build the user reference relationship
In the dinosour model add the reference to the user who created it
4. db > seeds.js
Alter the seeds to create some users
Attribute the user to the dinosour
*Check the seeds run! ( $ yarn seed)*
5. controllers > dinosours
In the dinosour controllers populate the user fields
6. Insomnia
Test  the API - you should see the passwords coming through
7. models > User
In the user model add the transform method that stops the response from showing the password
8. controllers > dinosours
Come back to the create route
Attach a user key to the body (this needs to match the one in the secure route)
Repeat the same step for comments
In the update and delete dinosour controllers add the logic that checks if the person trying to edit it is the same as the one who created the resource.