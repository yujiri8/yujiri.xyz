from django.contrib import admin
from django import forms
from django.db import models
from django.contrib.postgres.fields import ArrayField

from .models import Word, Comment, User, Subscription

class WordAdmin(admin.ModelAdmin):
	list_display = ('word', 'meaning', 'translations', 'tags', 'notes')

admin.site.register(Word, WordAdmin)
admin.site.register(Comment)
admin.site.register(User)
admin.site.register(Subscription)




class ChoiceArrayField(ArrayField):
    """
    A field that allows us to store an array of choices.
    Uses Django's Postgres ArrayField
    and a MultipleChoiceField for its formfield.
    """

    def formfield(self, **kwargs):
        defaults = {
            'form_class': forms.MultipleChoiceField,
            'choices': self.base_field.choices,
        }
        defaults.update(kwargs)
        # Skip our parent's formfield implementation completely as we don't
        # care for it.
        return super(ArrayField, self).formfield(**defaults)
