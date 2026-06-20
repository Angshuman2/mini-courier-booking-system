# API Documentation

## Authentication

### Register User

POST /api/auth/register

Request Body:

{
"name": "Angshu Das",
"email": "angshu@example.com",
"password": "123456"
}

### Login User

POST /api/auth/login

Request Body:

{
"email": "angshu@example.com",
"password": "123456"
}

## Courier

### Create Booking

POST /api/courier/book

Headers:

Authorization: Bearer TOKEN

### Get Bookings

GET /api/courier

Headers:

Authorization: Bearer TOKEN

### Track Shipment

GET /api/courier/track/

### Approve Booking (Admin)

PUT /api/courier/approve/

Headers:

Authorization: Bearer TOKEN

### Reject Booking (Admin)

PUT /api/courier/reject/

Headers:

Authorization: Bearer TOKEN

### Update Shipment Status (Admin)

PUT /api/courier/status/

Headers:

Authorization: Bearer TOKEN

Request Body:

{
"status": "In Transit"
}
