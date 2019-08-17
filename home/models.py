from django.db import models
from modelcluster.fields import ParentalKey

from wagtail.core.models import Page, Orderable
from django.db.models import TextField
from wagtail.admin.edit_handlers import FieldPanel, MultiFieldPanel, InlinePanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.search import index
from wagtail.api import APIField


class HomePage(Page, models.Model):
    # db fields
    h_one = models.CharField(max_length=250, default="H1")
    h_one_span = models.CharField(max_length=250, default="H1 Span")
    content = models.TextField(blank=True, null=True)
    canonical = models.URLField(max_length=200, default="Canonical-URL")

    # Search index configuration
    search_fields = Page.search_fields + [
        index.SearchField('h_one'),
        index.SearchField('h_one_span'),
        index.FilterField('content'),
    ]

    # Editor panels configuration
    content_panels = Page.content_panels + [
        FieldPanel('h_one'),
        FieldPanel('h_one_span'),
        FieldPanel('content'),
        FieldPanel('canonical', classname="full"),

    ]

    # API configuration
    api_fields = [
        APIField('h_one'),
        APIField('h_one_span'),
        APIField('content'),
        APIField('canonical'),
    ]

    def get_sitemap_urls(self, request=None):
        return [
            {
                'location': 'https://www.evro.io/',
                'lastmod': self.latest_revision_created_at,
                'changefreq': 'monthly',
                'priority': 0.5
            }
        ]
