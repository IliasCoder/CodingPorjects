import cv2
import numpy as np
import face_recognition


imgElon = face_recognition.load_image_file("ImagesBasic/Elon Musk.jpg")
imgElon = cv2.cvtColor(imgElon,cv2.COLOR_BGR2RGB)
imgTest = face_recognition.load_image_file("ImagesBasic/Elon Test.jpg")
imgTest = cv2.cvtColor(imgElon,cv2.COLOR_BGR2RGB)
#looking for the face location and encoding it
faceLocation = face_recognition.face_locations(imgElon)[0]#this gives four values(top,right,bottom,left)

encodeElon = face_recognition.face_encodings(imgElon)[0]
#                                                                                        this part for the color of the border of the rectangle
cv2.rectangle(imgElon,(faceLocation[3],faceLocation[0]),(faceLocation[1],faceLocation[2]),(255,0,255),2)
#print(faceLocation)
faceLocTest = face_recognition.face_locations(imgTest)[0]
encodeTest = face_recognition.face_encodings(imgTest)[0]
cv2.rectangle(imgTest,(faceLocTest[3],faceLocTest[0]),(faceLocTest[1],faceLocTest[2]),(255,0,255),2)
results=face_recognition.compare_faces([encodeElon],encodeTest)
faceDistance = face_recognition.face_distance([encodeElon],encodeTest)
print(faceDistance)
cv2.putText(imgTest,f'{results} {round(faceDistance[0],2)}',(50,50),cv2.FONT_HERSHEY_COMPLEX,1,(0,0,255),2)
cv2.imshow('Elon Musk', imgElon)
cv2.imshow('Elon Test', imgTest)
cv2.waitKey(0)
