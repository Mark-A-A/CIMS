
#### "CIMS" Single page webapp

This is to create a single page web app to manage calendar. This should be available on web and mobile devices based
on responsive design.

### Build a Customer Calendar view to schedule appointment

* The application should be able to track calendar for a Customer.
* Customer should be able to manage his/her calendar and block time on the calendar.
* Anybody (an user) should be able to see the calendar view of the customer.
* Anyone should be able to make a calendar entry in the customer's calendar. An user (anyone) can pay desired amount
  set up by the customer to confirm an appointment.
* Anyone will be provided with an option to register to receive notification by registering their
     mobile or e-mail with a nominal fee (through paypal). Incase the user registers, an SMS informing about an upcoming
     appointment with the customer will be sent 24 hours prior to the appointment, and again 30 mins prior to the appointment.
* An user appointment will be tentative if he/she has not paid or confirmed by Customer within 24 hours.
* If the user has a confirmed appointment, he/she should be able to re-schedule or cancel the appointment with notice. Any
penalty as set by the customer.
* When the customer accepts/rejects the invite a message will be sent to user on the status.
* User should provide disese details while registering (need to ensure PII issue is addressed)
* Customer can ask for additional informatiom or report before the visit. The notification will go to user when customer asks for
  additional information. User should be able to provide the information by uploading or e-mailing the information to Customer.
* Customer can choose to accept upfront payment or partial payment before the visit (through paypal or cards)

### Customer View
* Customer should be able to login and manage their calendar.
* They can review calendar entry, ask for more inormation or reject or refer to another physician based on user input.
* They should be able to set up minimum payment to confirm an appointment.
* Customers can subscribe to review their feeback (reviews from users) and respond or upvote/downvote.
* The customer should be able to review the calendar entry and then accept/reject the calendar invite if it is not an confirmed
  appointment by user using payment.

### User View
* User should login to provide review with credential or an provide annonymously
* User should register to pay online to the customer. They can search Customer, review customer feedback and even quickly set up
  to accept notification by e-mail or card with a small payment even without registering.

###Customer Database and Reviews/Comments

## Build Customer Database
* Application should scrape other available websites and build a customer database. Application should continuously scrape
  websites and build/improve on the customer data.
* A data steward position should be built or review and improve the customer data

## User to provide customer review
* Application should scrape other websites and build a cutomer review database. The review should be refeshed real time as much
as possible and shoule be available to be viewed by any user.
* An user should be able to provide reviews to the customer.
* The application should validate certain words in the review comments before allowing the user to submit the review.
* Application data steward should be able to review the user comments and decide to upgrade or down grade the reviews.
* An user review will be available in the website to be viewed by others within 24-48 hours.
* A customer can subscribe to receive reviews he/she has received from user. The identity will be kept annonymous unless the
user wishs to provide his credentials.
* An user should login to the system to provide reviews. He/she can create an user id in the system.

### Download an app to help you manage the User and Customer relationship better

* Find nearby customers with speciality
* Access reviews
* Book appointment with a customer
* Pay customer online.

### Extended Capabilities

* Customer should write his/her comments or prescriptions using the application.
* If the user is a registered user, he/she can choose the prescriptions to be delivered at his/her place. There will be a
  delivery cost.
* User can get a view of all his customer(s) visit history
