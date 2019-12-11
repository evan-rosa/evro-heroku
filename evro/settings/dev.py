from .base import *
import os
import psycopg2
import dj_database_url
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', 'SECRET_KEY')

DB_DEV_NAME = os.environ.get('DB_DEV_NAME')
DB_DEV_USER = os.environ.get('DB_DEV_USER')
DB_DEV_PASS = os.environ.get('DB_DEV_PASS')

# ManifestStaticFilesStorage is recommended in production, to prevent outdated
# Javascript / CSS assets being served from cache (e.g. after a Wagtail upgrade).
# See https://docs.djangoproject.com/en/2.1/ref/contrib/staticfiles/#manifeststaticfilesstorage


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'HOST': 'localhost',
        'PORT': '5432',
        'NAME': os.environ.get('DB_NAME', DB_DEV_NAME),
        'USER': os.environ.get('DB_USER', DB_DEV_USER),
        'PASSWORD': os.environ.get('DB_PASS', DB_DEV_PASS),
    }
}

# SECURITY WARNING: define the correct hosts in production!
ALLOWED_HOSTS = ['*']
MEDIA_URL = '/media/'

SECURE_SSL_REDIRECT = False
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False
SECURE_HSTS_SECONDS = 3600
SECURE_HSTS_INCLUDE_SUBDOMAINS = False
SECURE_HSTS_PRELOAD = False
# TEMPLATES
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#templates
TEMPLATES[0]['OPTIONS']['debug'] = DEBUG  # noqa F405

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
