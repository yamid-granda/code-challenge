from .models import RoundProduct
from rest_framework.test import APIClient
from rest_framework.test import APITestCase
from rest_framework import status
from django.core.management import call_command
from products.models import Product
import json

class RoundProductTestCase(APITestCase):
  def setUp(self):
    self.client = APIClient()
    self.url = '/round_products/api/v1/round_products/'

  def test_creation(self):
    # GIVEN
    call_command('loaddata', 'round_products/fixtures/create_requirements.json', verbosity=0)
    body = {
      'price': 0,
      'product_id': 1,
      'quantity': 1,
      'round_id': 1,
    }

    # WHEN
    response = self.client.post(self.url, body)

    # THEN
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    self.assertEqual(Product.objects.get().quantity, 0)
    self.assertEqual(RoundProduct.objects.count(), 1)

    response_data = json.loads(response.content)
    self.assertEqual(response_data, {
      'id': 1,
      'quantity': 1,
      'price': 100.0,
      'round_id': 1,
      'product_id': 1,
    })

  def test_not_enough_stock_creation(self):
    # GIVEN
    call_command('loaddata', 'round_products/fixtures/create_requirements.json', verbosity=0)
    body = {
      'price': 0,
      'product_id': 1,
      'quantity': 2,
      'round_id': 1,
    }

    # WHEN
    response = self.client.post(self.url, body)

    # THEN
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    self.assertEqual(Product.objects.get().quantity, 1)
