from rest_framework import viewsets

from projects.models import DataWine
from .serializers import WineSerializer


class WineViewSet(viewsets.ModelViewSet):

    serializer_class = WineSerializer
    queryset = DataWine.objects.all()
