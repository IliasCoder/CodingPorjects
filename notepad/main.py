import tkinter
import os
from tkinter import *
#To get a space above for the message
from tkinter.messagebox import *
#To get the dialog box to open when required
from tkinter.filedialog import *

class Notepad:
    __root = Tk()
    __root.iconbitmap("notepadIcon.ico")
    #default window resolution
    _thisWidth = 300
    _thisHeight = 300
    _thisTextArea = Text(__root)
    thisMenuBar = Menu(__root)
    thisFileMenu = Menu(thisMenuBar, tearoff=0)
    thisEditMenu = Menu(thisMenuBar, tearoff=0)
    thisHelpMenu = Menu(thisMenuBar, tearoff=0)

    #Adding Scrollbar
    thisScrollBar = Scrollbar(_thisTextArea)
    file = None

    def __init__(self,**kwargs):
        #setting the icon
        try:
            self.__root.wm_iconbitmap("Notepad.ico")
        except:
            pass

        #Setting the window size (default 300 x 300)
        try:
            self._thisWidth = kwargs['width']
            self._thisHeight = kwargs['height']
        except KeyError:
            pass
        
        #setting the window text
        self.__root.title("Untitled - Notepad")

        #Centering the window
        screenWidth = self.__root.winfo_screenwidth()
        screenHeight = self.__root.winfo_screenheight()

        # For Left-align
        left = (screenWidth/2) - (self._thisWidth/2)
        # For Right-align
        top = (screenHeight/2) - (self._thisHeight/2)

        # For top and bottom 
        self.__root.geometry('%dx%d+%d+%d' % (self._thisWidth, self._thisHeight, left, top))


        # To make the text Area auto resizable

        self.__root.grid_rowconfigure(0,weight=1)
        self.__root.grid_columnconfigure(0,weight=1)

        #Adding controls (Widgets)
        self._thisTextArea.grid(sticky = N + E + S + W)

        #To open a new file
        self.thisFileMenu.add_command(label='New',command=self.newFile)
        # To open an existing file
        self.thisFileMenu.add_command(label="Open",command=self.openFile)

        # To save the current File
        self.thisFileMenu.add_command(label='Save',command=self.saveFile)

        #To create a line in the dialog
        self.thisEditMenu.add_separator()
        self.thisEditMenu.add_command(label="Exit",command=self._quitApplication)
        self.thisEditMenu.add_cascade(label="File",menu=self.thisFileMenu)

        #Adding the Cut feature
        self.thisEditMenu.add_command(label="Cut",command=self.cut)
        # to give a feature of copy    
        self.thisEditMenu.add_command(label="Copy",
                                        command=self.copy)         
         
        # To give a feature of paste
        self.thisEditMenu.add_command(label="Paste",
                                        command=self.paste)         
         
        # To give a feature of editing
        self.thisMenuBar.add_cascade(label="Edit",
                                       menu=self.thisEditMenu)     
         
        # To create a feature of description of the notepad
        self.thisHelpMenu.add_command(label="About Notepad",
                                        command=self._showAbout) 
        self.thisMenuBar.add_cascade(label="Help",
                                       menu=self.thisHelpMenu)
 
        self.__root.config(menu=self.thisMenuBar)
 
        self.thisScrollBar.pack(side=RIGHT,fill=Y)                    
         
        # Scrollbar will adjust automatically according to the content        
        self.thisScrollBar.config(command=self._thisTextArea.yview)     
        self._thisTextArea.config(yscrollcommand=self.thisScrollBar.set)
    

    def _quitApplication(self):
        self.__root.destroy()
    
    def _showAbout(self):
        showinfo("Notepad", "Brother")
    
    def openFile(self):
        self._file = askopenfilename(defaultextension=".txt", filetypes=[("All Files","*.*"), ("Text Documents","*.txt")])
        if self.file =="":
            self.file=None
        else:
            #Opening the file
            #setting the window title
            self.__root.title(os.path.basename(self.file),+" - Notepad")
            self._thisTextArea.delete(1.0,END)

            file = open(self.file,"r")
            self._thisTextArea.insert(1.0,file.read())

            file.close()
    def newFile(self):
        self.__root.title("Untitled - Notepad")
        self.file = None
        self._thisTextArea.delete(1.0,END)
    

    def saveFile(self):
        if self.file ==None:
            #save a new file
            self.file = asksaveasfilename(initialfile='Untitled.txt',defaultextension=".txt",filetypes=[("All Files","*.*"),("Text Documents","*.txt")])
            if self.file=="":
                self.file==None
            else:
                #Trying to save the file
                file  = open(self.file,'w')
                file.write(self._thisTextArea.get(1.0,END))
                file.close()
                #Change the window title
                self.__root.title(os.path.basename(self.file)+ " - Notepad")
        else:
            file = open(self.__file,"w")
            file.write(self._thisTextArea.get(1.0,END))
            file.close()
        
        #Cut feature
    def cut(self):
        self._thisTextArea.event_generate("<<Cut>>")
    
    def copy(self):
        self._thisTextArea.event_generate("<<Copy>>")
    def paste(self):
        self._thisTextArea.event_generate("<<Paste>>")
    
    def run(self):
        self.__root.mainloop()


#Creating an object of our class
notepad = Notepad(width=600,height=600)
notepad.run()
        
    

                                            


            
