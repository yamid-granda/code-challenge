from django.db import models
from products.models import Product
from rounds.models import Round

class RoundProduct(models.Model):
  quantity = models.IntegerField()
  price = models.FloatField()
  product_id = models.ForeignKey(
    Product,
    on_delete=models.PROTECT,
  )
  round_id = models.ForeignKey(
    Round,
    on_delete=models.PROTECT,
    related_name='round_products'
  )

