from django.conf import settings
from django.conf.urls import include, url, re_path
from django.contrib import admin
from django.views.generic import TemplateView

from wagtail.admin import urls as wagtailadmin_urls
from wagtail.core import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls
from wagtail.contrib.sitemaps.views import sitemap

from django.conf.urls.static import static
from django.contrib import admin
import os.path


from search import views as search_views
from .api import api_router

urlpatterns = [
    url(r'^django-admin/', admin.site.urls),

    url(r'^admin/', include(wagtailadmin_urls)),
    url(r'^documents/', include(wagtaildocs_urls)),

    url(r'^search/$', search_views.search, name='search'),

    url(r'^api-path/', include('rest_framework.urls')),
    url(r'^api/v2/', api_router.urls),
    url(r'^api/contact/', include('contact.api.urls')),
    url(r'^api/ds/', include('projects.api.urls')),
    url(r'^robots\.txt', include('robots.urls')),
    url(r'^sitemap\.xml$', sitemap),
    url(r'^\.well-known/', include('letsencrypt.urls')),


    re_path('.*', TemplateView.as_view(template_name='index.html')),


    # For anything not caught by a more specific rule above, hand over to
    # Wagtail's page serving mechanism. This should be the last pattern in
    # the list:
    url(r'', include(wagtail_urls)),

    # Alternatively, if you want Wagtail pages to be served from a subpath
    # of your site, rather than the site root:
    #    url(r'^pages/', include(wagtail_urls)),

]


if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    urlpatterns += staticfiles_urlpatterns()

    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
    # urlpatterns += [
    #    re_path('.*', TemplateView.as_view(template_name='index.html')),
    # ]
