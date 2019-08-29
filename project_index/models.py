from django.db import models
from modelcluster.fields import ParentalKey

from wagtail.core.models import Page
from django.db.models import TextField
from rest_framework import serializers
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel, MultiFieldPanel, InlinePanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.images.api.fields import ImageRenditionField

from wagtail.search import index
from wagtail.api import APIField


class ProjectIndexPage(Page):
    # db fields
    project_h1 = models.TextField(blank=True)
    project_p = models.TextField(blank=True)
    canonical = models.URLField(
        max_length=200, default="Canonical URL")

    # Search index configuration
    search_fields = Page.search_fields + [
        index.FilterField('project_h1'),
    ]

    # Editor panels configuration
    content_panels = Page.content_panels + [
        FieldPanel('project_h1'),
        FieldPanel('project_p', classname="full"),
        FieldPanel('canonical', classname="full"),
    ]
    promote_panels = [
        MultiFieldPanel(Page.promote_panels, "Common page configuration"),
    ]

    # API configuration
    api_fields = [
        APIField('project_h1'),
        APIField('project_p'),
        APIField('canonical'),
    ]

    def get_sitemap_urls(self, request=None):
        return [
            {
                'location': 'https://www.evro.io/portfolio',
                'lastmod': self.latest_revision_created_at,
                'changefreq': 'monthly',
                'priority': 0.75
            }
        ]
