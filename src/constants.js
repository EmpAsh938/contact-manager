export const BASE_URL = 'https://randomuser.me/api/?results=100';

/*

API DETAILS

register - /api/v1/users/ POST {name, email, password, about}
login - /api/v1/users/login POST LoginDTO {email, password}

create contact - /api/v1/user/{userId}/contacts POST {name, work, email, phone, description}
update contact - /api/v1/{contactId} PUT {name, work, email, phone, description}
delete contact - /api/v1/contacts/{contactId} DELETE
get contact - /api/v1/user/{userId}/contacts

*/