# SET MERCHANT CONFIGURATION

1. What design decisions did you consider when implementing this endpoint?
    - I followed the existing folder/URI structure to create the merchant configuration API.
    - I opted to return a general "Pre-qualifications configuration has been updated" message upon a successful POST request.
2. What are some future improvements or extensions that can be added to make this endpoint more robust?
    - We could protect the route with a security middleware to ensure the route is only accesible by the merchant's admin.
    - We could create a pre-qualifications table so that a merchant could have several configurations for their users. 
