import cv2
import face_recognition
import numpy as np
from datetime import datetime
import os
#if you wanna add another person to the class just add its image to the imagesAttendance folder
path = 'ImagesAttendance'
images=[]
classNames=[]
myList =os.listdir(path)
print(myList)
for cl in myList:
    curImg= cv2.imread(f'{path}/{cl}')
    images.append(curImg)
    classNames.append(os.path.splitext(cl)[0])


def findEncodings(images):
    encodeList=[]
    for img in images:
        #convert to rgb
        img=cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)
    return encodeList

def markAttendance(name):
    with open('venv\Attendance.csv','r+') as f:
        myDataList = f.readlines()
        nameList=[]
        print(myDataList)
        for line in myDataList:
            entry = line.split(',')
            nameList.append(entry[0])
        if name not in nameList:
            now = datetime.now()
            dateString = now.strftime('%H:%M":%S')
            f.writelines(f'\n{name},{dateString}')

encodeListKnown = findEncodings(images)
print("Encoding complete")

cap = cv2.VideoCapture(0)
while True:
    success, img = cap.read()
    #decrease the image size to make the process faster
    imgSmall = cv2.resize(img,(0,0),None,0.25,0.25)
    imgSmall = cv2.cvtColor(imgSmall,cv2.COLOR_BGR2RGB)


    facesCurrentframe = face_recognition.face_locations(imgSmall)
    encodesCurrentFrame = face_recognition.face_encodings(imgSmall,facesCurrentframe)


    for encodeFace, faceLoc in zip(encodesCurrentFrame,facesCurrentframe):
        matches = face_recognition.compare_faces(encodeListKnown,encodeFace)
        faceDist = face_recognition.face_distance(encodeListKnown,encodeFace)
        #print(faceDist)
        matchIndex= np.argmin(faceDist)

        if matches[matchIndex]:
            name = classNames[matchIndex].upper()
            #print(name)
            y1,x2,y2,x1=faceLoc
            y1,x2,y2,x1=y1*4,x2*4,y2*4,x1*4#to rescale the image in order to get the best locations detections
            cv2.rectangle(img,(x1,y1),(x2,y2),(0,255,0),2)
            cv2.rectangle(img,(x1,y2-35),(x2,y2),(0,255,0),cv2.FILLED)
            cv2.putText(img,name,(x1+6,y2-6),cv2.FONT_HERSHEY_COMPLEX,1,(255,255,255),2)
            markAttendance(name)
    cv2.imshow('webcam',img)
    cv2.waitKey(1)
#faceLocation = face_recognition.face_locations(imgElon)[0]#this gives four values(top,right,bottom,left)

#encodeElon = face_recognition.face_encodings(imgElon)[0]
#                                                                                        this part for the color of the border of the rectangle
#cv2.rectangle(imgElon,(faceLocation[3],faceLocation[0]),(faceLocation[1],faceLocation[2]),(255,0,255),2)
#print(faceLocation)
#faceLocTest = face_recognition.face_locations(imgTest)[0]
#encodeTest = face_recognition.face_encodings(imgTest)[0]
#cv2.rectangle(imgTest,(faceLocTest[3],faceLocTest[0]),(faceLocTest[1],faceLocTest[2]),(255,0,255),2)
#results=face_recognition.compare_faces([encodeElon],encodeTest)
#faceDistance = face_recognition.face_distance([encodeElon],encodeTest)