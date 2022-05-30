import json
from app.models import Operator, Providence
from random import randint
from app.serializers import UserSerializer


def run():
    file =  open('./scripts/operators.json', 'r')
    operators = file.read().split('\n')

    for op in operators:
        if op!='':
            op = json.loads(op)
            serializer = UserSerializer(data=op)
            if serializer.is_valid():
                resp = serializer.createOperator(op)             