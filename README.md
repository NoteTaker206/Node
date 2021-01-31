# Key Parts
Specific Permissions on a resource
General Permissions

# General Permissions
Consists of accessing general paths
like the admin page or home page

# Specific Permissions
Authorizing a user to be able
to access a certain resource and modify
or make changes, read resources (a admin
should be able to get all resources but
a regular user should only be able
to see their own returned)
basically all the CRUD operations need
to have permissions

an admin user may or may not be allowed to delete
a user's project...but honestly youtube does it!

Permissions are strictly boolean

Admins could be able to do this for
all resources, but
a regular user should only have access
to their own resource 

# Data
An array of objects to mimick a database

# Permissions Folder
Contains both types of authorization

# Middleware Organization
You can even make custom middleware for
handling errors which is useful for huge
projects

if you start making alot of middleware,
put middleware into a folder

# Flexibility

Permission system is extremely flexible because
permission isnt coupled to any controller action
or anything, so it can be easily extended.

example: using canViewButton() to determine if a user
can see the delete button in a view...it isnt coupled
to controller!

lots of other scenarios

it would be really simple to implement an edit 
as well from this logic

remember all functions in express are middleware!

# Error codes

200 - general success (ok)
201 - successfully created new object
204 - no content 

3xx redirection
like if a resource was moved and a user tried to
access a resource's old location

4xx Client Error
user made a mistake
400 - general error
401 - authorization error (permission roles)
403 - authentication error (login)

