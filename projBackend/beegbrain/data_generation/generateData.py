from random import randint

thirtyDaysMonths = [4,6,9,11]
def generateBirthday():
    month = randint(1,12)
    year = randint(1914, 2010)

    if month in thirtyDaysMonths:
        day = randint(1,30)
    elif month==2:
        day = randint(1,28)
    else:
        day = randint(1,31)
    return str(year)+"-"+str(month)+"-"+str(day)

def generatePhoneNumber(number):
    if number==1:
        return randint(960000000, 969999999)
    else: 
        return randint(910000000, 919999999)

def generatePassword():
    return randint(10000, 20000000)
    
"""ler as ruas"""
f = open("./roads.csv","r")
f.readline()
roads = []
for line in f: 
    brokeLine = line.replace("\n","")
    if brokeLine!="":
        roads.append(brokeLine)
f.close()






"""ler os nomes"""
f= open("./names.csv","r")
peopleInfo = []
f.readline() # descartar o titulo

gender = ['M', 'F','O']


for line in f:
    personInfo = {}
    brokeLine = line.split(",")
    name = brokeLine[4].replace("\n","")
    email = name.lower() + '@gmail.com'
    value = randint(0, 2)
    person_gender = gender[value]
    birthdayDate = generateBirthday()
    phoneNumber = generatePhoneNumber(number=value)
    password = generatePassword()
    operatorNumber= generatePassword()
    roadLength = randint(0, len(roads)-1)
    road = roads[roadLength]
    personInfo["name"] = name
    personInfo["email"] = email
    personInfo["password"] = password
    personInfo["address"] = road
    personInfo["telephone"] = str(phoneNumber)
    personInfo["birthday"] = birthdayDate
    personInfo["operator_number"] = operatorNumber
    personInfo["health_number"] = str(randint(100000000, 999999999))
    personInfo["gender"] = person_gender
    peopleInfo.append(personInfo)

f.close()
for i in peopleInfo: 
    print(i)

