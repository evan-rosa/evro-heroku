"""
Import json data from CSV file to Datababse
"""
import os
import uuid
import csv
import json
import pandas as pd
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    def import_DataWine(self):
        """File Directory Variables"""
        PROJECT_DIR = os.path.dirname(
            os.path.dirname(os.path.abspath(__file__)))
        BASE_DIR = os.path.dirname(PROJECT_DIR)
        data_folder = os.path.join(
            BASE_DIR, 'resources/csv_file')
        """Define data source and output file"""
        csvDataWine = data_folder + '/' + 'winemag-data_first150k.csv'
        jsonDataWine = os.path.join(
            BASE_DIR, 'resources/json_file') + '/' + 'wine.json'
        """Pandas: Take CSV, read it, and turn it into a dataframe"""
        data = {}
        with open(csvDataWine) as csvFile:
            csvReader = csv.DictReader(csvFile)
            for rows in csvReader:
                id = rows['id']
                data[id] = rows
        with open(jsonDataWine, 'w') as jsonFile:
            jsonFile.write(json.dumps(data, sort_keys=True,
                                      ensure_ascii=False, indent=4))

    def handle(self, *args, **options):
        """
        Call the function to import data
        """
        self.import_DataWine()
