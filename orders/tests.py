from .models import Order
from rest_framework.test import APIClient
from rest_framework.test import APITestCase
from rest_framework import status
from django.core.management import call_command
import json

class OrderTestCase(APITestCase):
  def setUp(self):
    self.client = APIClient()
    self.url = '/orders/api/v1/orders/'

  def test_creation(self):
    # GIVEN
    data = { 'discounts': 0 }

    # WHEN
    response = self.client.post(self.url, data)

    # THEN
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    self.assertEqual(Order.objects.count(), 1)
    self.assertEqual(Order.objects.get().discounts, 0)

  def test_reports(self):
    # GIVEN
    url = '/orders/api/v1/orders/reports/'
    call_command('loaddata', 'orders/fixtures/get_requirements.json', verbosity=0)

    # WHEN
    response = self.client.get(url)

    # THEN
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    response_data = json.loads(response.content)
    self.assertEqual(response_data, [
      {
        'id': 1,
        'created': '2024-07-01T20:41:09.642000Z',
        'paid': False,
        'discounts': 0.0,
        'subtotal': 0,
        'taxes': 0,
        'products': {
          '1': {
            'id': 1,
            'name': 'Corona',
            'price': 100.0
          }
        },
        'rounds': [
          {
            'id': 1,
            'created': '2024-06-27T02:14:24.271000Z',
            'round_products': [
              {
                'quantity': 1,
                'product_id': 1,
              }
            ]
          }
        ]
      }
    ])
