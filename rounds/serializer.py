from rest_framework import serializers
from .models import Round
from round_products.serializer import RoundProductSerializerItem
from products.serializer import ProductSerializer

class RoundSerializer(serializers.ModelSerializer):
  class Meta:
    model = Round
    fields = (
      'id',
      'created',
      'order_id',
    )

class RoundSerializerItem(serializers.ModelSerializer):
  round_products = RoundProductSerializerItem(
    many=True,
    read_only=True,
  )

  class Meta:
    model = Round
    fields = (
      'id',
      'created',
      'round_products',
    )