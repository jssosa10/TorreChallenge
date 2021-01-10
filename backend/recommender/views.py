import traceback

from rest_framework import viewsets, permissions, parsers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import Http404
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import NotFound as NotFoundError
from django.views.decorators.vary import vary_on_headers
from uuid import uuid4
import requests

class Users(APIView):

    permission_classes = (AllowAny,)

    def get(self, request, primary_skill):

        response = requests.post('https://search.torre.co/people/_search/?offset=0&size=100')
        users = response.json()['results']
        return Response(users)

class Opportunities(APIView):

    permission_classes = (AllowAny,)

    def get(self, request, offset, size):

        response = requests.post(f'https://search.torre.co/opportunities/_search/?offset={offset}&size={size}')
        users = response.json()
        return Response(users)
