from django.urls import path
from . import views

urlpatterns = [
    path('states/', views.get_all_states),
    path('districts/', views.get_districts_by_state),

    # nested resource style for the actual location data
    path('states/<str:state_name>/districts/<str:district_name>/', views.get_location_data),
]
