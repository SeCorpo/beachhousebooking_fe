# Reservation Page structure & responsibilities

### Controller
- holds header and nav
- holds the state of the models
- initiates fetch availability data
- handles reservation request
- availability data is updated every five minutes
- view contain main and if needed aside
- the selected / entered values in main are kept in the controller, not in the view
- after the reservation is placed (in ReservationConfirmationView) ReservationDoneView shows further instructions

---
### Navigation steps
- Select Reservation Date: ReservationDateView
- Guest information: ReservationGuestView
- Confirmation: ReservationConfirmationView

---

## Views
### ReservationDateView
- uses AvailabilityModel and adds to ReservationModel
- Date Picker includes pricing (similar to skyscanner)
- if a date range is selected the aside will update with date and pricing information, this information is also shown in the Guest information view (not on mobile)

### ReservationGuestView
- form page, with options:
  - firstname
  - infix
  - lastname
  - date of birth (optional)
  - street
  - house number
  - postal code
  - city
  - country
  - email
  - phone number
  - number of adult guests (default=1)
  - number of children guests (default=0)
  - pet guests (checkbox)
- aside shows date and pricing information still (unless on mobile)

### ReservationConfirmationView
- overview of reservation in main
- message for owner (optional)
- Place Reservation button

### ReservationDoneView
- further instructions:
  - email send to: email
  please wait for the owner to confirm the reservation
  - when the owner has accepted your reservation you will receive an email with payment instructions
  - if you want to make changes to the reservation please check information in the confirmation email
- the nav closes and the guest cant update the reservation from here, all models clear
- no further updates on availability