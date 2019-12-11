from rest_framework.routers import DefaultRouter
from projects.api.views import WineViewSet


router = DefaultRouter()
router.register(r'', WineViewSet, basename='DataWine')
urlpatterns = router.urls
