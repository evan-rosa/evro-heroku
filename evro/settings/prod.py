from .base import *
import os
import psycopg2
import dj_database_url
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', 'SECRET_KEY')

DB_PROD_NAME = os.environ.get('DB_PROD_NAME')
DB_PROD_USER = os.environ.get('DB_PROD_USER')
DB_PROD_PASS = os.environ.get('DB_PROD_PASS')
DB_PROD_URL = os.environ.get('DB_PROD_URL')

EVRO_PASS = os.environ.get('EVRO_PASS')


AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')

AWS_STORAGE_BUCKET_NAME = 'evro-io'
AWS_ACCESS_KEY_ID = AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY = AWS_SECRET_ACCESS_KEY
AWS_S3_CUSTOM_DOMAIN = 's3.amazonaws.com/%s' % AWS_STORAGE_BUCKET_NAME
AWS_HEADERS = {
    'Access-Control-Allow-Origin': '*'
}

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ.get('DB_NAME', DB_PROD_NAME),
        'USER': os.environ.get('DB_USER', DB_PROD_USER),
        'PASSWORD': os.environ.get('DB_PASS', DB_PROD_PASS),
        'HOST': '',
        'PORT': '',
    }
}
db_from_env = dj_database_url.config(
    default=os.environ.get('DB_PROD_URL', DB_PROD_URL), conn_max_age=500)
DATABASES['default'].update(db_from_env)

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# SECURITY WARNING: define the correct hosts in production!
ALLOWED_HOSTS = [
    ".herokuapp.com",
    ".evro.io",
    "localhost",
]
MEDIA_URL = "https://%s/" % AWS_S3_CUSTOM_DOMAIN
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
# STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.ManifestStaticFilesStorage'
EMAIL_BACKEND = "sendgrid_backend.SendgridBackend"

WAGTAILADMIN_NOTIFICATION_FROM_EMAIL = 'evan.rosa@evro.io'
WAGTAILADMIN_NOTIFICATION_USE_HTML = True

SECURE_SSL_REDIRECT = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 3600
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

try:
    from .local import *
except ImportError:
    pass
