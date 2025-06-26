# liste_1=["a","b","c","d","e","f","g","h","i"]
# List_num = [1,2,3,4,5,6,7,8,9,0]
# liste_mot_pass=input("donnee votre mot de passe : " )

# liste=list(liste_mot_pass.lower())
# for i in liste_1:
#     for j in liste:
#      for k in List_num:
#        if (i==j or j==k):
#          print("le mot de passe est valide ")
#        else :
#          print("le mot de passe n'est valide ")


liste_1 = ["a", "b", "c", "d", "e", "f", "g", "h", "i"]
List_num = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

liste_mot_pass = input("donnez votre mot de passe : ")

liste = list(liste_mot_pass.lower())

valide = False

for j in liste:
    for i in liste_1:
        for k in List_num:
            if (j == i or j == k):
                valide = True
                break

if valide:
    print("le mot de passe est valide")
else:
    print("le mot de passe n'est pas valide")


   