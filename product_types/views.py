from rest_framework import viewsets
from .serializer import ProductTypeSerializer
from .models import ProductType

class ProductView(viewsets.ModelViewSet):
  serializer_class = ProductTypeSerializer
  queryset = ProductType.objects.all()
