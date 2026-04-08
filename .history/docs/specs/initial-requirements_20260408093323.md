I want to build a service-booking app, that customer can use to book a service from a provider. The app should be able to handle multiple services, and allow the customer to book a service at a spacific date and time. The app should also be able to handle payment for the service.

The app should be build with Flutter as frontend in client_app folder, Laravel 13 as a backend in backend folder for APIs and React js for CRM (Admin Panel)

## User Stories

### As a customer, I want to be able to book a service from a provider.

### As a provider, I want to be able to create a service.

### As a provider, I want to be able to update a service.

### As a provider, I want to be able to delete a service.

### As a customer, I want to be able to view a list of available services.

### As a customer, I want to be able to view the details of a service.

### As a customer, I want to be able to book a service at a specific date and time.

## Technologies to use
* Flutter for frontend
* Laravel 13 for backend
* React js for CRM (Admin Panel)
* MySQL for database
* Telr for payment
* Google Maps for location
* Firebase for notification
* Radis for caching, session management, queue management and search
* JWT for authentication in backend and OTP for authentication in frontend
* Riverpod for state management
* Uptime Robot for monitoring
* Sentry for error tracking
* Google Analytics for tracking user behavior

## Requirements

## Theming
* The app should have a dark mode and a light mode.
* The app should use the following colors:
  * Primary color: #214D8D
  * Secondary color: #888078
  * Accent color: #D4A87D
  * Background color: #FFFFFF
  * Text color: #000000
  * Button color: #214D8D
  * Button text color: #FFFFFF
  * Input color: #FFFFFF
* Theming should be done by setting the theme in the MaterialApp, rather than hardcoding colors and sizes in the widgets themselves.

## Code Style
* The app should follow the Google Flutter style guide.
* The app should use the following naming conventions:
  * Class names should be in PascalCase.
  * Variable names should be in camelCase.
  * Function names should be in camelCase.
  * Constants should be in ALL_CAPS.
* The app should use the following file naming conventions:
  * Dart files should be named after the class they contain.
  * Example: `my_class.dart`
* The Flutter app should use the following folder structure:
  * `lib/`
    * `models/`
    * `services/`
    * `widgets/`
    * `screens/`
    * `utils/`
    * `providers/`
    * `themes/`
    * `constants/`
    * `routes/`
    * `main.dart`
* The Laravel app should use the following folder structure:
  * `app/`
    * `Http/Controllers/`
    * `Http/Requests/`
    * `Models/`
    * `Providers/`
    * `Repositories/`
    * `Services/`
    * `Helpers/`
    * `Exceptions/`
    * `Events/`
    * `Listeners/`
    * `Jobs/`
    * `Console/Commands/`
    * `Exceptions/Handler.php`
    * `Providers/AppServiceProvider.php`
    * `Providers/AuthServiceProvider.php`
* The React app should use the following folder structure:
  * `src/`
    * `components/`
    * `pages/`
    * `services/`
    * `utils/`
    * `constants/`
    * `routes/`
    * `App.js`
    * `index.js`
* The React app should use React 
* The app should use the following code conventions:
  * Use `const` for constants.

## Features
* The app should have the following features:
  * User authentication
  * Service booking
  * Service management
  * Payment processing
  * Location tracking
  * Notification system
  * Caching system
  * Search system
  * Error tracking system
  * Monitoring system

## Testing
* The app should be tested using the following tools:
  * Flutter Driver for Flutter app
  * PHPUnit for Laravel app
  * Jest for React app
* The app should be tested using the following testing frameworks:
  * Flutter Driver for Flutter app
  * PHPUnit for Laravel app
  * Jest for React app
* The app should be tested using the following testing strategies:
  * Unit testing for individual components
  * Integration testing for components working together
  * End-to-end testing for the entire app

## Deployment
* The app should be deployed using the following tools: