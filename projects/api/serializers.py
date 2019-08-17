from rest_framework import serializers

from projects.models import DataWine


class WineSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataWine
        fields = ('id', 'country', 'description',
                  'designation', 'points', 'price', 'province', 'region_1', 'region_2', 'variety', 'winery')
