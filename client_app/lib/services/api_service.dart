import 'package:dio/dio.dart';
import 'package:pretty_dio_logger/pretty_dio_logger.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:client_app/constants/app_constants.dart';

/// Dio-based API service for all backend communication.
///
/// Standardized response format:
///   Success: { "status": true, "message": "...", "data": {...} }
///   Error:   { "status": false, "message": "...", "errors": {...} }
class ApiService {
  ApiService._();

  static final ApiService _instance = ApiService._();
  factory ApiService() => _instance;

  late final Dio _dio;
  final _secureStorage = const FlutterSecureStorage();

  Dio get dio => _dio;

  void initialize() {
    _dio = Dio(BaseOptions(
      baseUrl: '${AppConstants.BASE_URL}${AppConstants.API_PREFIX}',
      connectTimeout: const Duration(seconds: 30),
      receiveTimeout: const Duration(seconds: 30),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    ));

    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          final token = await _secureStorage.read(
            key: AppConstants.KEY_AUTH_TOKEN,
          );
          if (token != null) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          handler.next(options);
        },
        onError: (error, handler) {
          if (error.response?.statusCode == 401) {
            // Token expired — handled by auth provider
          }
          handler.next(error);
        },
      ),
    );

    // Logger enabled only in debug builds
    const bool.fromEnvironment('dart.vm.product')
        ? null
        : _dio.interceptors.add(
            PrettyDioLogger(
              requestHeader: true,
              requestBody: true,
              responseBody: true,
              responseHeader: false,
              compact: true,
            ),
          );
  }

  /// Store auth token in secure storage.
  Future<void> setToken(String token) async {
    await _secureStorage.write(
      key: AppConstants.KEY_AUTH_TOKEN,
      value: token,
    );
  }

  /// Remove auth token from secure storage.
  Future<void> clearToken() async {
    await _secureStorage.delete(key: AppConstants.KEY_AUTH_TOKEN);
  }

  /// Read stored auth token.
  Future<String?> getToken() async {
    return _secureStorage.read(key: AppConstants.KEY_AUTH_TOKEN);
  }

  /// Check if user is authenticated.
  Future<bool> isAuthenticated() async {
    final token = await getToken();
    return token != null && token.isNotEmpty;
  }
}
