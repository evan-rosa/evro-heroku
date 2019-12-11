release: python manage.py migrate

web: python manage.py; gunicorn evro.wsgi --log-file - --log-level debug
