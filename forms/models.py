from django.db import models
from modelcluster.fields import ParentalKey
from wagtail.admin.edit_handlers import(
    FieldPanel, FieldRowPanel, InlinePanel, MultiFieldPanel)
from wagtail.core.fields import RichTextField
from wagtail.contrib.forms.models import (AbstractEmailForm, AbstractFormField)


class FormField(AbstractFormField):
    page = ParentalKey(
        'FormPage', related_name='custom_form_fields', on_delete=models.CASCADE)


class FormPage(AbstractEmailForm):
    thank_you_text = RichTextField(blank=True)

    content_panels = AbstractEmailForm.content_panels + [
        InlinePanel('custom_form_fields', label="Form fields"),
        FieldPanel('thank_you_text', classname="full"),
        MultiFieldPanel([
            FieldRowPanel([
                FieldPanel('from_address', classname="col6"),
                FieldPanel('to_address', classname="col6"),
            ]),
            FieldPanel('subject'),
        ], "Email Notification Config"),
    ]

    def get_form_fields(self):
        return self.custom_form_fields.all()
