from rest_framework.routers import DefaultRouter
from contact.api.views import ContactViewSet


router = DefaultRouter()
router.register(r'', ContactViewSet, basename='contact')
urlpatterns = router.urls
