"""
Import json data from JSON file to Datababse
"""
import os
import csv
import json
import pandas as pd
import uuid

from projects.models import DatasetWine
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    def import_DataWine_from_file(self):

        PROJECT_DIR = os.path.dirname(
            os.path.dirname(os.path.abspath(__file__)))
        BASE_DIR = os.path.dirname(PROJECT_DIR)
        data_folder = os.path.join(
            BASE_DIR, 'resources/json_file')

        for data_file in os.listdir(data_folder):
            with open(os.path.join(data_folder, data_file), encoding='utf-8') as data_file:
                data = json.load(data_file)
                for data_object in data:
                    ##id = uuid.UUID(str(data[data_object]['id'])).hex

                    id = data[data_object].get('id', None)
                    country = data[data_object].get('country', None)
                    description = data[data_object].get('description', None)
                    designation = data[data_object].get('designation', None)
                    points = data[data_object].get('points', None)
                    price = data[data_object].get('price', None)
                    province = data[data_object].get('province', None)
                    region_1 = data[data_object].get('region_1', None)
                    region_2 = data[data_object].get('region_2', None)
                    variety = data[data_object].get('variety', None)
                    winery = data[data_object].get('winery', None)

                    try:
                        wine, created = DatasetWine.objects.get_or_create(
                            id=id,
                            country=country,
                            description=description,
                            designation=designation,
                            points=points,
                            price=price,
                            province=province,
                            region_1=region_1,
                            region_2=region_2,
                            variety=variety,
                            winery=winery,
                        )
                        if created:
                            wine.save()
                            display_format = "\nWine, {}, has been saved."
                            print(display_format.format(wine))
                    except Exception as ex:
                        print(str(ex))
                        msg = "\n\nSomething went wrong saving this wine: {}\n{}".format(
                            id, str(ex))
                        print(msg)

    def handle(self, *args, **options):
        """
        Call the function to import data
        """
        self.import_DataWine_from_file()
