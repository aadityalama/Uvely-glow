# Uvely Glow Mobile Foundation

Phase 5 prepares a React Native / Expo mobile app without adding mobile dependencies to the web build.

## Architecture

- `app.config.ts` defines Expo metadata and environment handoff.
- `src/navigation/mobile-navigation.ts` defines the mobile navigation tree.
- `src/push/push-notifications.ts` defines the push registration contract.
- `src/api/mobile-api.ts` consumes the shared API layer from the web app.

## Planned Expo Stack

- Expo Router or React Navigation for tabs and stack flows.
- Supabase auth sessions shared with the existing backend.
- Push topics backed by `mobile_devices` and `push_subscriptions`.
- Shared catalog, loyalty, subscription, support, and order APIs from `src/lib/shared-api`.

## First Mobile Screens

- Home
- Shop
- Product detail
- Cart
- Account
- Loyalty
- Subscriptions
- Support
