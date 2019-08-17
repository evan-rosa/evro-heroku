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


class AboutPage(Page):
    # db fields
    about_p = models.TextField(blank=True)
    about_skill_web_development_col_one = RichTextField(
        blank=True, features=["ul"])
    about_skill_web_development_col_two = RichTextField(
        blank=True, features=["ul"])
    about_skill_digital_marketing = RichTextField(blank=True, features=["ul"])
    about_skill_web_analytics_col_one = RichTextField(
        blank=True, features=["ul"])
    about_skill_web_analytics_col_two = RichTextField(
        blank=True, features=["ul"])
    about_skill_data_science_col_one = RichTextField(
        blank=True, features=["ul"])
    about_skill_data_science_col_two = RichTextField(
        blank=True, features=["ul"])
    about_education = RichTextField(blank=True, features=["ul"])
    canonical = models.URLField(max_length=200, default="Canonical URL")

    # Search index configuration
    search_fields = Page.search_fields + [
        index.FilterField('about_p'),
    ]

    # Editor panels configuration
    content_panels = Page.content_panels + [
        FieldPanel('about_p'),
        FieldPanel('about_skill_web_development_col_one', classname="full"),
        FieldPanel('about_skill_web_development_col_two', classname="full"),
        FieldPanel('about_skill_digital_marketing', classname="full"),
        FieldPanel('about_skill_web_analytics_col_one', classname="full"),
        FieldPanel('about_skill_web_analytics_col_two', classname="full"),
        FieldPanel('about_skill_data_science_col_one', classname="full"),
        FieldPanel('about_skill_data_science_col_two', classname="full"),
        FieldPanel('about_education', classname="full"),
        FieldPanel('canonical', classname="full"),

    ]
    promote_panels = [
        MultiFieldPanel(Page.promote_panels, "Common page configuration"),
    ]

    # API configuration
    api_fields = [
        APIField('about_p'),
        APIField('about_skill_web_development_col_one'),
        APIField('about_skill_web_development_col_two'),
        APIField('about_skill_digital_marketing'),
        APIField('about_skill_web_analytics_col_one'),
        APIField('about_skill_web_analytics_col_two'),
        APIField('about_skill_data_science_col_one'),
        APIField('about_skill_data_science_col_two'),
        APIField('about_education'),
        APIField('canonical'),

    ]

    def get_sitemap_urls(self, request=None):
        return [
            {
                'location': 'https://www.evro.io/about-evan-rosa/',
                'lastmod': self.latest_revision_created_at,
                'changefreq': 'monthly',
                'priority': 1.0
            }
        ]
