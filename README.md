# blogApp-GCF-mongo-Node

Blog API Documentation**\*\*\*\***\*\*\*\***\*\*\*\***\***\*\*\*\***\*\*\*\***\*\*\*\***

info : The Blog API allows you to perform CRUD (Create, Read, Update, Delete) operations
on blog posts. It handles HTTP requests to manage blog data including fetching all blogs,
creating a new blog post, updating an existing blog post, and deleting a blog post.

Endpoints: "/blog"
Methods :

1. GET
   url : "/blog"
   Query Parameters:
   page (optional): Page number for pagination (default: 1).
   items (optional): Number of items per page (default: 4).
   author (optional): Filter blogs by author name.
   id (optional): Filter blogs by blog ID.
   Example url for pagination : “/blogs?page=<pageNo>&items=<no of items>”
   Example url for search by id : “/blogs?id=<id>”
   Example url for search by author: “/blogs?author=<author>”

   response syntax: {
   "status": 1,
   "total": <total_number_of_blogs>,
   “pageNo”: <page No>
   "data":[<all blogs >]
   }

2. PUT

   url: "/blog?id=<blog_id>"
   request body : {
   "content": "<new_blog_content>"
   }

   response :
   Status: 204 No Content (on successful update)
   Status: 400 Bad Request (if request body is empty)
   Status: 404 Not Found (if no blog post with the given id is found)

3. DELETE
   url: "/blog?id=<blog_id>"

   Response : Status: 204 No Content (on successful deletion)
   Status: 404 Not Found (if no blog post with the given id is found)
   Status: 404 Not Found (invalid id )

4. POST
   url: "/blog"
   Request Body: {
   "title": "<blog_title>",
   "content": "<blog_content>",
   "author": "<blog_author>"
   }

   Response :
   Status: 200 OK (on successful creation)
   Status: 400 Bad Request (if any required field is missing)
   Status: 409 Conflict (if a blog post with the same title already exists)

   \*\*\*Error Responses: For all METHODS
   Status: 405 Method Not Allowed
   This response indicates that the request method used is not supported by the API endpoint.
   status: 404 for invalid id
   Status: 500 Internal Server Error
   This response is returned when an unexpected error occurs on the server side.
