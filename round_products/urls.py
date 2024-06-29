from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from round_products import views

router = routers.DefaultRouter()
router.register(r'round_products', views.RoundProductView, 'round_products')

urlpatterns = [
  path('api/v1/', include(router.urls)),
  path('docs/', include_docs_urls(title='Round Products API')),
]