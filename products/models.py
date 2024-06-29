from django.db import models
from product_types.models import ProductType

class Product(models.Model):
  name = models.CharField(max_length=200)
  price = models.FloatField()
  quantity = models.IntegerField()
  product_type_id = models.ForeignKey(
    ProductType,
    null=True,
    default=None,
    on_delete=models.PROTECT,
  )

  def __str__(self):
    return self.name
