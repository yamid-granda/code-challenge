from rest_framework import viewsets
from .serializer import RoundProductSerializer
from .models import RoundProduct
from rest_framework.exceptions import ValidationError
from rest_framework import status
from rest_framework.response import Response

class RoundProductView(viewsets.ModelViewSet):
  serializer_class = RoundProductSerializer
  queryset = RoundProduct.objects.all()

  def perform_create(self, serializer):
    sold_quantity = serializer.validated_data['quantity']
    product = serializer.validated_data['product_id']
    
    if sold_quantity > product.quantity:
      raise ValidationError("Quantity to sell exceeds the product stock")

    product_price = product.price
    serializer.save(price=product_price)

    new_quantity = product.quantity - sold_quantity
    product.quantity = new_quantity
    product.save()
