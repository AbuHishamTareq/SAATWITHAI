# SAAT - Service Booking Platform

## Project Overview

SAAT is a multi-platform service booking application that allows customers to book services from providers. The project consists of three main components:

- **Client App**: Flutter mobile application for customers and providers
- **Backend**: Laravel 13 RESTful API service
- **CRM/Admin Panel**: React.js web-based admin dashboard

The platform supports service browsing, booking with date/time selection, payment processing (via Telr), location services (Google Maps), push notifications (Firebase), and role-based access control.

## Architecture

```
saat/
├── backend/          # Laravel 13 API
├── client_app/       # Flutter mobile app
├── crm/              # React.js admin panel
└── docs/
    └── specs/        # Requirements and specifications
```

All three codebases (`backend/`, `client_app/`, `crm/`) are currently empty — the project is in the planning/initial phase.

## Technology Stack

| Component            | Technology                                 |
| -------------------- | ------------------------------------------ |
| Client App           | Flutter (Dart) + Riverpod state management |
| Backend              | Laravel 13 (PHP) + MySQL                   |
| Admin Panel          | React.js                                   |
| Database             | MySQL                                      |
| Caching/Queue/Search | Redis                                      |
| Payment Gateway      | Telr                                       |
| Maps                 | Google Maps API                            |
| Push Notifications   | Firebase                                   |
| Authentication       | Laravel Sanctum (backend), OTP (frontend)  |
| Authorization        | spatie/laravel-permission                  |
| Monitoring           | Uptime Robot                               |
| Error Tracking       | Sentry                                     |
| Analytics            | Firebase Analytics                         |
| Health Checks        | Laravel health checks endpoint             |

## User Roles & Permissions

### Customer

- Browse and view services
- Book and cancel bookings
- View booking history and payment history
- Manage profile and addresses
- Rate services
- Make payments (Online via Telr or Wallet)

### Provider

- CRUD operations for services
- Update booking status
- View booking and payment history
- Manage profile and addresses
- Receive notifications

### Admin

- Full access to all features
- Manage users, providers, services, bookings, payments
- View reports and analytics
- Manage roles and permissions

## Booking Lifecycle

States: `Pending` → `Accepted` → `In Progress` → `Completed`

Alternative paths:

- `Pending` → `Rejected`
- Any state → `Cancelled`

**Rules:**

- Booking is accepted once customer has paid
- Payment status depends on booking status

## Payment Flow

**Payment Types:** Online (Telr), Wallet

**Payment States:** Pending, Paid, Failed, Refunded

**Rules:**

- Payment required before confirmation
- Refund logic applies for cancellations

## Availability System

Providers define:

- Working hours
- Available days
- Break times

System must:

- Prevent double booking
- Validate time slots

## API Conventions

### Versioning

All API endpoints use versioning: `/api/v1/...`

### Success Response Format

```json
{
  "status": true,
  "message": "Success",
  "data": {}
}
```

### Error Response Format

```json
{
  "status": false,
  "message": "Error message",
  "errors": {}
}
```

## Folder Structure Conventions

### Flutter (`client_app/lib/`)

```
lib/
├── models/
├── services/
├── widgets/
├── screens/
├── utils/
├── providers/
├── themes/
├── constants/
├── routes/
└── main.dart
```

### Laravel (`backend/app/`)

```
app/
├── Http/
│   ├── Controllers/
│   └── Requests/
├── Models/
├── Providers/
├── Repositories/
├── Services/
├── Helpers/
├── Exceptions/
│   └── Handler.php
├── Events/
├── Listeners/
├── Jobs/
└── Console/Commands/
```

### React CRM (`crm/src/`)

```
src/
├── components/
├── pages/
├── services/
├── utils/
├── constants/
├── routes/
├── App.js
└── index.js
```

## Theming

### Color Palette

| Token       | Value     |
| ----------- | --------- |
| Primary     | `#214D8D` |
| Secondary   | `#888078` |
| Accent      | `#D4A87D` |
| Background  | `#FFFFFF` |
| Text        | `#000000` |
| Button      | `#214D8D` |
| Button Text | `#FFFFFF` |
| Input       | `#FFFFFF` |

- Supports dark mode and light mode
- Themes should be set in `MaterialApp` (Flutter), not hardcoded in widgets

## Code Style Guidelines

### General

- Use `const` for constants
- Follow Google Flutter Style Guide for Flutter
- Use React Routers for CRM routing

### Naming Conventions

- **Classes**: `PascalCase`
- **Variables**: `camelCase`
- **Functions**: `camelCase`
- **Constants**: `ALL_CAPS`
- **Flutter files**: Named after the class they contain (e.g., `my_class.dart`)

### Flutter Specific

- Prefer `flex` values over hardcoded sizes in Rows/Columns for responsive design
- Use `log` from `dart:developer` instead of `print` or `debugPrint`

## Security Requirements

- HTTPS for all communication
- Secure storage for sensitive data
- Secure authentication for all users
- Secure payment processing
- Rate limiting for OTP requests and login attempts

## Notifications

### Events

- Booking created
- Booking accepted/rejected
- Booking reminder
- Payment confirmation

### Channels

- Push notifications (Firebase)
- SMS (OTP)

## Search System

- **Current**: MySQL `LIKE` queries
- **Future**: Meilisearch / Elasticsearch

## Logging

Log the following:

- API requests and responses
- Errors
- Payment events

## Localization

Supported languages:

- Arabic
- English

## Testing

| Component | Framework      |
| --------- | -------------- |
| Flutter   | Flutter Driver |
| Laravel   | PHPUnit        |
| React CRM | Jest           |

**Testing Strategies:**

- Unit testing for individual components
- Integration testing for component interactions
- End-to-end testing for the full application

## Features Checklist

- [ ] User authentication
- [ ] Service booking
- [ ] Service management
- [ ] Payment processing
- [ ] Location tracking
- [ ] Notification system
- [ ] Caching system (Redis)
- [ ] Search system
- [ ] Error tracking (Sentry)
- [ ] Monitoring (Uptime Robot)

## Current Status

The project is in the **initial planning phase**. Requirements have been documented in `docs/specs/initial-requirements.md`. The three main directories (`backend/`, `client_app/`, `crm/`) are empty and ready for scaffolding.

## Next Steps

1. Scaffold Laravel 13 backend (`backend/`)
2. Scaffold Flutter app (`client_app/`)
3. Scaffold React CRM (`crm/`)
4. Set up database schema and migrations
5. Implement authentication (Sanctum + OTP)
6. Implement core API endpoints
7. Build Flutter UI screens
8. Build React admin dashboard
9. Integrate payment gateway (Telr)
10. Set up notifications, caching, and monitoring
