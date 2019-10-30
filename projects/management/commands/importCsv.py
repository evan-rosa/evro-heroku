import os
import csv
from projects.models import DatasetWine
from django.core.management.base import BaseCommand
from datetime import datetime
from evro.settings.base import BASE_DIR


class Command(BaseCommand):
    def import_wine_from_csv_file(self):
        data_folder = os.path.join(
            BASE_DIR, 'projects', 'resources/raw_data')
        print(data_folder, 'data_folder')
        for data_file in os.listdir(data_folder):
            with open(os.path.join(data_folder, data_file), encoding='utf-8') as data_file:
                data = csv.reader(data_file)
                for data_object in data:
                    key = data_object[1]
                    country = data_object[2]
                    description = data_object[3]
                    designation = data_object[4]
                    points = data_object[5]
                    price = data_object[6]
                    province = data_object[7]
                    region_1 = data_object[8]
                    region_2 = data_object[9]
                    variety = data_object[10]
                    winery = data_object[11]

                    try:
                        wine, created = DatasetWine.objects.get_or_create(
                            key=key,
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
                            DatasetWine.save()
                            display_format = "\nWine, {}, has been saved."
                            print(display_format.format(wine))
                    except Exception as ex:
                        print(str(ex))
                        msg = "\n\nSomething went wrong saving this wine: {}\n{}".format(
                            key, str(ex))
                        print(msg)

    def handle(self, *args, **options):
        """
        Call the function to import data
        """
        self.import_wine_from_csv_file()
