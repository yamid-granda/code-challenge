from rest_framework import serializers
from .models import RoundProduct
from products.serializer import ProductSerializerItem

class RoundProductSerializer(serializers.ModelSerializer):
  class Meta:
    model = RoundProduct
    fields = (
      'id',
      'quantity',
      'price',
      'round_id',
      'product_id',
    )

class RoundProductSerializerItem(serializers.ModelSerializer):
  product = ProductSerializerItem(source='product_id')

  class Meta:
    model = RoundProduct
    fields = (
      'quantity',
      'price',
      'product',
      'product_id',
    )