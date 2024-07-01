from rest_framework import viewsets
from .serializer import OrderSerializer
from .models import Order
from orders.models import Order
from rest_framework.response import Response
from rounds.models import Round
from rounds.serializer import RoundSerializerItem
from copy import deepcopy
from rest_framework.decorators import action

class OrderView(viewsets.ModelViewSet):
  serializer_class = OrderSerializer
  queryset = Order.objects.all()

  @action(methods=['GET'], detail=False)
  def reports(self, request):
    queryset = self.filter_queryset(self.get_queryset())
    page = self.paginate_queryset(queryset)

    if page is not None:
      serializer = self.get_serializer(page, many=True)
      orders_report = get_reports_from_orders(serializer.data)
      return self.get_paginated_response(orders_report)

    serializer = self.get_serializer(queryset, many=True)
    orders_report = get_reports_from_orders(serializer.data)
    return Response(orders_report)
  
  @action(methods=['GET'], detail=True)
  def report(self, request, pk=None):
    instance = self.get_object()
    serializer = self.get_serializer(instance)
    order_report = get_report_from_order(serializer.data)
    return Response(order_report)

# utils
def get_reports_from_orders(orders):
  order_reports = []

  for order in orders:
    order_report = get_report_from_order(order)
    order_reports.append(order_report)

  return order_reports

def get_report_from_order(order):
  order_report = deepcopy(order)
  round_entities = Round.objects.filter(order_id=order_report['id'])
  rounds = []
  products = {}

  format_rounds(round_entities, rounds, products)
  order_report['subtotal'] = 0
  order_report['taxes'] = 0
  order_report['products'] = products
  order_report['rounds'] = rounds

  return order_report

def format_rounds(round_entities, rounds, products):
  for round_model in round_entities:
    order_round = RoundSerializerItem(round_model).data
    round_products = order_round.get('round_products', [])
    format_round_products(round_products, products)
    rounds.append(order_round)

def format_round_products(round_products, products):
  for round_product in round_products:
    product = round_product.get('product', None)
    products[product['id']] = product
    products[product['id']]['price'] = round_product['price']
    del round_product['price']
    del round_product['product']