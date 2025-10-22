from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserLocationSerializer


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def user_location(request):
    if request.method == 'GET':
        serializer = UserLocationSerializer(request.user)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = UserLocationSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
