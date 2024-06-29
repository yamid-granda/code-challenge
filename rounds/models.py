from django.db import models
from orders.models import Order

class Round(models.Model):
  created = models.DateTimeField(auto_now_add=True)
  order_id = models.ForeignKey(
    Order,
    on_delete=models.PROTECT,
  )

  def __str__(self):
    return f'{self.id} - {self.created}'
