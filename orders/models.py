from django.db import models

class Order(models.Model):
  created = models.DateTimeField(auto_now_add=True)
  paid = models.BooleanField(default=False)
  discounts = models.FloatField(default=0.0)

  def __str__(self):
    return f'{self.id} - {self.created}'