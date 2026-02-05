# Admin Pages structure & Responsibilities

## Controller
- holds header and nav
- holds the state of the models
- initiates fetch bookings data + settings?
- pricing data is only first fetched when the view is selected
- handles admin actions (approve, decline, update, save)
- the selected / entered values in main are kept in the controller, not in the view
- ensures data stays in sync after mutations

---
## Navigation steps
- Bookings: AdminBookingsView
- Pricing: AdminCustomPricingView
- Settings: AdminSettingsView

---
## Views
### AdminBookingsView
- overview of all bookings (paginated)
- shows:
  - pending bookings
  - only when selected rejected bookings
  - confirmed bookings
  - foreign bookings
  - number of people
  - pets
  - 
- when declining a booking a reason/ message can be given
- booking details
- bookings are sorted by: pending then starting date
- can be sorted by:
  - starting date
  - ending date
  - guest name
  - guest email
  - owner confirmation
  - payment status


### AdminCustomPricingView
- combobox for selecting the right property
- manage custom pricing rules
- graph based pricing changes for individual dates
- rules for the whole year, with options:
  - seasonal pricing
  - weekend pricings
- periodic discounts
- when making a reservation dates are checked, to check if custom pricing changed after the reservation

### AdminSettingsView
- combobox for selecting the right property
- manage rental property settings, with options:
  - default pricing
  - cleaning fee
  - minimum / maximum stay duration
  - guest limits (adults, children, pets)
- changes apply to new reservations only
- existing reservations remain unchanged