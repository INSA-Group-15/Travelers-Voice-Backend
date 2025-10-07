from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import login
from django.contrib.auth.models import User
from .models import UserProfile
from .serializers import UserLoginSerializer, UserProfileSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def user_login(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        login(request, user)

        # Get or create user profile
        profile, created = UserProfile.objects.get_or_create(user=user)

        # Use the UserProfileSerializer to include role and area
        user_data = UserProfileSerializer(profile).data

        return Response({
            'user': user_data,
            'message': 'Login successful'
        })

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserListView(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]