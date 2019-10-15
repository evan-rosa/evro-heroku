from django.shortcuts import render

from rest_pandas import PandasSimpleView
import pandas as pd


class WineView(PandasSimpleView):
    def get_data(self, request, *args, **kwargs):
        return pd.read_csv('/Users/Evro/Documents/Career/evro-io/evro-web-live/evro-heroku/projects/resources/raw_data/winemag-data_first150k.csv')
