import json
import os
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# loading the JSON once when server starts rather than on every request
# tried doing it inside the view first and it was noticeably slow on repeated calls
_data_path = os.path.join(os.path.dirname(__file__), 'data', 'location_data.json')
with open(_data_path) as f:
    IRC_LOCATION_DATA = json.load(f)


@api_view(['GET'])
def get_all_states(request):
    states = sorted(IRC_LOCATION_DATA.keys())
    return Response({'states': states})


@api_view(['GET'])
def get_districts_by_state(request):
    # keeping this as query param since the frontend just does ?state=X
    # could make it /states/<state>/districts/ but this works fine for now
    state = request.query_params.get('state', '').strip()

    if not state:
        return Response({'error': 'state is required'}, status=status.HTTP_400_BAD_REQUEST)

    if state not in IRC_LOCATION_DATA:
        return Response({'error': 'state not found'}, status=status.HTTP_404_NOT_FOUND)

    districts = sorted(IRC_LOCATION_DATA[state].keys())
    return Response({'districts': districts})


@api_view(['GET'])
def get_location_data(request, state_name, district_name):
    # this one uses URL path params since state+district together identify a specific resource
    # more REST-like than passing both as query params

    state_data = IRC_LOCATION_DATA.get(state_name)
    if not state_data:
        return Response(
            {'error': f'No data for state: {state_name}'},
            status=status.HTTP_404_NOT_FOUND
        )

    dist_data = state_data.get(district_name)
    if not dist_data:
        return Response(
            {'error': f'No data for district: {district_name} in {state_name}'},
            status=status.HTTP_404_NOT_FOUND
        )

    # returning the IRC values directly, no wrapper key needed here
    return Response(dist_data)
