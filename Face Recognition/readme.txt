# Face Recognition with OpenCV

## Project Overview

This project leverages OpenCV to recognize faces that are already in the dataset. It utilizes machine learning algorithms to train the model on known faces and later identifies them in real-time or from images.
The primary goal is to provide an efficient and accurate face recognition system that can be applied in various domains such as security, authentication, and more.
This program will use the webcam of the computer to recognize images and face in real-time.
## Features

- Face Detection**: Detects faces in images and video streams.
- Face Recognition**: Identifies and labels faces that are already in the dataset.
- High Accuracy**: Utilizes machine learning algorithms to achieve high recognition accuracy.
- Easy Integration**: Simple and easy-to-use interface for integrating into other applications.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/face-recognition-opencv.git
   cd face-recognition-opencv
2. install python ( if you do not have it already in the system). 
  this works well with python 3.10 and higher versions
3. install opencv, numpy.
  open a new terminal: pip install package-name

##How it works
1. Go to Attendance.py and run the python file
the webcam of your computer/laptop should open.
if you show it an image of one of the three pre-trained persons [Elon Musk, Bill Gates, Jack Ma] it should be able to tell you that there is a match.
