from django.db import models
from modelcluster.fields import ParentalKey

from wagtail.core.models import Page, Orderable
from django.db.models import TextField
from wagtail.admin.edit_handlers import FieldPanel, MultiFieldPanel, InlinePanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.search import index
from wagtail.api import APIField


class Contact(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()

    def __str__(self):
        return self.email


class ContactPage(Page):
    h_one = models.CharField(max_length=250, default="H1")
    canonical = models.URLField(
        max_length=200, default="Canonical URL")

    # Editor panels configuration
    content_panels = Page.content_panels + [
        FieldPanel('h_one'),
        FieldPanel('canonical', classname="full"),
    ]

    # API configuration
    api_fields = [
        APIField('h_one'),
        APIField('canonical'),
    ]

    def get_sitemap_urls(self, request=None):
        return [
            {
                'location': 'https://www.evro.io/contact-evan-rosa',
                'lastmod': self.latest_revision_created_at,
                'changefreq': 'monthly',
                'priority': 0.5
            }
        ]
