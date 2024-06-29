from rest_framework import viewsets
from .serializer import RoundProductSerializer
from .models import RoundProduct

class RoundProductView(viewsets.ModelViewSet):
  serializer_class = RoundProductSerializer
  queryset = RoundProduct.objects.all()

  def perform_create(self, serializer):
    product_price = serializer.validated_data['product_id'].price
    serializer.save(price=product_price)
