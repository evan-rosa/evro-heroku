from rest_framework import serializers

from projects.models import DatasetWine


class WineSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatasetWine
        fields = ('wine_id', 'country', 'description',
                  'designation', 'points', 'price', 'province', 'region_1', 'region_2', 'taster_name', 'taster_twitter_handle', 'wine_name', 'variety', 'winery')
