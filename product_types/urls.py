from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from product_types import views

router = routers.DefaultRouter()
router.register(r'product_types', views.ProductView, 'product_types')

urlpatterns = [
  path('api/v1/', include(router.urls)),
  path('docs/', include_docs_urls(title='Products API')),
]