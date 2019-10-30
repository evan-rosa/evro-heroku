import pandas as pd
from projects.models import DatasetWine

df = pd.read_csv(
    '/Users/Evro/Documents/Career/evro-io/evro-web-live/evro-heroku/projects/resources/raw_data/winemag-data_first150k.csv', sep=';')

row_iter = df.iterrows()

objs = [

    DatasetWine(

        field_1=row['key'],
        field_2=row['country'],
        field_3=row['description'],
        field_4=row['designation'],
        field_5=row['points'],
        field_6=row['price'],
        field_7=row['province'],
        field_8=row['region_1'],
        field_9=row['region_2'],
        field_10=row['variety'],
        field_11=row['winery']

    )

    for index, row in row_iter

]

DatasetWine.objects.bulk_create(objs)

# Note: myClass_in_model: the class (i.e., the table you want to populate data from csv) we defined in Django model.py
# Note: field_1 to filed_4 are the fields you defined in your Django model.
