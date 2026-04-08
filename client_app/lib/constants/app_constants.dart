/// Application-wide constants.
class AppConstants {
  AppConstants._();

  // API
  static const String BASE_URL = String.fromEnvironment(
    'BASE_URL',
    defaultValue: 'http://localhost:8000',
  );
  static const String API_PREFIX = '/api/v1';

  // Secure storage keys
  static const String KEY_AUTH_TOKEN = 'auth_token';
  static const String KEY_USER_ID = 'user_id';
  static const String KEY_REFRESH_TOKEN = 'refresh_token';

  // Shared preferences keys
  static const String KEY_LOCALE = 'locale';
  static const String KEY_DARK_MODE = 'dark_mode';
  static const String KEY_FCM_TOKEN = 'fcm_token';

  // Pagination
  static const int DEFAULT_PAGE_SIZE = 20;

  // OTP
  static const int OTP_LENGTH = 6;
  static const int OTP_TIMEOUT_SECONDS = 120;
  static const int OTP_RESEND_COOLDOWN_SECONDS = 60;

  // Map
  static const double DEFAULT_LATITUDE = 24.7136;
  static const double DEFAULT_LONGITUDE = 46.6753;
  static const double DEFAULT_MAP_ZOOM = 12.0;
}
