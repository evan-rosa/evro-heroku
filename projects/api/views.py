from rest_framework import viewsets

from projects.models import DatasetWine
from .serializers import WineSerializer


class WineViewSet(viewsets.ModelViewSet):

    serializer_class = WineSerializer
    queryset = DatasetWine.objects.all()
