from rest_framework import viewsets
from .serializer import RoundSerializer
from .models import Round

class RoundView(viewsets.ModelViewSet):
  serializer_class = RoundSerializer
  queryset = Round.objects.all()
