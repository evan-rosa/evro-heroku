import uuid
from django.db import models
from modelcluster.fields import ParentalKey
from django.urls import path

from wagtail.core.models import Page
from django.db.models import TextField, URLField
from rest_framework import serializers
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel, MultiFieldPanel, InlinePanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.documents.edit_handlers import DocumentChooserPanel
from wagtail.images.api.fields import ImageRenditionField

from wagtail.search import index
from wagtail.api import APIField

# Web Projects Model


class ProjectsPage(Page):
    # db fields
    project_h_one = models.CharField(max_length=250, default="Project Name")
    project_h_two = models.CharField(
        max_length=250, default="Project Description")
    project_intro_p = models.TextField(blank=True)
    project_p = models.CharField(
        max_length=250, default="Project Launch Date")
    project_tech_stack_description = RichTextField(blank=True, features=["ul"])
    project_url = models.URLField(max_length=200, default="Project URL")
    project_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    project_img_alt = models.CharField(
        max_length=250, default="Image Alt Text")
    project_canonical = models.URLField(
        max_length=200, default="Canonical URL")

    # Search index configuration
    search_fields = Page.search_fields + [
        index.SearchField('project_h_one'),
        index.FilterField('project_h_two'),
        index.FilterField('project_intro_p'),
        index.FilterField('project_p'),
        index.FilterField('project_tech_stack_description'),
    ]

    # Editor panels configuration
    content_panels = Page.content_panels + [
        FieldPanel('project_h_one'),
        FieldPanel('project_h_two', classname="full"),
        FieldPanel('project_intro_p', classname="full"),
        FieldPanel('project_p', classname="full"),
        FieldPanel('project_tech_stack_description', classname="full"),
        FieldPanel('project_url', classname="full"),
        FieldPanel('project_canonical', classname="full"),
        ImageChooserPanel('project_image'),
        FieldPanel('project_img_alt', classname="full"),
    ]
    promote_panels = [
        MultiFieldPanel(Page.promote_panels, "Common page configuration"),
    ]

    # API configuration
    api_fields = [
        APIField('project_h_one'),
        APIField('project_h_two'),
        APIField('project_intro_p'),
        APIField('project_p'),
        APIField('project_tech_stack_description'),
        APIField('project_url'),
        APIField('project_canonical'),
        APIField('project_image'),
        APIField('project_image_url', serializer=ImageRenditionField(
            'fill-700x700', source='project_image')),
        APIField('project_img_alt'),


    ]
    # Site Map for Web Projects

    def get_sitemap_urls(self, request=None):
        return [
            {
                'location': ('https://www.evro.io/portfolio/' + str(self.id) + '/' + self.slug),
                'lastmod': (self.last_published_at or self.latest_revision_created_at),
                'changefreq': 'monthly',
                'priority': 0.75
            }
        ]


# Data Science Project Model
class DsProjectsPage(Page):
    # db fields
    h_one = models.CharField(max_length=250, default="Project Name")
    problem_statement = RichTextField(blank=True)
    ds_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    img_alt = models.CharField(
        max_length=250, default="Image Alt Text")
    h_two_eda = models.CharField(max_length=250, default="Project Name")
    eda_description = models.TextField(blank=True)
    model_description = RichTextField(blank=True, features=["ul"])
    canonical = models.URLField(
        max_length=200, default="Canonical URL")

    # Search index configuration
    search_fields = Page.search_fields + [
        index.SearchField('h_one'),
        index.FilterField('problem_statement'),
        index.FilterField('h_two_eda'),
        index.FilterField('eda_description'),
        index.FilterField('model_description'),
    ]

    # Editor panels configuration
    content_panels = Page.content_panels + [
        FieldPanel('h_one'),
        FieldPanel('problem_statement', classname="full"),
        FieldPanel('h_two_eda', classname="full"),
        FieldPanel('eda_description', classname="full"),
        FieldPanel('model_description', classname="full"),
        FieldPanel('canonical', classname="full"),
        ImageChooserPanel('ds_image'),
        FieldPanel('img_alt', classname="full"),
    ]
    promote_panels = [
        MultiFieldPanel(Page.promote_panels, "Common page configuration"),
    ]

    # API configuration
    api_fields = [
        APIField('h_one'),
        APIField('problem_statement'),
        APIField('h_two_eda'),
        APIField('eda_description'),
        APIField('model_description'),
        APIField('canonical'),
        APIField('ds_image'),
        APIField('ds_image_url', serializer=ImageRenditionField(
            'fill-700x700', source='ds_image')),
        APIField('img_alt'),
    ]

# Wine Data


class DataWine(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    country = models.CharField(max_length=250)
    description = models.CharField(max_length=500)
    designation = models.CharField(max_length=250)
    points = models.IntegerField()
    price = models.IntegerField()
    province = models.CharField(max_length=250)
    region_1 = models.CharField(max_length=250)
    region_2 = models.CharField(max_length=250)
    variety = models.CharField(max_length=250)
    winery = models.CharField(max_length=250)

    def __str__(self):
        return self.id
