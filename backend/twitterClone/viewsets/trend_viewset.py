from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from ..Models import Trend
from ..serializers.trend_serializer import TrendSerializer


class TrendViewSet(ViewSet):
    def list(self, request):
        trends = Trend.objects.all().order_by("-counter")
        serializer = TrendSerializer(trends, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
