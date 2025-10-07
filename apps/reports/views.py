from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

@api_view(['POST'])
@permission_classes([AllowAny])
def submit_report(request):
    return Response({
        'message': 'Report submission endpoint working!',
        'data_received': request.data
    }, status=status.HTTP_200_OK)